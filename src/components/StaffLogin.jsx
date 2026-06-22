import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Mail, Loader, CheckCircle2 } from "lucide-react";
import API from "../api";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const { data } = await API.post("/staff/login", { email, password });
      localStorage.setItem("staffToken", data.token);
      setSuccessMsg("🎉 Login successful! Redirecting to doctor tracking board...");
      setTimeout(() => {
        navigate("/staff/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  // Inline styles (kept as before, with minor adjustments)
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "linear-gradient(to bottom right, #1e1b4b, #0f172a, #311042)",
      padding: "0 1rem",
      fontFamily: "sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "28rem",
      backdropFilter: "blur(16px)",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      borderRadius: "1.5rem",
      padding: "2rem",
      animation: "fadeSlideUp 0.6s ease-out", // <-- new animation
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
      color: "#9ca3af",
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
      animation: "fadeIn 0.3s ease-in",
    },
    successMsgBox: {
      backgroundColor: "rgba(22, 163, 74, 0.2)",
      border: "1px solid #4ade80",
      color: "#bbf7d0",
      padding: "0.75rem",
      borderRadius: "0.75rem",
      marginBottom: "1.25rem",
      fontSize: "0.875rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      animation: "fadeIn 0.3s ease-in",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.75rem",
      padding: "0 0.75rem",
      transition: "border-color 0.3s, box-shadow 0.3s", // <-- smooth focus
    },
    input: {
      width: "100%",
      backgroundColor: "transparent",
      outline: "none",
      color: "white",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "none",
    },
    button: {
      width: "100%",
      backgroundImage: loading
        ? "linear-gradient(to right, #4b5563, #374151)"
        : "linear-gradient(to right, #a855f7, #06b6d4)",
      color: "white",
      padding: "0.75rem 1rem",
      borderRadius: "0.75rem",
      fontWeight: "600",
      border: "none",
      cursor: loading ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "transform 0.2s, box-shadow 0.2s, opacity 0.2s",
      transform: "scale(1)",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    },
  };

  // Add CSS keyframes inside component (or in a global stylesheet)
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeSlideUp {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      .spinning {
        animation: spin 1s linear infinite;
      }
      .input-wrapper-focus {
        border-color: #a855f7;
        box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
      }
      .btn-hover:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
      }
      .btn-hover:active {
        transform: scale(0.98);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Handle focus/blur to add glow class
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
          <div style={{ backgroundColor: "#a855f7", padding: "1rem", borderRadius: "0.75rem" }}>
            <ShieldAlert size={34} color="white" />
          </div>
        </div>
        <h2 style={styles.heading}>Staff Login</h2>
        <p style={styles.subheading}>Manage active practitioner operations</p>

        {error && <div style={styles.errorMsg}>{error}</div>}
        {successMsg && (
          <div style={styles.successMsgBox}>
            <CheckCircle2 size={18} color="#4ade80" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={submitHandler} style={styles.form}>
          <div>
            <label style={{ color: "#e5e7eb", fontSize: "0.875rem", marginBottom: "0.5rem", display: "block" }}>
              Staff Email
            </label>
            <div
              style={{
                ...styles.inputWrapper,
                ...(focusedInput === "email" && {
                  borderColor: "#a855f7",
                  boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.3)",
                }),
              }}
            >
              <Mail color="#9ca3af" size={18} />
              <input
                type="email"
                placeholder="staff@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

          <div>
            <label style={{ color: "#e5e7eb", fontSize: "0.875rem", marginBottom: "0.5rem", display: "block" }}>
              Password
            </label>
            <div
              style={{
                ...styles.inputWrapper,
                ...(focusedInput === "password" && {
                  borderColor: "#a855f7",
                  boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.3)",
                }),
              }}
            >
              <Lock color="#9ca3af" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            className="btn-hover"
          >
            {loading && !successMsg ? (
              <>
                <Loader size={20} className="spinning" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Access Staff Controls</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;