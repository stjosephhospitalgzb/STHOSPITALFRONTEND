import React, { useState, useEffect } from "react";
import api from "../api"; // axios instance with baseURL and token interceptor

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [text, setText] = useState("");
  const [order, setOrder] = useState(0);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all news (admin view)
  const fetchNews = async () => {
    try {
      const { data } = await api.get("/news/admin"); // ✅ use api.get
      setNews(data);
    } catch (err) {
      console.error("Error fetching news:", err);
      alert(err.response?.data?.message || "Failed to fetch news");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("News text is required");
      return;
    }
    setLoading(true);
    try {
      if (editId) {
        await api.put(`/news/${editId}`, { text, order }); // ✅ update
      } else {
        await api.post("/news", { text, order }); // ✅ create
      }
      resetForm();
      fetchNews();
    } catch (err) {
      console.error("Error saving news:", err);
      alert(err.response?.data?.message || "Error saving news");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setText("");
    setOrder(0);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setText(item.text);
    setOrder(item.order);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await api.delete(`/news/${id}`); // ✅ delete
        fetchNews();
      } catch (err) {
        console.error("Error deleting news:", err);
        alert(err.response?.data?.message || "Error deleting news");
      }
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await api.put(`/news/${item._id}`, {
        ...item,
        isActive: !item.isActive,
      });
      fetchNews();
    } catch (err) {
      console.error("Error toggling active status:", err);
      alert("Failed to update status");
    }
  };

  // Styles (same as before)
  const containerStyle = { maxWidth: 1000, margin: "0 auto", padding: "20px" };
  const formStyle = { display: "flex", gap: "12px", marginBottom: "30px", flexWrap: "wrap" };
  const inputStyle = { flex: 2, padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "6px" };
  const orderInputStyle = { width: "80px", padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "6px" };
  const buttonStyle = { padding: "10px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" };
  const cancelStyle = { padding: "10px 20px", backgroundColor: "#64748b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" };
  const tableStyle = { width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" };
  const thStyle = { textAlign: "left", padding: "12px", backgroundColor: "#f1f5f9", borderBottom: "1px solid #e2e8f0" };
  const tdStyle = { padding: "12px", borderBottom: "1px solid #e2e8f0", verticalAlign: "middle" };
  const actionButton = { marginRight: "8px", padding: "6px 12px", fontSize: "12px", borderRadius: "4px", cursor: "pointer", border: "none" };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Manage Latest News</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Enter news text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Order"
          value={order}
          onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
          style={orderInputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {editId ? "Update News" : "Add News"}
        </button>
        {editId && (
          <button type="button" onClick={resetForm} style={cancelStyle}>
            Cancel
          </button>
        )}
      </form>

      {news.length === 0 ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>No news items yet. Add your first news above.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Text</th>
              <th style={thStyle}>Order</th>
              <th style={thStyle}>Active</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item._id}>
                <td style={tdStyle}>{item.text}</td>
                <td style={tdStyle}>{item.order}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleToggleActive(item)}
                    style={{
                      ...actionButton,
                      backgroundColor: item.isActive ? "#10b981" : "#ef4444",
                      color: "white",
                    }}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ ...actionButton, backgroundColor: "#3b82f6", color: "white" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ ...actionButton, backgroundColor: "#ef4444", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminNews; 