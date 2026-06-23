import { useEffect, useState } from "react";
import { UserCheck, UserX, LogOut, Calendar, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const StaffDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [clearing, setClearing] = useState(false);
  const navigate = useNavigate();

  // Modal state
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ─── Sort function: on‑leave doctors first ─────────────────────
  const sortDoctors = (list) => {
    return [...list].sort((a, b) => {
      // If both are on leave or both available, keep original order (stable)
      if (a.isOnLeave === b.isOnLeave) return 0;
      // a on leave → -1 (comes first), b on leave → 1
      return a.isOnLeave ? -1 : 1;
    });
  };

  // ─── Fetch and sort ─────────────────────────────────────────────
  const fetchDoctors = async () => {
    try {
      const { data } = await API.get("/doctors");
      const sorted = sortDoctors(data);
      setDoctors(sorted);
      setFilteredDoctors(sorted);
      // Check for expired leaves after fetching
      checkAndClearExpiredLeaves(sorted);
    } catch (err) {
      console.error("Error loading doctor records", err);
    }
  };

  // ─── Clear a single expired leave ──────────────────────────────
  const clearExpiredLeave = async (id) => {
    try {
      const token = localStorage.getItem("staffToken");
      await API.patch(
        `/staff/doctor-leave/${id}`,
        { isOnLeave: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return true;
    } catch (err) {
      console.error("Failed to auto‑clear leave for doctor", id, err);
      return false;
    }
  };

  // ─── Check all doctors for expired endDate and clear them ──────
  const checkAndClearExpiredLeaves = async (doctorList) => {
    if (clearing) return;
    setClearing(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expired = doctorList.filter((doc) => {
      if (!doc.isOnLeave) return false;
      if (!doc.leaveDetails || !doc.leaveDetails.endDate) return false;
      const end = new Date(doc.leaveDetails.endDate);
      end.setHours(0, 0, 0, 0);
      return end < today;
    });

    if (expired.length === 0) {
      setClearing(false);
      return;
    }

    const results = await Promise.all(expired.map((doc) => clearExpiredLeave(doc._id)));
    const anyCleared = results.some((r) => r === true);
    setClearing(false);

    if (anyCleared) {
      setMessage(`🔄 Auto‑cleared leave for ${expired.length} doctor(s) whose leave period ended.`);
      // Refresh the list to reflect changes
      fetchDoctors();
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // ─── Manual clear (mark available) ─────────────────────────────
  const markAsAvailable = async (id) => {
    try {
      const token = localStorage.getItem("staffToken");
      await API.patch(
        `/staff/doctor-leave/${id}`,
        { isOnLeave: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Doctor is now active and available!");
      fetchDoctors(); // re‑fetch and re‑sort
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update availability status.");
    }
  };

  // ─── Submit leave form ─────────────────────────────────────────
  const handleLeaveFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("staffToken");
      await API.patch(
        `/staff/doctor-leave/${selectedDoc._id}`,
        {
          isOnLeave: true,
          startDate,
          endDate,
          reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`Leave registered successfully for Dr. ${selectedDoc.name}`);
      setSelectedDoc(null);
      setStartDate("");
      setEndDate("");
      setReason("");
      fetchDoctors(); // re‑fetch and re‑sort
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save leave details.");
    }
  };

  // ─── Search filter (preserves sorted order) ────────────────────
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    navigate("/staff-login");
  };

  // ─── Styles (unchanged) ────────────────────────────────────────
  const styles = {
    layout: { padding: "2rem", backgroundColor: "#0f172a", minHeight: "100vh", color: "#f8fafc", fontFamily: "sans-serif" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: "1rem", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" },
    searchContainer: { display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#1e293b", padding: "0.5rem 1rem", borderRadius: "2rem", border: "1px solid #475569", flex: "1 1 300px" },
    searchInput: { background: "transparent", border: "none", color: "white", fontSize: "1rem", width: "100%", outline: "none" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" },
    card: { backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "1rem", border: "1px solid #334155", display: "flex", flexDirection: "column", justifyContent: "space-between" },
    badgeActive: { backgroundColor: "#16a34a", padding: "0.25rem 0.5rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: "bold" },
    badgeLeave: { backgroundColor: "#dc2626", padding: "0.25rem 0.5rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: "bold" },
    btnAction: { marginTop: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "none", fontWeight: "600" },
    modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" },
    modalContent: { backgroundColor: "#1e293b", borderRadius: "1.25rem", border: "1px solid #475569", width: "100%", maxWidth: "28rem", padding: "2rem", position: "relative" },
    formGroup: { display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" },
    input: { backgroundColor: "#0f172a", border: "1px solid #475569", borderRadius: "0.5rem", color: "white", padding: "0.6rem", fontSize: "1rem" },
    noResults: { textAlign: "center", padding: "3rem 0", color: "#94a3b8" },
  };

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Staff Operations Board</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Update active practitioner tracking systems</p>
        </div>
        <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#ef4444", border: "none", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer" }}>
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* Search Bar */}
      <div style={{ ...styles.searchContainer, marginBottom: "1.5rem" }}>
        <Search size={20} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {message && <div style={{ backgroundColor: "#1e293b", color: "#4ade80", border: "1px solid #4ade80", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>{message}</div>}

      <div style={styles.grid}>
        {filteredDoctors.length === 0 ? (
          <div style={styles.noResults}>
            <p>No doctors found matching “{searchTerm}”</p>
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div key={doc._id} style={styles.card}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                <img src={doc.img} alt={doc.name} style={{ width: "65px", height: "65px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3b82f6" }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{doc.name}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{doc.dept} • Room {doc.roomNo}</p>
                  <div style={{ marginTop: "0.5rem" }}>
                    {doc.isOnLeave ? <span style={styles.badgeLeave}>On Leave</span> : <span style={styles.badgeActive}>Active Available</span>}
                  </div>
                </div>
              </div>

              {doc.isOnLeave && doc.leaveDetails && (
                <div style={{ backgroundColor: "rgba(220,38,38,0.1)", border: "1px dashed #dc2626", borderRadius: "0.5rem", padding: "0.75rem", marginTop: "1rem", fontSize: "0.85rem" }}>
                  <p style={{ color: "#fca5a5" }}><strong>Reason:</strong> {doc.leaveDetails.reason || "Not Specified"}</p>
                  <p style={{ color: "#cbd5e1", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    Until: {doc.leaveDetails.endDate ? new Date(doc.leaveDetails.endDate).toLocaleDateString() : "Indefinite"}
                  </p>
                </div>
              )}

              {doc.isOnLeave ? (
                <button onClick={() => markAsAvailable(doc._id)} style={{ ...styles.btnAction, backgroundColor: "#16a34a", color: "white" }}>
                  <UserCheck size={18} /> Clear Leave Status
                </button>
              ) : (
                <button onClick={() => setSelectedDoc(doc)} style={{ ...styles.btnAction, backgroundColor: "#dc2626", color: "white" }}>
                  <UserX size={18} /> Mark On Leave
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Leave Modal */}
      {selectedDoc && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={() => setSelectedDoc(null)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
              <X size={20} />
            </button>
            
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Calendar color="#f87171" /> Schedule Absence Leave
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Enter leave record logs for Dr. {selectedDoc.name}</p>

            <form onSubmit={handleLeaveFormSubmit}>
              <div style={styles.formGroup}>
                <label style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>Leave Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.input} required />
              </div>

              <div style={styles.formGroup}>
                <label style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>Expected Return Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.input} required />
              </div>

              <div style={styles.formGroup}>
                <label style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>Reason for Absence</label>
                <textarea rows="3" placeholder="Specify details..." value={reason} onChange={(e) => setReason(e.target.value)} style={{ ...styles.input, fontFamily: "inherit", resize: "none" }} required />
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="button" onClick={() => setSelectedDoc(null)} style={{ flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #475569", backgroundColor: "transparent", color: "white", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "none", backgroundColor: "#dc2626", color: "white", fontWeight: "bold", cursor: "pointer" }}>
                  Confirm Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;