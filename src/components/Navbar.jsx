import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Doctors", path: "/doctors" },
  { label: "Our Institute", path: "/ourinsitite" },
  { label: "Gallery", path: "/gallery" },
  { label: "TPA Services", path: "/tpaservices" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [locationHovered, setLocationHovered] = useState(false);
  const [emergencyHovered, setEmergencyHovered] = useState(false);
  const [opdHovered, setOpdHovered] = useState(false);
  const [helplineHovered, setHelplineHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [labReportHovered, setLabReportHovered] = useState(false);
  const [mobileCtaHovered, setMobileCtaHovered] = useState(false);
  const [mobileLabHovered, setMobileLabHovered] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);
  const [mobileLoginHovered, setMobileLoginHovered] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const hisLoginUrl = "http://103.47.16.55:84/hospedia/Default.aspx?sessionTimeOut=true";
  const bookAppointmentUrl = "http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx";
  const labReportUrl = "http://103.47.16.55/Online_HIS/design/online_lab/default.aspx";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateBodyPadding = () => {
      if (navbarRef.current) {
        document.body.style.paddingTop = `${navbarRef.current.offsetHeight}px`;
      }
    };
    updateBodyPadding();
    window.addEventListener("resize", updateBodyPadding);
    return () => window.removeEventListener("resize", updateBodyPadding);
  }, [scrolled, windowWidth, menuOpen]);

  // ----- breakpoints -----
  const isMobile = windowWidth <= 1180;
  const isTablet = windowWidth <= 1024;
  const isSmallTablet = windowWidth <= 900;
  const isSmallMobile = windowWidth <= 768;
  const isExtraSmall = windowWidth <= 480;
  const isTiny = windowWidth <= 400;

  // ----- helper: get sizes based on width -----
  const getSizes = () => {
    if (isTiny) {
      return {
        logoHeight: "32px",
        logoFont: "14px",
        logoSubFont: "7px",
        infoFont: "10px",
        infoPad: "2px 6px",
        infoGap: "4px",
        buttonFont: "10px",
        buttonPad: "4px 8px",
        buttonGap: "4px",
        navFont: "11px",
        navPad: "4px 8px",
        navGap: "2px",
        topGap: "4px",
        topPad: "4px 0",
        rightGap: "4px",
        hamburgerSize: "20px",
      };
    }
    if (isExtraSmall) {
      return {
        logoHeight: "36px",
        logoFont: "16px",
        logoSubFont: "8px",
        infoFont: "11px",
        infoPad: "2px 8px",
        infoGap: "4px",
        buttonFont: "11px",
        buttonPad: "4px 10px",
        buttonGap: "4px",
        navFont: "12px",
        navPad: "4px 10px",
        navGap: "3px",
        topGap: "6px",
        topPad: "6px 0",
        rightGap: "6px",
        hamburgerSize: "22px",
      };
    }
    if (isSmallMobile) {
      return {
        logoHeight: "40px",
        logoFont: "18px",
        logoSubFont: "9px",
        infoFont: "12px",
        infoPad: "4px 8px",
        infoGap: "5px",
        buttonFont: "12px",
        buttonPad: "5px 10px",
        buttonGap: "5px",
        navFont: "13px",
        navPad: "5px 12px",
        navGap: "4px",
        topGap: "8px",
        topPad: "8px 0",
        rightGap: "8px",
        hamburgerSize: "24px",
      };
    }
    if (isSmallTablet) {
      return {
        logoHeight: "44px",
        logoFont: "20px",
        logoSubFont: "10px",
        infoFont: "13px",
        infoPad: "4px 10px",
        infoGap: "6px",
        buttonFont: "13px",
        buttonPad: "6px 12px",
        buttonGap: "6px",
        navFont: "13px",
        navPad: "6px 12px",
        navGap: "4px",
        topGap: "10px",
        topPad: "10px 0",
        rightGap: "10px",
        hamburgerSize: "26px",
      };
    }
    if (isTablet) {
      return {
        logoHeight: "48px",
        logoFont: "22px",
        logoSubFont: "11px",
        infoFont: "14px",
        infoPad: "5px 12px",
        infoGap: "8px",
        buttonFont: "14px",
        buttonPad: "6px 14px",
        buttonGap: "8px",
        navFont: "14px",
        navPad: "6px 14px",
        navGap: "5px",
        topGap: "12px",
        topPad: "10px 0",
        rightGap: "10px",
        hamburgerSize: "28px",
      };
    }
    if (isMobile) {
      return {
        logoHeight: "50px",
        logoFont: "24px",
        logoSubFont: "12px",
        infoFont: "14px",
        infoPad: "6px 12px",
        infoGap: "8px",
        buttonFont: "14px",
        buttonPad: "6px 14px",
        buttonGap: "8px",
        navFont: "14px",
        navPad: "6px 14px",
        navGap: "5px",
        topGap: "12px",
        topPad: "10px 0",
        rightGap: "10px",
        hamburgerSize: "28px",
      };
    }
    // default large desktop
    return {
      logoHeight: "60px",
      logoFont: "28px",
      logoSubFont: "13px",
      infoFont: "15px",
      infoPad: "6px 12px",
      infoGap: "8px",
      buttonFont: "14px",
      buttonPad: "8px 16px",
      buttonGap: "8px",
      navFont: "15px",
      navPad: "8px 18px",
      navGap: "6px",
      topGap: "0",
      topPad: "12px 0",
      rightGap: "12px",
      hamburgerSize: "30px",
    };
  };

  const sizes = getSizes();

  // ----- decide visibility of items based on width -----
  const showHelpline = windowWidth > 1200;
  const showOpd = windowWidth > 1100;
  const showEmergency = windowWidth > 1000;
  const showLocation = windowWidth > 900;
  const showLabReport = windowWidth > 800;
  const showCta = windowWidth > 700;
  const showLogin = windowWidth > 600;

  // ----- styles -----
  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1100,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
    backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
    boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
    transition: "all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    animation: "navbarFadeIn 0.5s ease-out",
  };

  const getHorizontalPadding = () => {
    if (isTiny) return "0 8px";
    if (isExtraSmall) return "0 12px";
    if (isSmallMobile) return "0 16px";
    if (isTablet) return "0 24px";
    return "0 60px";
  };

  const navbarContainerStyle = {
    width: "100%",
    padding: getHorizontalPadding(),
    transition: "all 0.3s ease",
  };

  const topRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: isSmallMobile ? "wrap" : "nowrap",
    gap: sizes.topGap,
    padding: scrolled ? sizes.topPad : sizes.topPad,
    transition: "padding 0.3s ease",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: isSmallMobile ? "8px" : "16px",
    textDecoration: "none",
    flexShrink: 0,
    transition: "transform 0.2s ease",
  };

  const logoImgStyle = {
    height: sizes.logoHeight,
    width: "auto",
    objectFit: "cover",
    borderRadius: "12px",
    transition: "transform 0.2s ease",
  };

  const logoNameStyle = {
    fontSize: sizes.logoFont,
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1.2,
    letterSpacing: "-0.5px",
  };

  const logoSubStyle = {
    fontSize: sizes.logoSubFont,
    fontWeight: 700,
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginTop: "2px",
  };

  const centerGroupStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes.infoGap,
    flexWrap: "wrap",
    flex: "1",
  };

  const infoItemStyle = (isHovered, customColor = "#334155") => ({
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: sizes.infoFont,
    fontWeight: 600,
    color: isHovered ? "#2563eb" : customColor,
    padding: sizes.infoPad,
    borderRadius: "30px",
    transition: "all 0.2s ease",
    background: isHovered ? "rgba(37,99,235,0.08)" : "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    border: "none",
  });

  const emergencyItemStyle = (isHovered) => ({
    ...infoItemStyle(isHovered, "#dc2626"),
    color: isHovered ? "#b91c1c" : "#dc2626",
    background: isHovered ? "rgba(220,38,38,0.08)" : "transparent",
  });

  const helplineItemStyle = (isHovered) => ({
    ...infoItemStyle(isHovered, "#1e293b"),
    fontWeight: 700,
    background: isHovered ? "#f1f5f9" : "transparent",
    color: isHovered ? "#0f172a" : "#1e293b",
  });

  const infoIconStyle = {
    width: `calc(${sizes.infoFont} + 2px)`,
    height: `calc(${sizes.infoFont} + 2px)`,
    flexShrink: 0,
  };

  const rightGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: sizes.rightGap,
    flexShrink: 0,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  };

  const buttonBaseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: sizes.buttonGap,
    padding: sizes.buttonPad,
    borderRadius: "40px",
    fontSize: sizes.buttonFont,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    whiteSpace: "nowrap",
    border: "none",
    lineHeight: 1.4,
  };

  const loginButtonStyle = {
    ...buttonBaseStyle,
    display: showLogin ? "inline-flex" : "none",
    border: "1px solid #e2e8f0",
    background: loginHovered ? "#f8fafc" : "white",
    color: "#1e293b",
    transform: loginHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: loginHovered ? "0 4px 10px rgba(0,0,0,0.05)" : "none",
  };

  const ctaButtonStyle = {
    ...buttonBaseStyle,
    display: showCta ? "inline-flex" : "none",
    background: ctaHovered
      ? "linear-gradient(135deg,#1a4fb3,#1e5fd4)"
      : "linear-gradient(135deg,#1e5fd4,#2563eb)",
    color: "white",
    transform: ctaHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: ctaHovered ? "0 6px 14px rgba(37,99,235,0.3)" : "0 2px 6px rgba(37,99,235,0.2)",
  };

  const labReportButtonStyle = {
    ...buttonBaseStyle,
    display: showLabReport ? "inline-flex" : "none",
    background: labReportHovered ? "#1e293b" : "#334155",
    color: "white",
    transform: labReportHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: labReportHovered ? "0 6px 14px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.1)",
  };

  const hamburgerStyle = {
    display: isMobile ? "flex" : "none",
    flexDirection: "column",
    gap: "4px",
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "4px",
    marginLeft: "6px",
    transition: "transform 0.2s",
  };

  const hamburgerSpanStyle = (index) => ({
    width: sizes.hamburgerSize,
    height: "3px",
    background: "#0f172a",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    transform:
      menuOpen && index === 0
        ? `translateY(${parseInt(sizes.hamburgerSize)/2 + 2}px) rotate(45deg)`
        : menuOpen && index === 1
        ? "scale(0)"
        : menuOpen && index === 2
        ? `translateY(-${parseInt(sizes.hamburgerSize)/2 + 2}px) rotate(-45deg)`
        : "none",
  });

  const bottomRowStyle = {
    display: isMobile ? "none" : "block",
    padding: "4px 0 8px 0",
    overflowX: "auto",
    scrollbarWidth: "thin",
    animation: "navLinksFadeUp 0.4s ease-out",
    WebkitOverflowScrolling: "touch",
  };

  const navLinksContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes.navGap,
    listStyle: "none",
    margin: 0,
    padding: 0,
    minWidth: "max-content",
  };

  const linkStyle = (linkPath, index) => ({
    textDecoration: "none",
    color: isActive(linkPath) ? "#2563eb" : "#334155",
    fontSize: sizes.navFont,
    fontWeight: 700,
    padding: sizes.navPad,
    borderRadius: "30px",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    position: "relative",
    background:
      hoveredLink === index
        ? "rgba(37,99,235,0.08)"
        : isActive(linkPath)
        ? "rgba(37,99,235,0.12)"
        : "transparent",
    cursor: "pointer",
    transform: hoveredLink === index ? "translateY(-2px)" : "translateY(0)",
  });

  const activeDotStyle = {
    position: "absolute",
    left: "50%",
    bottom: "2px",
    transform: "translateX(-50%)",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    animation: "pulseDot 1.5s infinite",
  };

  // Mobile drawer (unchanged, but uses isSmallMobile etc.)
  const mobileMenuOverlayStyle = {
    display: isMobile && menuOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1040,
    animation: "fadeInOverlay 0.3s ease",
  };

  const mobileMenuStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: isSmallMobile ? "85%" : "70%",
    maxWidth: "400px",
    background: "white",
    padding: "80px 20px 30px",
    zIndex: 1050,
    overflowY: "auto",
    transition: "transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    transform: menuOpen ? "translateX(0)" : "translateX(100%)",
    boxShadow: "-4px 0 24px rgba(0,0,0,0.1)",
  };

  const mobileMenuItemStyle = (linkPath) => ({
    display: "block",
    textDecoration: "none",
    color: isActive(linkPath) ? "#2563eb" : "#1e293b",
    fontSize: isSmallMobile ? "15px" : "16px",
    fontWeight: 600,
    padding: isActive(linkPath) ? "10px 12px 10px 16px" : "10px 12px",
    borderRadius: "12px",
    transition: "0.15s",
    background: isActive(linkPath) ? "rgba(37,99,235,0.08)" : "transparent",
  });

  const mobileInfoSectionStyle = {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "12px",
    marginBottom: "20px",
  };

  const mobileInfoRowStyle = (isRed = false, isBold = true) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 0",
    borderBottom: "1px solid #e2e8f0",
    fontSize: isSmallMobile ? "12px" : "13px",
    fontWeight: isBold ? 700 : 500,
    color: isRed ? "#dc2626" : "#1e293b",
  });

  const mobileButtonBase = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px",
    borderRadius: "14px",
    fontSize: isSmallMobile ? "14px" : "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "0.2s",
  };

  const mobileLoginButtonStyle = {
    ...mobileButtonBase,
    border: "1px solid #e2e8f0",
    background: mobileLoginHovered ? "#f1f5f9" : "white",
    color: "#1e293b",
  };

  const mobileCtaStyle = {
    ...mobileButtonBase,
    border: "none",
    background: mobileCtaHovered
      ? "linear-gradient(135deg,#1a4fb3,#1e5fd4)"
      : "linear-gradient(135deg,#1e5fd4,#2563eb)",
    color: "white",
  };

  const mobileLabStyle = {
    ...mobileButtonBase,
    border: "none",
    background: mobileLabHovered ? "#1e293b" : "#334155",
    color: "white",
  };

  const keyframesStyle = `
    @keyframes navbarFadeIn {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes navLinksFadeUp {
      0% { opacity: 0; transform: translateY(5px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseDot {
      0% { opacity: 0.4; transform: translateX(-50%) scale(0.8); }
      50% { opacity: 1; transform: translateX(-50%) scale(1.2); }
      100% { opacity: 0.4; transform: translateX(-50%) scale(0.8); }
    }
    @keyframes fadeInOverlay {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  // ----- helper for active link -----
  const isActive = (path) => location.pathname === path;

  // ----- navigation handlers -----
  const handleExternalLink = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
    setMenuOpen(false);
  };

  const handleHelplineClick = () => {
    window.location.href = "tel:+917827908598";
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <nav ref={navbarRef} style={navbarStyle}>
        <div style={navbarContainerStyle}>
          <div style={topRowStyle}>
            <Link
              to="/"
              style={logoStyle}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src={logo} alt="Hospital Logo" style={logoImgStyle} />
              <div>
                <div style={logoNameStyle}>ST. JOSEPH'S</div>
                <div style={logoSubStyle}>Hospital Ghaziabad</div>
              </div>
            </Link>

            {!isMobile && (
              <div style={centerGroupStyle}>
                {showLocation && (
                  <div
                    style={infoItemStyle(locationHovered, "#334155")}
                    onMouseEnter={() => setLocationHovered(true)}
                    onMouseLeave={() => setLocationHovered(false)}
                    onClick={() => navigate("/admin-login")}
                    title="Admin Login"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={infoIconStyle}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Ghaziabad</span>
                  </div>
                )}
                {showEmergency && (
                  <div
                    style={emergencyItemStyle(emergencyHovered)}
                    onMouseEnter={() => setEmergencyHovered(true)}
                    onMouseLeave={() => setEmergencyHovered(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ ...infoIconStyle, color: "#dc2626" }}>
                      <path d="M12 8v4l3 3M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    </svg>
                    <span>24/7 Emergency</span>
                  </div>
                )}
                {showOpd && (
                  <div
                    style={infoItemStyle(opdHovered, "#334155")}
                    onMouseEnter={() => setOpdHovered(true)}
                    onMouseLeave={() => setOpdHovered(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={infoIconStyle}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Mon - Sat OPD</span>
                  </div>
                )}
                {showHelpline && (
                  <div
                    style={helplineItemStyle(helplineHovered)}
                    onMouseEnter={() => setHelplineHovered(true)}
                    onMouseLeave={() => setHelplineHovered(false)}
                    onClick={handleHelplineClick}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Helpline: +91 7827-908-598</span>
                  </div>
                )}
              </div>
            )}

            <div style={rightGroupStyle}>
              <button
                style={loginButtonStyle}
                onClick={() => handleExternalLink(hisLoginUrl)}
                onMouseEnter={() => setLoginHovered(true)}
                onMouseLeave={() => setLoginHovered(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                HIS Login
              </button>
              <button
                style={ctaButtonStyle}
                onClick={() => handleExternalLink(bookAppointmentUrl)}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Appointment
              </button>
              <button
                style={labReportButtonStyle}
                onClick={() => handleExternalLink(labReportUrl)}
                onMouseEnter={() => setLabReportHovered(true)}
                onMouseLeave={() => setLabReportHovered(false)}
                title="View Lab Reports"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Lab Report
              </button>
              <button style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
                <span style={hamburgerSpanStyle(0)} />
                <span style={hamburgerSpanStyle(1)} />
                <span style={hamburgerSpanStyle(2)} />
              </button>
            </div>
          </div>

          {!isMobile && (
            <div style={bottomRowStyle}>
              <ul style={navLinksContainerStyle}>
                {navLinks.map((link, idx) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      style={linkStyle(link.path, idx)}
                      onMouseEnter={() => setHoveredLink(idx)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                      {isActive(link.path) && <span style={activeDotStyle} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile drawer (unchanged) */}
      <div style={mobileMenuOverlayStyle} onClick={() => setMenuOpen(false)} />
      <div style={mobileMenuStyle}>
        <div style={mobileInfoSectionStyle}>
          <div
            style={{ ...mobileInfoRowStyle(false), cursor: "pointer" }}
            onClick={() => {
              setMenuOpen(false);
              navigate("/admin-login");
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" width="16" height="16">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Ghaziabad </span>
          </div>
          <div style={mobileInfoRowStyle(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" width="16" height="16">
              <path d="M12 8v4l3 3M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
            </svg>
            <span>24/7 Emergency Care</span>
          </div>
          <div style={mobileInfoRowStyle(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" width="16" height="16">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Mon - Sat: 9AM - 7PM</span>
          </div>
          <div
            style={{ ...mobileInfoRowStyle(false), borderBottom: "none", cursor: "pointer" }}
            onClick={handleHelplineClick}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" width="16" height="16">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Helpline: +91 7827-908-598</span>
          </div>
        </div>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                style={mobileMenuItemStyle(link.path)}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            style={mobileLoginButtonStyle}
            onClick={() => handleExternalLink(hisLoginUrl)}
            onMouseEnter={() => setMobileLoginHovered(true)}
            onMouseLeave={() => setMobileLoginHovered(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            HIS Login
          </button>
          <button
            style={mobileCtaStyle}
            onClick={() => handleExternalLink(bookAppointmentUrl)}
            onMouseEnter={() => setMobileCtaHovered(true)}
            onMouseLeave={() => setMobileCtaHovered(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book Appointment
          </button>
          <button
            style={mobileLabStyle}
            onClick={() => handleExternalLink(labReportUrl)}
            onMouseEnter={() => setMobileLabHovered(true)}
            onMouseLeave={() => setMobileLabHovered(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Lab Report
          </button>
        </div>
      </div>
    </>
  );
}