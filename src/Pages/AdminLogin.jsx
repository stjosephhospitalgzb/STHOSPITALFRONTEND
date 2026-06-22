import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail, Loader } from "lucide-react";
import API from "../api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/doctors");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "linear-gradient(to bottom right, #172554, #0f172a, #1e3a8a)",
      position: "relative",
      overflow: "hidden",
      padding: "0 1rem",
    },
    blurCircle1: {
      position: "absolute",
      width: "18rem",
      height: "18rem",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderRadius: "9999px",
      filter: "blur(64px)",
      top: "2.5rem",
      left: "2.5rem",
    },
    blurCircle2: {
      position: "absolute",
      width: "24rem",
      height: "24rem",
      backgroundColor: "rgba(34, 211, 238, 0.2)",
      borderRadius: "9999px",
      filter: "blur(64px)",
      bottom: "2.5rem",
      right: "2.5rem",
    },
    card: {
      position: "relative",
      zIndex: 10,
      width: "100%",
      maxWidth: "28rem",
      backdropFilter: "blur(16px)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      borderRadius: "1.5rem",
      padding: "2rem",
    },
    iconWrapper: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.25rem",
    },
    iconInner: {
      backgroundColor: "#2563eb",
      padding: "1rem",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
      marginBottom: "0.5rem",
    },
    subheading: {
      textAlign: "center",
      color: "#d1d5db",
      fontSize: "0.875rem",
      marginBottom: "2rem",
    },
    errorMsg: {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      border: "1px solid #f87171",
      color: "#fecaca",
      padding: "0.75rem",
      borderRadius: "0.75rem",
      marginBottom: "1.25rem",
      fontSize: "0.875rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      color: "#e5e7eb",
      fontSize: "0.875rem",
      marginBottom: "0.5rem",
      display: "block",
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "0.75rem",
      padding: "0 0.75rem",
    },
    inputIcon: {
      color: "#d1d5db",
      width: "18px",
      height: "18px",
    },
    input: {
      width: "100%",
      backgroundColor: "transparent",
      outline: "none",
      color: "white",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "none",
      fontFamily: "inherit",
    },
    button: {
      width: "100%",
      backgroundImage: loading
        ? "linear-gradient(to right, #6b7280, #9ca3af)"
        : "linear-gradient(to right, #3b82f6, #06b6d4)",
      color: "white",
      padding: "0.75rem 1rem",
      borderRadius: "0.75rem",
      fontWeight: "600",
      border: "none",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
      transform: isButtonHovered && !loading ? "scale(1.02)" : "scale(1)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    footer: {
      textAlign: "center",
      color: "#9ca3af",
      fontSize: "0.75rem",
      marginTop: "1.5rem",
    },
    staffLink: {
      color: "#93c5fd",
      textDecoration: "none",
      fontWeight: "500",
      cursor: "pointer",
      transition: "color 0.2s",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    staffLinkHover: {
      color: "#bfdbfe",
    },
    divider: {
      margin: "1rem 0 0.5rem",
      border: "0",
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.blurCircle1}></div>
      <div style={styles.blurCircle2}></div>

      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <div style={styles.iconInner}>
            <ShieldCheck size={34} color="white" />
          </div>
        </div>

        <h2 style={styles.heading}>Admin Login</h2>
        <p style={styles.subheading}>Secure access to admin dashboard</p>

        {error && <div style={styles.errorMsg}>{error}</div>}

        <form onSubmit={submitHandler} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <Mail style={styles.inputIcon} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock style={styles.inputIcon} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>

        <hr style={styles.divider} />

        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
            Are you a staff member?{" "}
          </span>
          <a
            href="/staff-login"
            style={styles.staffLink}
            onMouseEnter={(e) => (e.target.style.color = styles.staffLinkHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.staffLink.color)}
            onClick={(e) => {
              e.preventDefault();
              navigate("/staff-login");
            }}
          >
            Login here →
          </a>
        </div>

        <p style={styles.footer}>Protected Admin Panel • Secure Authentication</p>
      </div>
    </div>
  );
};

export default AdminLogin;