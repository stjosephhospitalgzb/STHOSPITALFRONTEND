import React, { useState, useEffect, useRef } from "react";
import nurseAvatar from "../assets/CHATGPT.png";
import API from "../api";

// --- ICON IMPORTS ---
import hospitalIcon from "../assets/chatbot/hospital.png";
import tpaServicesIcon from "../assets/chatbot/TPAServices.png";
import takeAppointmentIcon from "../assets/chatbot/TakeAppointment.png";
import contactInfoIcon from "../assets/chatbot/ContactInfo.png";
import universityIcon from "../assets/chatbot/university.png";
import careersIcon from "../assets/chatbot/Careers.png";
import servicesIcon from "../assets/chatbot/Services.png";
import doctorsTimingIcon from "../assets/chatbot/DoctorsTiming.png";
import clearChatIcon from "../assets/chatbot/ClearChat.png";
import mainMenuIcon from "../assets/chatbot/MainMenu.png";
import closeChatIcon from "../assets/chatbot/CloseChat.png";
import doctorNameIcon from "../assets/chatbot/DoctorName.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showQuickHelp, setShowQuickHelp] = useState(true);
  const [showDoctorTimingMenu, setShowDoctorTimingMenu] = useState(false);
  const [doctorTimingMode, setDoctorTimingMode] = useState(null);
  const [selectedDept, setSelectedDept] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isExtraSmall, setIsExtraSmall] = useState(false);
  const [showPostMessageOptions, setShowPostMessageOptions] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [doctorsError, setDoctorsError] = useState(false);

  const [jobsList, setJobsList] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState(false);

  // Flag to remember we are waiting for doctors to load
  const [pendingTimingAction, setPendingTimingAction] = useState(false);

  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const typingMessageIdRef = useRef(null);
  const typingPlainTextRef = useRef("");
  const typingFormattedHtmlRef = useRef("");

  // Auto-hide initial popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPopup(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640);
      setIsExtraSmall(width <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  // Fetch doctors from API – filter out Emergency department
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        setDoctorsError(false);
        const response = await API.get('/doctors');
        let allDoctors = response.data;
        const filteredDoctors = allDoctors.filter(
          doc => doc.dept && doc.dept.toLowerCase() !== "emergency"
        );
        setDoctors(filteredDoctors);
        const depts = [...new Set(filteredDoctors.map(doc => doc.dept).filter(Boolean))];
        setDepartments(depts);
      } catch (error) {
        console.error("Error fetching doctors for chatbot:", error);
        setDoctorsError(true);
        setDoctors([]);
        setDepartments([]);
        if (isOpen && messages.length === 0) {
          addBotMessageWithTyping(
            "⚠️ Unable to load doctor information at the moment. Please try again later or contact hospital reception for doctor timings.",
            false
          );
        }
      } finally {
        setLoadingDoctors(false);
        // If we were waiting for doctors to load, proceed with timing options
        if (pendingTimingAction) {
          setPendingTimingAction(false);
          // Now show the doctor timing menu
          showDoctorTimingOptions();
        }
      }
    };
    fetchDoctors();
  }, [isOpen]);

  // Separate function to show timing options after load
  const showDoctorTimingOptions = () => {
    if (doctorsError || doctors.length === 0) {
      addBotMessageWithTyping("⚠️ Doctor information is currently unavailable. Please contact hospital reception for doctor timings.", false);
      return;
    }
    setShowQuickHelp(false);
    setShowDoctorTimingMenu(true);
    setDoctorTimingMode(null);
    setQuickReplyButtons([]);
    addBotMessageWithTyping("🕐 Please choose how you'd like to see doctor timings:", false);
  };

  const highlightImportant = (text) => {
    const keywords = [
      "NABH-accredited", "multi-specialty", "cashless hospitalization", "24/7 Emergency",
      "Vision", "Mission", "Core Values", "TPA", "Insurance", "Admission",
      "Emergency", "OPD", "Paramedical", "Careers", "Services", "Helpline",
      "St. Joseph's Hospital Ghaziabad "
    ];
    let highlighted = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, `<mark class="important-highlight">$1</mark>`);
    });
    return highlighted;
  };

  const formatBotAnswer = (rawText, isTpaService = false) => {
    let text = rawText.replace(/\*\*/g, '');
    if (isTpaService) {
      const companiesStart = "Empanelled Insurance & TPA Partners:";
      const companiesEnd = "Cashless TPA Procedure:";
      const startIdx = text.indexOf(companiesStart);
      const endIdx = text.indexOf(companiesEnd);
      if (startIdx !== -1 && endIdx !== -1) {
        const beforeList = text.substring(0, startIdx + companiesStart.length);
        let listSection = text.substring(startIdx + companiesStart.length, endIdx);
        const afterList = text.substring(endIdx);
        const companies = listSection.split(',').map(c => c.trim()).filter(c => c.length > 0);
        const orderedList = `<ol class="tpa-ordered-list">${companies.map(c => `<li>${c}</li>`).join('')}</ol>`;
        text = beforeList + orderedList + afterList;
      }
    }
    let withBreaks = text.replace(/\n/g, '<br/>');
    return highlightImportant(withBreaks);
  };

  const getPlainTextForTyping = (rawText) => rawText.replace(/\*\*/g, '');

  const stopAndFinalizeTyping = (shouldHideOptions = true) => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    if (typingMessageIdRef.current !== null) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageIdRef.current
            ? { ...msg, text: typingFormattedHtmlRef.current, isHtml: true }
            : msg
        )
      );
      typingMessageIdRef.current = null;
      typingPlainTextRef.current = "";
      typingFormattedHtmlRef.current = "";
    }
    if (isBotTyping) setIsBotTyping(false);
    if (shouldHideOptions) setShowPostMessageOptions(false);
  };

  const addBotMessageWithTyping = (rawFullText, isTpa = false) => {
    stopAndFinalizeTyping(true);
    const plainText = getPlainTextForTyping(rawFullText);
    const formattedHtml = formatBotAnswer(rawFullText, isTpa);
    const tempId = Date.now() + Math.random();
    const newBotMessage = { id: tempId, sender: "bot", text: "", isHtml: false };
    setMessages((prev) => [...prev, newBotMessage]);
    setIsBotTyping(true);
    typingMessageIdRef.current = tempId;
    typingPlainTextRef.current = plainText;
    typingFormattedHtmlRef.current = formattedHtml;
    let currentIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < plainText.length) {
        currentIndex++;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, text: plainText.slice(0, currentIndex), isHtml: false } : msg
          )
        );
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, text: formattedHtml, isHtml: true } : msg
          )
        );
        typingMessageIdRef.current = null;
        setIsBotTyping(false);
        setShowPostMessageOptions(true);
      }
    }, 35);
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), sender, text, isHtml: false }]);
  };

  const clearChat = () => {
    stopAndFinalizeTyping(true);
    setShowQuickHelp(true);
    setShowDoctorTimingMenu(false);
    setDoctorTimingMode(null);
    setSelectedDept("");
    setQuickReplyButtons([]);
    setShowPostMessageOptions(false);
    setMessages([]);
    const welcomePlain = "Hello! I'm your AI. KALYANI💜 How can I help you today? Feel free to click on any option below or type your question.";
    addBotMessageWithTyping(welcomePlain, false);
  };

  const resetToMainMenu = clearChat;

  // --- Show contact info with clickable phone numbers ---
  const showContactInfo = () => {
    const contactHtml = `
      <div>
        <p>📞 <strong>St. Joseph's Hospital Ghaziabad  – Contact Information</strong></p>
        <p><strong>Emergency & General Enquiries</strong><br/>
        📱 <a href="tel:+917827908598" style="color:#2563eb; text-decoration:underline;">+91 7827-908-598</a>, 
        <a href="tel:+917827908595" style="color:#2563eb; text-decoration:underline;">+91 7827-908-595</a><br/>
        ☎️ Phone: 0120-2871146, 0120-2872246</p>
        <p><strong>Patient Enquiries</strong><br/>
        📧 sjhospital.tpa@gmail.com (TPA Desk)<br/>
        📧 stjosephgzb@rediffmail.com (Admin Office)</p>
        <p><strong>Hospital Address</strong><br/>
        🏥 ST. JOSEPH'S HOSPITAL<br/>
        Meerut Rd, Mariam Nagar, Sewa Nagar, Ghaziabad, Uttar Pradesh 201003</p>
        <p><strong>Office Contact</strong><br/>
        📧 sjhospital.tpa@gmail.com</p>
      </div>
    `;
    const tempId = Date.now() + Math.random();
    setMessages((prev) => [...prev, { id: tempId, sender: "bot", text: contactHtml, isHtml: true }]);
    setShowPostMessageOptions(true);
  };

  const handleCallUs = () => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    addMessage("user", "Call Us");
    showContactInfo();
  };

  const handleShowMenuOptions = () => {
    stopAndFinalizeTyping(true);
    setShowQuickHelp(true);
    setShowDoctorTimingMenu(false);
    setDoctorTimingMode(null);
    setSelectedDept("");
    setQuickReplyButtons([]);
    setShowPostMessageOptions(false);
  };

  // --- Take Appointment: show Online Appointment & Find the Doctor options ---
  const handleTakeAppointment = () => {
    stopAndFinalizeTyping(true);
    setShowQuickHelp(false);
    setShowDoctorTimingMenu(false);
    setDoctorTimingMode(null);
    setQuickReplyButtons([]);
    setShowPostMessageOptions(false);
    addMessage("user", "Take Appointment");

    addBotMessageWithTyping("How would you like to proceed?", false);
    setQuickReplyButtons([
      {
        label: "💻 Online Appointment",
        action: () => {
          stopAndFinalizeTyping(true);
          setQuickReplyButtons([]);
          addMessage("user", "Online Appointment");
          window.open("http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx", "_blank");
          addBotMessageWithTyping("You have been redirected to our online appointment portal. Please complete the form there. If you need any assistance, feel free to ask!", false);
        }
      },
      {
        label: "🔍 Find the Doctor",
        action: () => {
          stopAndFinalizeTyping(true);
          setQuickReplyButtons([]);
          addMessage("user", "Find the Doctor");
          handleDoctorsTiming();
        }
      }
    ]);
  };

  const handleDoctorsTiming = () => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    // If doctors are still loading, show a loading message and set flag
    if (loadingDoctors) {
      addBotMessageWithTyping("⏳ Loading doctor information, please wait...", false);
      setPendingTimingAction(true);
      return;
    }
    // If error or no doctors, show error
    if (doctorsError || doctors.length === 0) {
      addBotMessageWithTyping("⚠️ Doctor information is currently unavailable. Please contact hospital reception for doctor timings.", false);
      return;
    }
    // Otherwise show the timing menu
    showDoctorTimingOptions();
  };

  const handleFindByDept = () => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    if (loadingDoctors) {
      addBotMessageWithTyping("Loading departments, please wait...", false);
      return;
    }
    if (doctorsError || departments.length === 0) {
      addBotMessageWithTyping("Department list is currently unavailable. Please try again later.", false);
      return;
    }
    setDoctorTimingMode('dept');
    setShowDoctorTimingMenu(false);
    addMessage("user", "Find by department");
    showDepartmentList();
  };

  const showDepartmentList = () => {
    const deptButtons = departments.map(dept => ({
      label: dept,
      action: () => handleDepartmentSelect(dept)
    }));
    setQuickReplyButtons(deptButtons);
    addBotMessageWithTyping("Please select a department:", false);
  };

  const handleDepartmentSelect = (dept) => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    setSelectedDept(dept);
    addMessage("user", dept);
    const doctorsInDept = doctors.filter(doc => doc.dept === dept);
    if (doctorsInDept.length === 0) {
      addBotMessageWithTyping(`No doctors found in ${dept} department.`, false);
      resetDoctorTimingFlow();
      return;
    }
    // Room number removed from list label
    const docButtons = doctorsInDept.map(doc => ({
      label: `${doc.name} (${doc.dept})`,
      action: () => handleDoctorTimingSelect(doc)
    }));
    setQuickReplyButtons(docButtons);
    addBotMessageWithTyping(`Here are the doctors in ${dept}. Click on a doctor to see their OPD timings and room number:`, false);
  };

  const handleDoctorTimingSelect = (doctor) => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    addMessage("user", doctor.name);
    let timingText = doctor.opdTimings || "Timings not available. Please contact reception.";
    let roomText = doctor.roomNo ? `\n\n📍 **Room Number:** ${doctor.roomNo}` : "";
    const response = `👨‍⚕️ **${doctor.name}** (${doctor.dept})\n\n🕐 **OPD Timings:** ${timingText}${roomText}\n\nFor an appointment,  use the online booking portal.`;
    addBotMessageWithTyping(response, false);
    resetDoctorTimingFlow();
  };

  const handleFindByDoctorName = () => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    if (loadingDoctors) {
      addBotMessageWithTyping("Loading doctors list, please wait...", false);
      return;
    }
    if (doctorsError || doctors.length === 0) {
      addBotMessageWithTyping("Doctor list is currently unavailable. Please try again later.", false);
      return;
    }
    setDoctorTimingMode('doctor');
    setShowDoctorTimingMenu(false);
    addMessage("user", "Find by doctor name");
    showAllDoctorsList();
  };

  const showAllDoctorsList = () => {
    // Room number removed from list label
    const allDoctorButtons = doctors.map(doc => ({
      label: `${doc.name} (${doc.dept})`,
      action: () => handleDoctorTimingSelect(doc)
    }));
    setQuickReplyButtons(allDoctorButtons);
    addBotMessageWithTyping("Please select a doctor to see their OPD timings and room number:", false);
  };

  const resetDoctorTimingFlow = () => {
    setDoctorTimingMode(null);
    setSelectedDept("");
    setQuickReplyButtons([]);
    setShowDoctorTimingMenu(true);
  };

  const handleCareers = () => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    setShowQuickHelp(false);
    setShowDoctorTimingMenu(false);
    setDoctorTimingMode(null);
    setQuickReplyButtons([]);
    addMessage("user", "Careers");
    fetchAndDisplayJobs();
  };

  const fetchAndDisplayJobs = async () => {
    setLoadingJobs(true);
    setJobsError(false);
    try {
      const response = await API.get('/jobs');
      const jobsData = response.data;
      setJobsList(jobsData);
      if (!jobsData || jobsData.length === 0) {
        addBotMessageWithTyping("📭 There are no open positions at the moment. Please check back later or visit our Careers page for future opportunities.", false);
        setQuickReplyButtons([
          { label: "🏠 Main Menu", action: goBackToMainMenu },
          { label: "🌐 Visit Careers Page", action: () => window.open('/careers', '_blank') }
        ]);
        setLoadingJobs(false);
        return;
      }
      const jobsHtml = generateJobsHtml(jobsData);
      const tempId = Date.now() + Math.random();
      const newBotMessage = { id: tempId, sender: "bot", text: jobsHtml, isHtml: true };
      setMessages((prev) => [...prev, newBotMessage]);
      setQuickReplyButtons([
        { label: "📋 View Full Careers Page", action: () => window.open('/careers', '_blank') },
        { label: "🏠 Main Menu", action: goBackToMainMenu }
      ]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobsError(true);
      addBotMessageWithTyping("⚠️ Unable to load current job openings. Please try again later or contact our HR team at hr.sjhgzb@gmail.com", false);
      setQuickReplyButtons([
        { label: "🏠 Main Menu", action: goBackToMainMenu }
      ]);
    } finally {
      setLoadingJobs(false);
    }
  };

  const generateJobsHtml = (jobs) => {
    if (!jobs || jobs.length === 0) return "<p>No openings currently.</p>";
    let html = `<div style="font-family: inherit;"><p>💼 <strong>Current Open Positions (${jobs.length})</strong></p><ul style="margin: 8px 0 0 20px; padding-left: 0;">`;
    jobs.forEach(job => {
      const title = job.title || "Position";
      const dept = job.department || "General";
      const vacancies = job.vacancies || "Not specified";
      const qualification = job.qualification || "As per requirement";
      html += `<li style="margin-bottom: 12px;"><strong>${escapeHtml(title)}</strong> — ${escapeHtml(dept)}<br/>
               <span style="font-size: 12px; color: #4b5563;">👥 Vacancies: ${escapeHtml(String(vacancies))} | 🎓 Qualification: ${escapeHtml(qualification)}</span></li>`;
    });
    html += `</ul><p style="margin-top: 12px;">👉 Click the button below to visit our Careers page for detailed descriptions and to apply online.</p></div>`;
    return html;
  };

  const escapeHtml = (str) => {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  };

  const [quickReplyButtons, setQuickReplyButtons] = useState([]);

  const handleBackToTimingOptions = () => {
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    setShowDoctorTimingMenu(true);
    setQuickReplyButtons([]);
    setDoctorTimingMode(null);
    setSelectedDept("");
    setShowQuickHelp(false);
    addBotMessageWithTyping("Returning to doctor timing options. Please choose:", false);
  };

  const goBackToMainMenu = () => {
    stopAndFinalizeTyping(true);
    resetToMainMenu();
  };

  // Menu items (icons remain same)
  const menuItems = [
    { label: "About Hospital", iconImage: hospitalIcon },
    { label: "TPA Services", iconImage: tpaServicesIcon },
    { label: "Take Appointment", iconImage: takeAppointmentIcon },
    { label: "Contact Info", iconImage: contactInfoIcon },
    { label: "Paramedical Institute", iconImage: universityIcon },
    { label: "Careers", iconImage: careersIcon },
    { label: "Services", iconImage: servicesIcon },
  ];

  const botAnswers = {
    "About Hospital": "🏥 St. Joseph's Hospital, Ghaziabad, is a leading **NABH-accredited multi-specialty healthcare institution** dedicated to providing compassionate, ethical, affordable, and high-quality medical care. Established in 1990 and inspired by the vision of **Servant of God Rev. Fr. Joseph Panjikaran**, the hospital combines advanced medical technology with a patient-centered approach to healing.\n\nWith a team of **50+ highly qualified doctors**, modern infrastructure, and **100+ bed capacity**, St. Joseph's Hospital Ghaziabad offers comprehensive healthcare services across **10 General Services, 6 Contributory Departments, 8 Specialities, 8 Super Specialities, and 24/7 Emergency Care across 4 critical units**. The hospital remains committed to serving all sections of society, especially the poor and marginalized, while delivering excellence in healthcare.\n\n**Our Vision:** Be an angel of consolation to extend the compassionate love of Christ to bring about healing and wholeness.\n\n**Our Mission:**\n- To provide ethical, affordable, and quality healthcare.\n- To ensure preventive, promotive, curative, and rehabilitative care.\n- To serve all patients with dignity, compassion, and respect.\n- To give special attention to the poor and marginalized.\n\n**Our Core Values:** Respect for Life, Deliver Compassionate Care, Patient-Focused Service, Teamwork, Ethics and Integrity.\n\n**Hospital Highlights:**\n- 50+ Expert Doctors\n- 100+ Bed Capacity\n- 9M+ Patients Treated\n- 110+ Medical Apparatus\n- 5+ Dialysis Units\n- 10 General Services\n- 6 Contributory Departments\n- 8 Specialities\n- 8 Super Specialities\n- 24/7 Emergency Services across 4 dedicated emergency units\n\nFor more than three decades, St. Joseph's Hospital Ghaziabad has remained a trusted center of healing, combining medical excellence with compassion, faith, and a commitment to improving the health and well-being of every patient.",
    "TPA Services": "🛡️ St. Joseph's Hospital Ghaziabad provides cashless hospitalization facilities through a wide network of leading Insurance Companies and Third-Party Administrators (TPAs). Our dedicated TPA Desk assists patients with pre-authorization, claim processing, and cashless admission procedures to ensure a smooth and hassle-free experience.\n\n**Empanelled Insurance & TPA Partners:**\nAditya Birla Health Insurance, Bharat Electronics Limited (BEL), Chola MS General Insurance, Family Health Plan Insurance TPA (FHPL), Generali Central Insurance (Former Future Generali), Good Health TPA, HDFC ERGO General Insurance, Health India Insurance TPA, ICICI Lombard General Insurance, IndusInd General Insurance, Manipal Cigna Health Insurance, Magma General Insurance, MD India TPA, Med-Save Health Insurance TPA, Navi General Insurance, Niva Bupa Health Insurance, Paramount Health Services TPA, Park Mediclaim TPA, SBI General Insurance, Star Health & Allied Insurance, Tata AIG General Insurance, Universal Sompo General Insurance, Vidal Health TPA, Volo Health Insurance TPA.\n\n**TPA Contact:**\n📧 TPA Email: tpa@stjosephshospitalghaziabad.com\n📞 TPA Help Desk: Contact Hospital TPA Desk\n\n**Cashless TPA Procedure:**\n1. Submit your Insurance Card, Aadhaar Card, and PAN Card at the TPA Desk after admission.\n2. The hospital TPA team will verify your policy and submit the cashless authorization request to your insurance company/TPA.\n3. Once approval is received, eligible expenses will be covered as per policy terms.\n4. Any non-payable items, consumables, or excluded investigations must be paid by the patient.\n5. If the insurance company declines the claim, the patient will be responsible for the full hospital bill.",
    "Contact Info": "📞 **St. Joseph's Hospital Ghaziabad – Contact Information**\n\n**Emergency & General Enquiries**\n📱 Cell No: +91 7827-908-598, +91 7827-908-595\n☎️ Phone No: 0120-2871146, 0120-2872246\n\n**Patient Enquiries**\n📧 sjhospital.tpa@gmail.com (TPA Desk)\n📧 stjosephgzb@rediffmail.com (Admin Office)\n\n**Hospital Address**\n🏥 ST. JOSEPH'S HOSPITAL\"\nMeerut Rd, Mariam Nagar, Sewa Nagar, Ghaziabad, Uttar Pradesh 201003\n\n**Office Contact**\n📧 sjhospital.tpa@gmail.com",
    "Services": "🤲 Our Services:\n\n🏥 General Services:\n• General Medicine\n• General Surgery\n• Gynecology & Obstetrics\n• Pediatrics\n• Pediatric Surgery\n• Anesthesiology\n• ICU, NICU & PICU\n• Medical & Surgical ICU\n\n🔬 Diagnostic & Contributory Services:\n• Pathology\n• X-Ray, ECG & 2D Echo\n• Ultrasound\n• Mammography\n• CT Scan\n• EEG, EMG & NCV\n\n🩺 Speciality Services:\n• ENT\n• Orthopedics\n• Dental Care\n• Dermatology\n• Skin & VD\n• Cardiology\n• Oncology\n• Psychiatry\n\n⚕️ Super Speciality Services:\n• Uro Surgery\n• Laparoscopic Surgery\n• Plastic Surgery\n• Neuro Surgery\n• Nephrology\n• Neurology\n• Dialysis\n• Physiotherapy\n\n🚑 24/7 Emergency & Support:\n• Emergency Services\n• Pharmacy\n• Billing Services\n• Counseling\n\n👨‍⚕️ 50+ Expert Doctors | 🛏️ 100+ Beds | 🏥 NABH Accredited Hospital",
     "Paramedical Institute": "🎓 **St. Joseph's Paramedical Institute, Ghaziabad** (est. 2020), run by the Medical Sisters of St. Joseph, provides quality healthcare education with practical training, ethical values, and compassionate care. The institute is recognized by the Uttar Pradesh State Medical Faculty, Lucknow (Letter No. 1504/71-4-2020-N-8/2016, dated 20 Nov 2020).\n\n📚 **Course Offered:** Diploma in Medical Laboratory Technology (DMLT)\n⏳ **Duration:** 2 Years\n\n✅ **Eligibility:** 10+2 (Physics, Chemistry & Biology) with minimum 40% marks, age 17 years or above.\n\n📝 **Admission Process:** Application forms are available at the institute office or can be downloaded from www.stjosephhospitalgzb.com. Admission is based on an entrance examination conducted in July.\n\n📄 **Required Documents:** 10th & 12th mark sheets/certificates, Aadhaar Card, caste/residence/income certificates (if applicable), Transfer Certificate, character certificate, medical fitness certificate, and passport-size photographs.\n\n🏥 Over 100 students have successfully completed training and are serving in hospitals and healthcare institutions. For admission details and fee information, please contact the institute office."  };
  const defaultAnswer = "💜 I'm here to help with hospital-related queries. Please use the buttons above for specific information, or contact our front desk at 1800-123-HEAL.";

  const handleMenuItemClick = (label) => {
    if (label === "Take Appointment") {
      handleTakeAppointment();
      return;
    }
    if (label === "Doctors Timing") {
      handleDoctorsTiming();
      return;
    }
    if (label === "Careers") {
      handleCareers();
      return;
    }
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    setShowQuickHelp(false);
    setShowDoctorTimingMenu(false);
    setDoctorTimingMode(null);
    setQuickReplyButtons([]);
    addMessage("user", label);
    const answer = botAnswers[label] || defaultAnswer;
    const isTpa = (label === "TPA Services");
    addBotMessageWithTyping(answer, isTpa);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    stopAndFinalizeTyping(true);
    setShowPostMessageOptions(false);
    setShowQuickHelp(false);
    setShowDoctorTimingMenu(false);
    setDoctorTimingMode(null);
    setQuickReplyButtons([]);
    addMessage("user", inputText.trim());
    setInputText("");
    addBotMessageWithTyping(
      "👋 Hello! I'm your AI. KALYANI 💜. I'm here to help with your healthcare queries. You can select an option below or simply type your question. Need urgent assistance? Our support team is available 24×7 at +91 7827-908-598.",
      false
    );
  };

  // Reusable icon sizes
  const iconSize = isMobile ? 18 : 22;
  const iconStyle = { width: iconSize, height: iconSize, objectFit: 'contain' };
  const smallIconSize = isExtraSmall ? 16 : (isMobile ? 18 : 22);
  const smallIconStyle = { width: smallIconSize, height: smallIconSize, objectFit: 'contain' };

  const getToggleBtnStyle = () => ({
    position: "fixed",
    left: isMobile ? "12px" : "24px",
    bottom: isMobile ? "20px" : "30px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "50px",
    width: isMobile ? "48px" : "60px",
    height: isMobile ? "48px" : "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 1001,
    transition: "all 0.2s ease",
    border: "1px solid rgba(255,255,255,0.2)",
    overflow: "hidden",
  });

  const getChatWindowStyle = () => ({
    position: "fixed",
    left: isMobile ? "12px" : "24px",
    bottom: isMobile ? "80px" : "100px",
    width: isMobile ? "calc(100vw - 24px)" : "420px",
    maxWidth: "calc(100vw - 24px)",
    height: isMobile ? "65vh" : "620px",
    maxHeight: isMobile ? "70vh" : "80vh",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 20px 35px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    border: "1px solid #e2e8f0",
  });

  // Handle opening chat (hides the initial popup)
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowInitialPopup(false);
    if (messages.length === 0) clearChat();
  };

  // Updated toggle button JSX with initial popup
  if (!isOpen) {
    return (
      <div className="chatbot-toggle-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
        {/* Initial popup bubble */}
        {showInitialPopup && (
          <div className="initial-popup">
            👋 Hi! I'm KALYANI. Need help?
            <div className="initial-popup-arrow"></div>
          </div>
        )}
        <button 
          className="chatbot-toggle-btn highlight-toggle" 
          onClick={handleOpenChat} 
          aria-label="Open chat"
          style={{
            ...getToggleBtnStyle(),
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            boxShadow: "0 8px 20px rgba(220, 38, 38, 0.4)",
            animation: "pulseGlow 1.5s infinite",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <img 
            src={nurseAvatar} 
            alt="Chat" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              animation: "iconPulse 1.5s infinite",
            }} 
          />
        </button>
        <div className="chatbot-tooltip">
          💬 Chat with KALYANI
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="chatbot-window" style={getChatWindowStyle()}>
        {/* Header - Fully Responsive */}
        <div style={{ 
          background: "#2563eb", 
          color: "white", 
          padding: isMobile ? "8px 12px" : "14px 18px", 
          fontWeight: 600, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          gap: "8px", 
          fontSize: isMobile ? "0.85rem" : "1rem",
          flexWrap: "nowrap",
          minWidth: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0, flexShrink: 1 }}>
            <img src={nurseAvatar} alt="Nurse" style={{ width: isMobile ? "28px" : "36px", height: isMobile ? "28px" : "36px", borderRadius: "50%", objectFit: "cover", border: "1px solid white", flexShrink: 0 }} />
            <span style={{ whiteSpace: isExtraSmall ? "nowrap" : "normal", overflow: "hidden", textOverflow: "ellipsis", fontSize: isExtraSmall ? "0.75rem" : "inherit" }}>
              {isExtraSmall ? "AI. KALYANI" : "Hello I'm AI. KALYANI"}
            </span>
          </div>
          <div style={{ display: "flex", gap: isExtraSmall ? "4px" : "10px", alignItems: "center", flexShrink: 0 }}>
            <button 
              onClick={clearChat} 
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                border: "none", 
                borderRadius: "20px", 
                padding: isExtraSmall ? "4px 6px" : (isMobile ? "4px 8px" : "6px 12px"), 
                fontSize: isExtraSmall ? "0.65rem" : (isMobile ? "0.7rem" : "0.8rem"), 
                cursor: "pointer", 
                color: "white", 
                display: "flex", 
                alignItems: "center", 
                gap: "4px",
                whiteSpace: "nowrap",
              }}
              aria-label="Clear chat"
            >
              <img src={clearChatIcon} alt="Clear" style={smallIconStyle} />
              {!isExtraSmall && <span>Clear</span>}
            </button>
            <button 
              onClick={resetToMainMenu} 
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                border: "none", 
                borderRadius: "20px", 
                padding: isExtraSmall ? "4px 6px" : (isMobile ? "4px 8px" : "6px 12px"), 
                fontSize: isExtraSmall ? "0.65rem" : (isMobile ? "0.7rem" : "0.8rem"), 
                cursor: "pointer", 
                color: "white", 
                display: "flex", 
                alignItems: "center", 
                gap: "4px",
                whiteSpace: "nowrap",
              }}
              aria-label="Main menu"
            >
              <img src={mainMenuIcon} alt="Menu" style={smallIconStyle} />
              {!isExtraSmall && <span>Menu</span>}
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ 
                background: "none", 
                border: "none", 
                color: "white", 
                cursor: "pointer", 
                lineHeight: 1, 
                padding: isExtraSmall ? "4px" : "6px", 
                display: "flex", 
                alignItems: "center",
                borderRadius: "20px",
              }}
              aria-label="Close chat"
            >
              <img src={closeChatIcon} alt="Close" style={{ width: isExtraSmall ? 16 : (isMobile ? 18 : 22), height: isExtraSmall ? 16 : (isMobile ? 18 : 22), filter: "brightness(0) invert(1)" }} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "12px" : "18px", display: "flex", flexDirection: "column", gap: "12px", background: "#f9fafb" }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: isMobile ? "85%" : "75%", padding: isMobile ? "8px 12px" : "10px 16px", borderRadius: "18px", backgroundColor: msg.sender === "user" ? "#2563eb" : "#e5e7eb", color: msg.sender === "user" ? "white" : "#1f2937", fontSize: isMobile ? "0.8rem" : "0.9rem", lineHeight: "1.5", wordBreak: "break-word", whiteSpace: "pre-wrap", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", textAlign: msg.sender === "bot" ? "justify" : "left" }}>
                {msg.sender === "bot" && msg.isHtml ? <div dangerouslySetInnerHTML={{ __html: msg.text }} /> : msg.text}
                {msg.sender === "bot" && !msg.isHtml && msg.text === "" && isBotTyping && <span><span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span></span>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick reply buttons */}
        {quickReplyButtons.length > 0 && (
          <div style={{ padding: isMobile ? "10px 12px" : "14px 18px", background: "white", borderTop: "1px solid #eef2f6", borderBottom: "1px solid #eef2f6" }}>
            <div style={{ maxHeight: isMobile ? "180px" : "220px", overflowY: "auto", marginBottom: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "8px" : "12px" }}>
                {quickReplyButtons.map((btn, idx) => (
                  <button key={idx} onClick={btn.action} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #e0d6f5", borderRadius: "14px", padding: isMobile ? "8px 10px" : "10px 14px", fontSize: isMobile ? "0.75rem" : "0.85rem", color: "#3d1d8c", fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", marginTop: "4px" }}>
              <button onClick={handleBackToTimingOptions} style={{ background: "#f0f0f0", border: "none", borderRadius: "20px", padding: "6px 12px", fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", color: "#333", flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <img src={doctorsTimingIcon} alt="Timing" style={iconStyle} />
                ← Timing Options
              </button>
              <button onClick={goBackToMainMenu} style={{ background: "#f0f0f0", border: "none", borderRadius: "20px", padding: "6px 12px", fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", color: "#333", flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <img src={mainMenuIcon} alt="Menu" style={iconStyle} />
                Main Menu
              </button>
            </div>
          </div>
        )}

        {/* Doctor Timing Menu */}
        {showDoctorTimingMenu && quickReplyButtons.length === 0 && (
          <div style={{ padding: isMobile ? "10px 12px" : "14px 18px", background: "white", borderTop: "1px solid #eef2f6" }}>
            <div style={{ fontSize: isMobile ? "0.65rem" : "0.75rem", color: "#6c757d", marginBottom: "8px", fontWeight: 500 }}>SELECT TIMING OPTION</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "8px" : "12px" }}>
              <button onClick={handleFindByDept} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #e0d6f5", borderRadius: "14px", padding: isMobile ? "8px 10px" : "10px 14px", fontSize: isMobile ? "0.75rem" : "0.85rem", color: "#3d1d8c", fontWeight: 600, cursor: "pointer" }}>
                <img src={hospitalIcon} alt="Dept" style={iconStyle} />
                Find by Department
              </button>
              <button onClick={handleFindByDoctorName} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #e0d6f5", borderRadius: "14px", padding: isMobile ? "8px 10px" : "10px 14px", fontSize: isMobile ? "0.75rem" : "0.85rem", color: "#3d1d8c", fontWeight: 600, cursor: "pointer" }}>
                <img src={doctorNameIcon} alt="Doctor" style={iconStyle} />
                Find by Doctor Name
              </button>
            </div>
          </div>
        )}

        {/* Quick Help Menu */}
        {showQuickHelp && !showDoctorTimingMenu && quickReplyButtons.length === 0 && (
          <div style={{ padding: isMobile ? "10px 12px" : "14px 18px", background: "white", borderTop: "1px solid #eef2f6" }}>
            <div style={{ fontSize: isMobile ? "0.65rem" : "0.75rem", color: "#6c757d", marginBottom: "8px", fontWeight: 500 }}>QUICK HELP</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "8px" : "12px" }}>
              {menuItems.map((item, i) => (
                <button key={i} onClick={() => handleMenuItemClick(item.label)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #e0d6f5", borderRadius: "14px", padding: isMobile ? "8px 10px" : "10px 14px", fontSize: isMobile ? "0.75rem" : "0.85rem", color: "#3d1d8c", fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                  <img src={item.iconImage} alt={item.label} style={iconStyle} />
                  {item.label}
                </button>
              ))}
              <button onClick={handleDoctorsTiming} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #e0d6f5", borderRadius: "14px", padding: isMobile ? "8px 10px" : "10px 14px", fontSize: isMobile ? "0.75rem" : "0.85rem", color: "#3d1d8c", fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                <img src={doctorsTimingIcon} alt="Doctors Timing" style={iconStyle} />
                Doctors Timing
              </button>
            </div>
          </div>
        )}

        {/* Post‑message Call Us / Menu options */}
        {showPostMessageOptions && !showDoctorTimingMenu && quickReplyButtons.length === 0 && !showQuickHelp && (
          <div style={{ padding: "10px 12px", background: "white", borderTop: "1px solid #eef2f6", display: "flex", gap: "10px" }}>
            <button onClick={handleCallUs} style={{ flex: 1, background: "#f0f4ff", border: "none", borderRadius: "24px", padding: "8px 12px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", fontSize: isMobile ? "0.8rem" : "0.85rem" }}>
              📞 Call Us
            </button>
            <button onClick={handleShowMenuOptions} style={{ flex: 1, background: "#f0f4ff", border: "none", borderRadius: "24px", padding: "8px 12px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", fontSize: isMobile ? "0.8rem" : "0.85rem" }}>
              ☰ Menu
            </button>
          </div>
        )}

        {/* Input area */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: isMobile ? "10px 12px" : "14px 18px", borderTop: "1px solid #e2e8f0", background: "white" }}>
          <input 
            type="text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} 
            placeholder="Type your message..." 
            style={{ flex: 1, border: "1.5px solid #e0d6f5", borderRadius: "24px", padding: isMobile ? "8px 14px" : "10px 18px", fontSize: isMobile ? "0.8rem" : "0.9rem", outline: "none", minWidth: 0 }} 
          />
          <button onClick={handleSendMessage} style={{ background: "#5a28b8", border: "none", borderRadius: "40px", padding: isMobile ? "6px 14px" : "8px 20px", color: "white", cursor: "pointer", fontWeight: 500, fontSize: isMobile ? "0.75rem" : "0.85rem", whiteSpace: "nowrap" }}>Send</button>
        </div>
      </div>

      <style>{`
        .typing-dot { animation: blink 1.2s infinite; font-size: 1.1rem; margin: 0 -2px; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%, 60%, 100% { opacity: 0; } 30% { opacity: 1; } }
        .important-highlight { background-color: #fef08a; padding: 0 2px; border-radius: 4px; font-weight: 500; color: #1e293b; }
        .tpa-ordered-list { margin: 8px 0 8px 20px; padding-left: 0; list-style-type: decimal; }
        .tpa-ordered-list li { margin: 4px 0; line-height: 1.4; }
        .chatbot-window ::-webkit-scrollbar { width: 4px; }
        .chatbot-window ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .chatbot-window ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 10px; }
        .chatbot-window ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
        
        /* Extra small screen adjustments */
        @media (max-width: 480px) {
          .chatbot-window button {
            font-size: 0.7rem !important;
          }
        }

        /* Toggle button wrapper for tooltip */
        .chatbot-toggle-wrapper {
          position: fixed;
          left: 24px;
          bottom: 30px;
          z-index: 1001;
        }
        @media (max-width: 640px) {
          .chatbot-toggle-wrapper {
            left: 16px;
            bottom: 20px;
          }
        }

        /* Tooltip bubble (hover) */
        .chatbot-tooltip {
          visibility: hidden;
          opacity: 0;
          background-color: #1f2937;
          color: white;
          text-align: center;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          position: absolute;
          bottom: 70px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 1002;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          backdrop-filter: blur(4px);
          background: rgba(31, 41, 55, 0.95);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .chatbot-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -6px;
          border-width: 6px;
          border-style: solid;
          border-color: rgba(31, 41, 55, 0.95) transparent transparent transparent;
        }
        .chatbot-toggle-wrapper:hover .chatbot-tooltip {
          visibility: visible;
          opacity: 1;
          bottom: 80px;
        }

        /* Initial popup (appears on load) */
        .initial-popup {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: #1f2937;
          color: white;
          padding: 10px 18px;
          border-radius: 24px;
          font-size: 0.9rem;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 6px 14px rgba(0,0,0,0.2);
          backdrop-filter: blur(4px);
          background: rgba(31, 41, 55, 0.95);
          border: 1px solid rgba(255,255,255,0.25);
          z-index: 1003;
          animation: fadeInUp 0.4s ease-out, fadeOut 0.5s ease-in 4.5s forwards;
          pointer-events: none;
        }
        .initial-popup-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -8px;
          border-width: 8px;
          border-style: solid;
          border-color: rgba(31, 41, 55, 0.95) transparent transparent transparent;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        /* Pulse animations for highlight */
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(220, 38, 38, 0.3);
            transform: scale(1.02);
          }
          100% {
            box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
            transform: scale(1);
          }
        }
        @keyframes iconPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        /* Responsive tooltip & popup on small screens */
        @media (max-width: 640px) {
          .chatbot-tooltip {
            font-size: 0.7rem;
            padding: 6px 10px;
            white-space: nowrap;
            bottom: 60px;
          }
          .chatbot-toggle-wrapper:hover .chatbot-tooltip {
            bottom: 68px;
          }
          .initial-popup {
            font-size: 0.75rem;
            padding: 6px 12px;
            white-space: nowrap;
            bottom: 70px;
          }
        }
        @media (max-width: 480px) {
          .chatbot-tooltip {
            white-space: normal;
            width: 140px;
            text-align: center;
            font-size: 0.65rem;
            left: 50%;
            transform: translateX(-50%);
          }
          .chatbot-tooltip::after {
            left: 50%;
          }
          .initial-popup {
            white-space: normal;
            width: 160px;
            text-align: center;
            font-size: 0.7rem;
            padding: 8px 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;