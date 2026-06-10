import React, { useEffect } from "react";

// ─── Icon paths (same as used in other pages) ────────────────────────────────
const IC = {
  cross:    "M12 2v20M2 12h20",
  phone:    "M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.45 4.36a1 1 0 01-.23 1.02L8.5 11a16 16 0 006.5 6.5l1.94-1.96a1 1 0 011.02-.23l4.36 1.45A1 1 0 0123 17.72V21a2 2 0 01-2 2A18 18 0 013 5z",
  mail:     "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  location: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  youtube:  "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z",
  linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z",
  facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  instagram:"M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm-4 12a4 4 0 110-8 4 4 0 010 8zm4-7.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z",
  whatsapp: "M3.5 20.5L5 16.5A8 8 0 1116 21l-4 1.5zM9 10h.01M12 10h.01M15 10h.01",
  link:     "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
};

const Ico = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);

// ─── Color palette ──────────────────────────────────────────────────────────
const C = {
  blue:  "#2563eb",
  navy:  "#0d1f3c",   // darker background for footer
  white: "#ffffff",
};

// ─── Style injection for heartbeat animation + responsive breakpoints ───────
const injectFooterStyles = () => {
  if (document.getElementById("hc-footer-styles")) return;
  const style = document.createElement("style");
  style.id = "hc-footer-styles";
  style.textContent = `
    @keyframes heartbeat {
      0%, 100% { transform: scaleX(1); }
      50% { transform: scaleX(1.04); }
    }
    .footer-heartbeat svg {
      animation: heartbeat 2s ease-in-out infinite;
    }
    @media (max-width: 1024px) {
      .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
    }
    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr !important; text-align: center; }
      .footer-contact-row, .footer-social-row { justify-content: center !important; }
      .footer-links { justify-content: center !important; }
      .footer-bottom { flex-direction: column; text-align: center; }
    }
    .footer-link {
      color: rgba(255,255,255,.55);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .footer-link:hover {
      color: #fff;
    }
    .footer-social-icon {
      background: rgba(255,255,255,.1);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .footer-social-icon:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
};

export default function Footer() {
  useEffect(() => {
    injectFooterStyles();
  }, []);

  return (
    <footer style={{
      background: C.navy,
      color: "rgba(255,255,255,.7)",
      padding: "56px 24px 32px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Heartbeat decoration line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        opacity: 0.08,
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
      }} className="footer-heartbeat">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <polyline
            points="0,20 200,20 220,5 240,35 260,5 280,35 300,20 1200,20"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Main footer grid – 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
          alignItems: "start",
          marginBottom: 48,
        }}>
          {/* Column 1: Brand & Tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: C.blue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Ico d={IC.cross} size={20} color={C.white} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  color: C.white,
                  lineHeight: 1.2,
                  letterSpacing: -0.3,
                }}>ST. JOSEPH'S</h3>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", letterSpacing: 1 }}>HOSPITAL</div>
              </div>
            </div>
            <p style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "rgba(255,255,255,.65)",
              marginBottom: 24,
            }}>"A Call To Touch And Heal"</p>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
              Meerut Road, Mariam Nagar,<br />
              Sewa Nagar, Ghaziabad,<br />
              Uttar Pradesh – 201003
            </div>
          </div>

          {/* Column 2: Appointments & Emergency */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 20, letterSpacing: -0.2 }}>For Appointments</h4>
            <div style={{ marginBottom: 28 }}>
              <a
                href="http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <Ico d={IC.link} size={14} color="rgba(255,255,255,.6)" />
                Online Booking
              </a>
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 16, letterSpacing: -0.2 }}>Emergency</h4>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: "rgba(255,255,255,.8)" }}>Cell Numbers:</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.white }}>+91 7827-908-598</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.white }}>+91 7827-908-595</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: "rgba(255,255,255,.8)" }}>Phone Numbers:</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>0120-2871146</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>0120-2872246</div>
            </div>
          </div>

          {/* Column 3: Patient Enquiries & Paramedical Institute */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 20, letterSpacing: -0.2 }}>Patient Enquiries</h4>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "rgba(255,255,255,.8)" }}>TPA Desk:</div>
              <a href="mailto:sjhospital.tpa@gmail.com" className="footer-link" style={{ fontSize: 13 }}>sjhospital.tpa@gmail.com</a>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "rgba(255,255,255,.8)" }}>HR Department:</div>
              <a href="mailto:hr.sjhgzb@gmail.com" className="footer-link" style={{ fontSize: 13 }}>hr.sjhgzb@gmail.com</a>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "rgba(255,255,255,.8)" }}>Admin Office:</div>
              <a href="mailto:stjosephgzb@rediffmail.com" className="footer-link" style={{ fontSize: 13 }}>stjosephgzb@rediffmail.com</a>
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 800, color: C.white, marginTop: 24, marginBottom: 12, letterSpacing: -0.2 }}>Paramedical Institute</h4>
            <div style={{ fontSize: 13, marginBottom: 8, color: "rgba(255,255,255,.7)" }}>
              <strong>Contact:</strong> +91 9582739411, +91 7827908615
            </div>
            <a href="mailto:stjosephparamedicalgzb@gmail.com" className="footer-link" style={{ fontSize: 13 }}>stjosephparamedicalgzb@gmail.com</a>
            <div style={{ marginTop: 8, fontSize: 13 }}>
              <strong>WhatsApp:</strong> <a href="https://wa.me/919582739411" target="_blank" rel="noopener noreferrer" className="footer-link">+91 9582739411</a>
            </div>
          </div>

          {/* Column 4: Office, Map, Social Links */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 20, letterSpacing: -0.2 }}>Office Contact</h4>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "rgba(255,255,255,.8)" }}>TPA Desk:</div>
              <a href="mailto:sjhospital.tpa@gmail.com" className="footer-link" style={{ fontSize: 13 }}>sjhospital.tpa@gmail.com</a>
            </div>

            <div style={{ marginBottom: 20 }}>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <Ico d={IC.location} size={14} color="rgba(255,255,255,.6)" />
                View on Google Maps
              </a>
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 16, letterSpacing: -0.2 }}>Follow Us On</h4>
            <div className="footer-social-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://www.youtube.com/@STJOSEPHSHOSPITAL" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <Ico d={IC.youtube} size={18} color={C.white} />
              </a>
              <a href="https://www.linkedin.com/in/st-joseph-s-hospital-7423652a7/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <Ico d={IC.linkedin} size={18} color={C.white} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100077486113772" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <Ico d={IC.facebook} size={18} color={C.white} />
              </a>
              <a href="https://wa.me/917827908598" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <Ico d={IC.whatsapp} size={18} color={C.white} />
              </a>
              <a href="https://www.instagram.com/stjosephshospitalghaziabad" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <Ico d={IC.instagram} size={18} color={C.white} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="footer-bottom" style={{
          borderTop: "1px solid rgba(255,255,255,.1)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
            © 2026 St. Joseph's Hospital. All Rights Reserved.
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", textAlign: "center" }}>
            Designed and Developed by: IT Department, St. Joseph's Hospital, Ghaziabad.
          </div>
        </div>
      </div>
    </footer>
  );
}