import { useState, useEffect } from "react";
import banner5 from "../assets/hospitalimage/banner5.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api";

// Import social media icons from assets/Icons
import facebookIcon from "../assets/Icons/facebook.png";
import whatsappIcon from "../assets/Icons/whatsappIcon.png";
import instagramIcon from "../assets/Icons/Instagram.png";
import linkedinIcon from "../assets/Icons/linkedin.png";
import youtubeIcon from "../assets/Icons/youtube.png";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
}

// Categories for image filtering
const categories = [
  { icon: "⊞", label: "All Gallery", value: "all" },
  { icon: "🏛️", label: "Hospital Facilities", value: "Facilities" },
  { icon: "🏥", label: "Departments", value: "Departments" },
  { icon: "🩺", label: "Patient Care", value: "Patient Care" },
  { icon: "🎪", label: "Events", value: "Events" },
  { icon: "🤝", label: "Community", value: "Community" },
];

// Social media links with imported icons
const socialLinks = [
  { icon: facebookIcon, name: "Facebook", url: "https://www.facebook.com/profile.php?id=100077486113772" },
  { icon: whatsappIcon, name: "WhatsApp", url: "https://wa.me/917827908598" },
  { icon: instagramIcon, name: "Instagram", url: "https://instagram.com/yourhospital" },
  { icon: linkedinIcon, name: "LinkedIn", url: "https://www.linkedin.com/in/st-joseph-s-hospital-7423652a7/" },
  { icon: youtubeIcon, name: "YouTube", url: "https://www.youtube.com/@STJOSEPHSHOSPITAL" },
];

// Helper SVG icon
const Ico = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const IC = { arrow: "M17 8l4 4m0 0l-4 4m4-4H3" };

