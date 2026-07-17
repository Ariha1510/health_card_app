import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    dashboard: "Dashboard",
    generateCard: "Generate New Card",
    scanCard: "Scan Patient Card",
    simulateOffline: "Simulate Offline",
    online: "Online",
    offline: "Offline",
    patientName: "Patient Name",
    dob: "Date of Birth",
    bloodGroup: "Blood Group",
    gender: "Gender",
    submit: "Compile & Encrypt Health Card",
    capturePhoto: "Capture Photo",
    retakePhoto: "Retake Photo",
    vaccinations: "Vaccinations",
    medicalHistory: "Detailed Medical History",
    surgeries: "Surgeries",
    allergies: "Allergies",
    medications: "Medications",
    devices: "Medical Devices",
    timeline: "Interactive Health Timeline",
    notes: "Doctor Consultation Notes"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    generateCard: "नया कार्ड बनाएं",
    scanCard: "रोगी कार्ड स्कैन करें",
    simulateOffline: "ऑफ़लाइन अनुकरण करें",
    online: "ऑनलाइन",
    offline: "ऑफ़लाइन",
    patientName: "रोगी का नाम",
    dob: "जन्म की तारीख",
    bloodGroup: "रक्त समूह",
    gender: "लिंग",
    submit: "स्वास्थ्य कार्ड संकलित और एन्क्रिप्ट करें",
    capturePhoto: "फोटो लें",
    retakePhoto: "फिर से फोटो लें",
    vaccinations: "टीकाकरण",
    medicalHistory: "विस्तृत चिकित्सा इतिहास",
    surgeries: "सर्जरी",
    allergies: "एलर्जी",
    medications: "दवाएं",
    devices: "चिकित्सा उपकरण",
    timeline: "इंटरएक्टिव स्वास्थ्य समयरेखा",
    notes: "डॉक्टर परामर्श नोट्स"
  },
  bn: { dashboard: "ড্যাশবোর্ড", generateCard: "নতুন কার্ড তৈরি করুন", scanCard: "রোগী কার্ড স্ক্যান করুন", online: "অনলাইন", offline: "অফলাইন", submit: "কম্পাইল এবং এনক্রিপ্ট করুন" },
  ta: { dashboard: "டாஷ்போர்டு", generateCard: "புதிய அட்டை உருவாக்கவும்", scanCard: "நோயாளி அட்டையை ஸ்கேன் செய்க", online: "ஆன்லைன்", offline: "ஆஃப்லைன்", submit: "தொகுத்து குறியாக்கம் செய்" },
  te: { dashboard: "డ్యాష్‌బోర్డ్", generateCard: "కొత్త కార్డ్ సృష్టించండి", scanCard: "రోగి కార్డ్ స్కాన్ చేయండి", online: "ఆన్‌లైన్", offline: "ఆఫ్‌లైన్", submit: "కంపైల్ మరియు ఎన్‌క్రిప్ట్ చేయండి" },
  mr: { dashboard: "डॅशबोर्ड", generateCard: "नवीन कार्ड तयार करा", scanCard: "रुग्ण कार्ड स्कॅन करा", online: "ऑनलाइन", offline: "ऑफलाइन", submit: "संकलित आणि एनक्रिप्ट करा" }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