// ---------- Styles ----------
const s = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#1a1a2e",
    backgroundColor: "#f8faff",
    overflowX: "hidden",
  },
  container: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    paddingLeft: "24px",
    paddingRight: "24px",
    boxSizing: "border-box",
  },
  heroSection: {
    background: "#0d1f3c",
    position: "relative",
    overflow: "hidden",
    minHeight: "70vh",
  },
  heroRightImage: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "65%",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    opacity: 0.95,
  },
  heroImageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg, #0d1f3c 15%, transparent 55%)",
  },
  heroTextContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "620px",
    padding: "60px 0 80px",
  },
  heroPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.12)",
    color: "white",
    borderRadius: 40,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 16,
  },
  heroPillDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#22d3ee",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
    fontWeight: 900,
    color: "#ffffff",
    lineHeight: 1.2,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroUnderline: {
    width: 70,
    height: 4,
    background: "#22d3ee",
    borderRadius: 2,
    marginBottom: 28,
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    color: "rgba(255,255,255,0.9)",
    lineHeight: 1.7,
    marginBottom: 16,
  },
  heroDesc: {
    fontSize: "clamp(0.95rem, 1.8vw, 1rem)",
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.7,
    marginBottom: 24,
  },
  heroHighlights: {
    display: "flex",
    gap: 20,
    marginTop: 40,
    flexWrap: "wrap",
  },
  highlightChip: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 60,
    padding: "10px 20px 10px 16px",
    backdropFilter: "blur(4px)",
  },
  highlightText: {
    fontSize: 15,
    fontWeight: 600,
    color: "white",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all .3s ease",
    textDecoration: "none",
    fontFamily: "inherit",
  },
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: 10,
    padding: "12px 26px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all .3s ease",
    textDecoration: "none",
    fontFamily: "inherit",
  },
  // ---------- NEW MARQUEE STYLES ----------
  marqueeSection: {
    padding: "40px 0 10px",
    background: "#f8faff",
  },
 
  marqueeContainer: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  marqueeTrack: {
    display: "flex",
    gap: "16px",
    animation: "scrollMarquee 25s linear infinite",
    width: "max-content",
  },
  marqueeTrackPaused: {
    animationPlayState: "paused",
  },
  marqueeImage: {
    flex: "0 0 auto",
    width: "420px",
    height: "260px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.3s",
  },
  marqueeImageHover: {
    transform: "scale(1.03)",
  },
  // -----------------------------------------
  filterSection: { padding: "60px 0 20px" },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "60px",
    padding: "8px 16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    marginBottom: "20px",
  },
  filterBarMobile: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "60px",
    padding: "12px 20px",
    marginBottom: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  filterBtn: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    color: active ? "#fff" : "#1e293b",
    backgroundColor: active ? "#2563eb" : "transparent",
    border: "none",
    borderRadius: "40px",
    transition: "all 0.2s ease",
    boxShadow: active ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
  }),
  gallerySection: { paddingBottom: "60px" },
  galleryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },
  galleryTitle: { fontSize: "clamp(24px,3vw,36px)", fontWeight: "800", color: "#0f172a" },
  galleryControls: { display: "flex", gap: "12px", flexWrap: "wrap" },
  sortSelect: {
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    backgroundColor: "#fff",
    outline: "none",
  },
  viewVideosBtn: {
    padding: "12px 20px",
    border: "2px solid #2563eb",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#2563eb",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    transition: "all 0.2s ease",
  },
  grid: {
    display: "grid",
    gap: "20px",
    marginBottom: "20px",
  },
  galleryItem: {
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    animation: "fadeInUp 0.5s ease forwards",
  },
  galleryImage: (url, height) => ({
    height: height,
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }),
  galleryOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "18px",
  },
  galleryItemLabel: { color: "#fff", fontSize: "16px", fontWeight: "700" },
  galleryItemTag: { color: "#cbd5e1", fontSize: "12px", marginTop: "4px" },
  socialWrap: { width: "100%", backgroundColor: "#0f172a" },
  socialBanner: {
    padding: "60px 24px",
    textAlign: "center",
  },
  socialTitle: {
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "12px",
  },
  socialSubtitle: {
    fontSize: "16px",
    color: "#cbd5e1",
    marginBottom: "40px",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  socialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "24px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  socialCard: (hovered) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "20px 16px",
    backgroundColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
    borderRadius: "20px",
    textDecoration: "none",
    transition: "all 0.25s ease",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    backdropFilter: "blur(4px)",
  }),
  socialIconImg: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
  },
  socialName: { fontSize: "16px", fontWeight: "600", color: "#ffffff" },
  ctaWrap: { paddingBottom: "50px", paddingTop: "50px" },
  ctaBanner: {
    background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%)",
    borderRadius: "24px",
    padding: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
  },
  ctaLeft: { flex: 1, minWidth: "260px" },
  ctaTitle: { fontSize: "clamp(28px,4vw,42px)", fontWeight: "800", color: "#fff", lineHeight: "1.2" },
  ctaDesc: { fontSize: "15px", color: "#dbeafe", marginTop: "10px" },
  ctaBtn: {
    backgroundColor: "#fff",
    color: "#2563eb",
    border: "none",
    padding: "15px 30px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  subscribeWrap: { paddingBottom: "60px" },
  subscribeStrip: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "28px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  subscribeText: { flex: 1, minWidth: "220px" },
  subscribeTitle: { fontSize: "16px", fontWeight: "700" },
  subscribeDesc: { fontSize: "13px", color: "#64748b", marginTop: "4px" },
  subscribeInput: {
    flex: 1,
    minWidth: "240px",
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },
  subscribeBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },
  // MODAL STYLES - With dual close buttons (top-left corner + top-right corner)
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  modalContent: {
    position: "relative",
    maxWidth: "min(80vw, 800px)",
    maxHeight: "min(80vh, 600px)",
    width: "auto",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "default",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  },
  modalImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },
  modalCloseTopRight: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    background: "rgba(0,0,0,0.7)",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  modalCloseTopLeft: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.2)",
    zIndex: 10,
  },
  modalCaption: {
    position: "absolute",
    bottom: "-40px",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    fontSize: "14px",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "6px 16px",
    borderRadius: "20px",
    width: "fit-content",
    margin: "0 auto",
    backdropFilter: "blur(4px)",
    fontWeight: 500,
  },
  videoModalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.95)",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  videoModalContent: {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
    width: "1000px",
    backgroundColor: "#1e293b",
    borderRadius: "24px",
    overflow: "hidden",
    cursor: "default",
  },
  videoModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#0f172a",
    color: "#fff",
  },
  videoModalTitle: { fontSize: "20px", fontWeight: "700" },
  videoModalClose: {
    fontSize: "28px",
    cursor: "pointer",
    transition: "0.2s",
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    padding: "24px",
    maxHeight: "70vh",
    overflowY: "auto",
  },
  videoCard: {
    backgroundColor: "#334155",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  videoThumb: { width: "100%", height: "160px", objectFit: "cover" },
  videoCardTitle: { padding: "12px", fontSize: "14px", fontWeight: "600", color: "#fff", textAlign: "center" },
  videoPlayer: {
    width: "100%",
    height: "500px",
    border: "none",
  },
};

// Gallery Item Component
function GalleryItem({ item, height, onImageClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...s.galleryItem,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onImageClick(item)}
    >
      <div style={s.galleryImage(item.imageUrl, height)}>
        <div style={s.galleryOverlay}>
          <div style={s.galleryItemLabel}>{item.label}</div>
          <div style={s.galleryItemTag}>{item.category || item.tag}</div>
        </div>
      </div>
    </div>
  );
}

// Social Media Section
function SocialMediaSection() {
  const [hoverIndex, setHoverIndex] = useState(null);
  return (
    <div style={s.socialWrap}>
      <div style={s.container}>
        <div style={s.socialBanner}>
          <div style={s.socialTitle}>Follow Us</div>
          <div style={s.socialSubtitle}>Stay connected with us on social media</div>
          <div style={s.socialGrid}>
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={s.socialCard(hoverIndex === idx)}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <img src={social.icon} alt={social.name} style={s.socialIconImg} />
                <div style={s.socialName}>{social.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Gallery Modal
function VideoGalleryModal({ isOpen, onClose, videos, loading }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  if (!isOpen) return null;
  return (
    <div style={s.videoModalOverlay} onClick={onClose}>
      <div style={s.videoModalContent} onClick={(e) => e.stopPropagation()}>
        <div style={s.videoModalHeader}>
          <div style={s.videoModalTitle}>Our Video Gallery</div>
          <div style={s.videoModalClose} onClick={onClose}>✕</div>
        </div>
        {selectedVideo ? (
          <div>
            <iframe
              style={s.videoPlayer}
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div style={{ padding: "12px 24px", backgroundColor: "#0f172a", color: "#fff", textAlign: "center" }}>
              <button
                onClick={() => setSelectedVideo(null)}
                style={{
                  background: "#2563eb",
                  border: "none",
                  color: "#fff",
                  padding: "8px 20px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ← Back to Videos
              </button>
            </div>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#cbd5e1" }}>Loading videos...</div>
        ) : videos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#cbd5e1" }}>No videos available.</div>
        ) : (
          <div style={s.videoGrid}>
            {videos.map((video) => (
              <div
                key={video._id}
                style={s.videoCard}
                onClick={() => setSelectedVideo(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  style={s.videoThumb}
                />
                <div style={s.videoCardTitle}>{video.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Image Lightbox Component - With dual close buttons (top-left and top-right)
function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!item) return null;

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <div style={s.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close button - Top Left corner inside image */}
        <div 
          style={s.modalCloseTopLeft} 
          onClick={onClose}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.6)")}
        >
          ✕
        </div>
        
        {/* Close button - Top Right corner (outside) */}
        <div 
          style={s.modalCloseTopRight} 
          onClick={onClose}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)")}
        >
          ✕
        </div>
        
        <img 
          src={item.imageUrl} 
          alt={item.label} 
          style={s.modalImage} 
        />
        
        <div style={s.modalCaption}>
          {item.label} • {item.category || item.tag}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function HealthCareGalleryPage() {
  const isMobile = useIsMobile();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);

  // Video state
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  // State for marquee pause
  const [marqueePaused, setMarqueePaused] = useState(false);

  useEffect(() => {
    setHeroAnimated(true);
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes heroGlow {
        0% { opacity: 0; transform: scale(0.98) translateY(20px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes scrollMarquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .hero-animate {
        animation: heroGlow 0.9s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Fetch gallery images
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await API.get('/gallery');
        setGalleryItems(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError("Unable to load gallery images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoadingVideos(true);
        const res = await API.get('/videos');
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoadingVideos(false);
      }
    };
    fetchVideos();
  }, []);

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const firstRow = filteredItems.slice(0, 3);
  const secondRow = filteredItems.slice(3, 6);
  const thirdRow = filteredItems.slice(6, 11);

  const openLightbox = (item) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const row1Cols = isMobile ? "1fr" : "repeat(3,1fr)";
  const row2Cols = isMobile ? "1fr" : "repeat(3,1fr)";
  const row3Cols = isMobile ? "1fr 1fr" : "repeat(5,1fr)";
  const ctaPadding = isMobile ? "40px 24px" : "60px";
  const subscribeDirection = isMobile ? "column" : "row";

  const handleBookAppointment = () => {
    window.location.href = "http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx";
  };
  const handleExploreServices = () => (window.location.href = "/services");

  // ---------- MARQUEE RENDER ----------
  const renderMarquee = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
          Loading images...
        </div>
      );
    }
    if (galleryItems.length === 0) return null;

    // Duplicate the array to make the scroll seamless (infinite)
    const marqueeImages = [...galleryItems, ...galleryItems];

    return (
      <div style={s.marqueeSection}>
        <div style={s.container}>
          <div 
            style={s.marqueeContainer}
            onMouseEnter={() => setMarqueePaused(true)}
            onMouseLeave={() => setMarqueePaused(false)}
          >
            <div 
              style={{
                ...s.marqueeTrack,
                animationPlayState: marqueePaused ? "paused" : "running",
              }}
            >
              {marqueeImages.map((item, idx) => (
                <img
                  key={idx}
                  src={item.imageUrl}
                  alt={item.label}
                  style={s.marqueeImage}
                  onClick={() => openLightbox(item)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  // ------------------------------------

  return (
    <div style={s.page}>
      <Navbar />

      {/* Hero Section */}
      <div style={s.heroSection}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: -60, left: 300, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)", zIndex: 0 }} />

        <div className="hc-hero-right-image" style={s.heroRightImage}>
          <img src={banner5} alt="Gallery hero" style={s.heroImage} />
          <div style={s.heroImageOverlay} />
        </div>

        <div style={s.container}>
          <div style={s.heroTextContent}>
            <div className={heroAnimated ? "hero-animate" : ""} style={{ opacity: heroAnimated ? 1 : 0 }}>
              <div style={s.heroPill}>
                <span style={s.heroPillDot}></span> Our Gallery
              </div>
              <h1 style={s.heroTitle}>
                Moments of Care.<br /> Stories of Compassion.
              </h1>
              <div style={s.heroUnderline} />
              <p style={s.heroSubtitle}>
                Explore moments that reflect our commitment to exceptional care,
                advanced technology, and a healthier community.
              </p>
              <div style={s.heroHighlights}>
                <div style={s.highlightChip}>
                  <Ico d="M12 2v20M2 12h20" size={18} color="#22d3ee" />
                  <span style={s.highlightText}>5M+ Happy Patients</span>
                </div>
                <div style={s.highlightChip}>
                  <Ico d="M3 12v6m18-6v6M3 18h18M3 6h18M7 12V6m10 6V6" size={18} color="#22d3ee" />
                  <span style={s.highlightText}>100+ Beds</span>
                </div>
                <div style={s.highlightChip}>
                  <Ico d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" size={18} color="#22d3ee" />
                  <span style={s.highlightText}>24/7 Emergency</span>
                </div>
                <div style={s.highlightChip}>
                  <Ico d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" size={18} color="#22d3ee" />
                  <span style={s.highlightText}>NABH Accredited</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 40 }}>
                <button
                  className="hc-btn-primary"
                  style={s.btnPrimary}
                  onClick={() => window.location.href = 'http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx'}
                >
                  Book Appointment <Ico d={IC.arrow} size={18} color="#fff" />
                </button>
                <button className="hc-btn-outline" style={s.btnOutline} onClick={handleExploreServices}>
                  Explore Services <Ico d={IC.arrow} size={18} color="#fff" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== NEW AUTO‑SCROLLING MARQUEE ====== */}
      {renderMarquee()}

      {/* Filter Section */}
      <section style={s.filterSection}>
        <div style={s.container}>
          {isMobile ? (
            <div style={s.filterBarMobile}>
              {categories.map((c) => (
                <button
                  key={c.value}
                  style={s.filterBtn(activeFilter === c.value)}
                  onClick={() => setActiveFilter(c.value)}
                >
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          ) : (
            <div style={s.filterBar}>
              {categories.map((c) => (
                <button
                  key={c.value}
                  style={s.filterBtn(activeFilter === c.value)}
                  onClick={() => setActiveFilter(c.value)}
                >
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section style={s.gallerySection}>
        <div style={s.container}>
          <div style={s.galleryHeader}>
            <h2 style={s.galleryTitle}>Gallery</h2>
            <div style={s.galleryControls}>
              <select style={s.sortSelect}>
                <option>Latest First</option>
                <option>Oldest First</option>
                <option>Most Viewed</option>
              </select>
              <button
                style={s.viewVideosBtn}
                onClick={() => setShowVideoModal(true)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb", e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff", e.currentTarget.style.color = "#2563eb")}
              >
                ▶ View Videos
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>Loading gallery...</div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#ef4444" }}>{error}</div>
          ) : (
            <>
              {firstRow.length > 0 && (
                <div style={{ ...s.grid, gridTemplateColumns: row1Cols }}>
                  {firstRow.map((item, idx) => (
                    <GalleryItem key={idx} item={item} height={isMobile ? "220px" : "300px"} onImageClick={openLightbox} />
                  ))}
                </div>
              )}
              {secondRow.length > 0 && (
                <div style={{ ...s.grid, gridTemplateColumns: row2Cols }}>
                  {secondRow.map((item, idx) => (
                    <GalleryItem key={idx} item={item} height={isMobile ? "220px" : "240px"} onImageClick={openLightbox} />
                  ))}
                </div>
              )}
              {thirdRow.length > 0 && (
                <div style={{ ...s.grid, gridTemplateColumns: row3Cols }}>
                  {thirdRow.map((item, idx) => (
                    <GalleryItem key={idx} item={item} height={isMobile ? "160px" : "180px"} onImageClick={openLightbox} />
                  ))}
                </div>
              )}
              {filteredItems.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  No images found in this category.
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <SocialMediaSection />

      {/* CTA Banner */}
      <section style={s.ctaWrap}>
        <div style={s.container}>
          <div style={{ ...s.ctaBanner, padding: ctaPadding, textAlign: isMobile ? "center" : "left", justifyContent: isMobile ? "center" : "space-between" }}>
            <div style={s.ctaLeft}>
              <div style={s.ctaTitle}>
                Every Moment Reflects<br /> Our Promise of Care
              </div>
              <div style={s.ctaDesc}>Compassion in every step. Excellence in every detail.</div>
            </div>
            <button style={s.ctaBtn} onClick={handleBookAppointment}>Book Appointment →</button>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section style={s.subscribeWrap}>
        <div style={s.container}>
          <div style={{ ...s.subscribeStrip, flexDirection: subscribeDirection, alignItems: subscribeDirection === "column" ? "stretch" : "center" }}>
            <div style={s.subscribeText}>
              <div style={s.subscribeTitle}>Stay Connected</div>
              <div style={s.subscribeDesc}>Subscribe to our newsletter for updates and health tips straight to your inbox.</div>
            </div>
            <input style={s.subscribeInput} placeholder="Enter your email" />
            <button style={s.subscribeBtn}>Subscribe Now →</button>
          </div>
        </div>
      </section>

      {/* Image Lightbox - With dual close buttons (top-left and top-right) */}
      <ImageLightbox item={lightboxItem} onClose={closeLightbox} />

      {/* Video Modal */}
      <VideoGalleryModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} videos={videos} loading={loadingVideos} />
      <Footer />
    </div>
  );
}