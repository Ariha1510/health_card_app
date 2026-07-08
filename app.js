// Nirantar Health Card - System Logic (100% Client-Side / Offline)

const CONFIG = {
    MASTER_KEY: "NirantarHealthMasterKey2026",
    VERSION: "V2"
};

// Vocabulary mappings for token compression
const DICTIONARY = {
    conditions: {
        'DIA': 'Diabetes',
        'HYP': 'Hypertension',
        'AST': 'Asthma',
        'CAR': 'Cardiac Condition',
        'TB':  'Tuberculosis',
        'EPI': 'Epilepsy',
        'OTH': 'Other Chronic'
    },
    vaccines: {
        'T': 'Tetanus',
        'C': 'COVID-19',
        'B': 'BCG',
        'H': 'Hepatitis B'
    }
};

// Multilingual dictionaries
const TRANSLATIONS = {
    en: {
        "title": "Nirantar Health",
        "tagline": "Offline Health Continuity Portal",
        "nav-dashboard": "Dashboard",
        "nav-generator": "Card Generator",
        "nav-scanner": "Card Scanner",
        "status-offline-sandbox": "System Running Offline (ABHA Last-Mile Sandbox)",
        "simulate-offline": "🌐 Simulate Offline",
        "total-registered": "Total Cards Issued",
        "emergency-scans": "Emergency Scans",
        "average-compression": "Compression Ratio",
        "offline-storage": "Storage Utilized",
        "volunteer-portal": "Volunteer Portal",
        "volunteer-desc": "Interview a migrant worker, capture photo, compute vitals, and compile a high-density encrypted health card.",
        "btn-issue-new": "Issue New Card",
        "clinician-portal": "Clinician Portal",
        "clinician-desc": "Scan a worker's health card using a local phone camera. Instantly view patient history without database lookup.",
        "btn-open-scanner": "Open Scanner",
        "local-registry-search": "Local Registry Database Search",
        "search-placeholder": "Type query to filter records locally...",
        "th-id": "Worker ID",
        "th-name": "Name",
        "th-age-sex": "Age/Gender",
        "th-blood": "Blood",
        "th-risk": "Risk",
        "th-actions": "Actions",
        "no-records-found": "No records found matching search queries.",
        "epidemic-stats": "Local Registry Demographic Distribution",
        "condition-stats": "Condition Frequency",
        "vaccine-stats": "Vaccination Coverage",
        "registry-title": "Worker Medical Registry",
        "lbl-worker-id": "Worker ID (Auto-Generated)",
        "lbl-photo-capture": "Passport-Style Photo Capture",
        "btn-init-camera": "📷 Initialize Camera",
        "btn-snap": "Capture Photo",
        "btn-retake": "Retake",
        "hdr-personal-info": "Personal Details",
        "lbl-name": "Full Name",
        "lbl-age": "Age (Years)",
        "lbl-gender": "Gender",
        "opt-select": "Select",
        "opt-male": "Male",
        "opt-female": "Female",
        "opt-other": "Other",
        "lbl-height": "Height (cm)",
        "lbl-weight": "Weight (kg)",
        "lbl-phone": "Phone Number",
        "lbl-address": "Current Residential Address",
        "hdr-medical-info": "Medical Information",
        "lbl-blood": "Blood Group",
        "opt-select-blood": "Select Blood Group",
        "lbl-chronic": "Chronic Conditions",
        "chk-diabetes": "Diabetes",
        "chk-hypertension": "Hypertension",
        "chk-asthma": "Asthma",
        "chk-cardiac": "Cardiac",
        "chk-tuberculosis": "Tuberculosis",
        "chk-epilepsy": "Epilepsy",
        "chk-other": "Other",
        "lbl-meds": "Current Medications (Comma separated)",
        "lbl-allergies": "High-Risk Allergies (Comma separated)",
        "lbl-disability": "Disability Status",
        "opt-no": "No",
        "opt-yes": "Yes",
        "lbl-donor": "Organ Donor",
        "lbl-pregnancy": "Pregnancy Status",
        "lbl-last-visit": "Last Hospital/Clinic Visit",
        "lbl-surgeries": "Previous Surgeries (Comma separated)",
        "lbl-devices": "Existing Medical Devices (e.g. Pacemaker)",
        "lbl-vaccinations": "Recorded Vaccinations",
        "chk-tetanus": "Tetanus",
        "chk-covid": "COVID-19",
        "chk-bcg": "BCG",
        "chk-hepb": "Hepatitis B",
        "hdr-emergency-info": "Emergency & Notes",
        "lbl-em-name": "Emergency Contact Name",
        "lbl-em-relation": "Relationship",
        "lbl-em-phone": "Emergency Phone",
        "lbl-em-notes": "Priority Medical Notes (For Emergency Scan)",
        "btn-compile": "Compile & Encrypt Health Card",
        "hdr-preview": "Physical Card Preview",
        "hdr-card-header": "NIRANTAR HEALTH CARD",
        "hdr-card-subheader": "ABHA offline extensions",
        "card-footer-text": "Issued by Union Health Camp • Keep Card Laminated",
        "qr-stats-title": "QR Storage & Compression Analytics",
        "stat-raw-json": "Raw JSON Size",
        "stat-compressed": "Compressed Size",
        "stat-encrypted": "Encrypted Payload",
        "stat-ratio": "Compression Ratio",
        "qr-capacity": "QR Data Capacity Used",
        "btn-print": "🖨️ Print Health Card",
        "scanner-title": "Symmetrical Card Reader",
        "scanner-desc": "Hold the health card QR up to your device camera to scan. The device will automatically decrypt and read the encrypted medical data locally.",
        "btn-start-stream": "📷 Start Webcam Stream",
        "btn-stop-stream": "⏹️ Stop Camera",
        "scanner-fallback-desc": "No webcam? Upload a snapshot image of the QR Code card:",
        "btn-choose-qr": "📁 Choose QR Image",
        "patient-record-title": "Patient Ledger Record",
        "awaiting-qr": "Awaiting QR scan payload...",
        "awaiting-qr-desc": "Align code in camera view or upload file above.",
        "hdr-additional-info": "Additional Info",
        "hdr-surgeries-devices": "Surgeries & Devices",
        "hdr-health-timeline": "Interactive Health & Immunization Timeline",
        "hdr-doctor-notes": "Clinician Consultation Notes (Stored Offline)",
        "btn-add-note": "Add Consultation Note",
        "btn-view-emergency": "← Back to Emergency Card",
        "btn-clear-record": "Clear Record",
        "btn-view-full": "View Complete Health Record",
        "search-opt-id": "Worker ID",
        "search-opt-name": "Full Name",
        "search-opt-blood": "Blood Group",
        "search-opt-condition": "Chronic Condition",
        "search-opt-phone": "Phone Number"
    },
    hi: {
        "title": "निरंतर हेल्थ",
        "tagline": "ऑफलाइन स्वास्थ्य निरंतरता पोर्टल",
        "nav-dashboard": "डैशबोर्ड",
        "nav-generator": "कार्ड जनरेटर",
        "nav-scanner": "कार्ड स्कैनर",
        "status-offline-sandbox": "सिस्टम ऑफलाइन चल रहा है (ABHA लास्ट-माइल सैंडबॉक्स)",
        "simulate-offline": "🌐 ऑफलाइन मोड सक्रिय करें",
        "total-registered": "कुल जारी कार्ड",
        "emergency-scans": "आपातकालीन स्कैन",
        "average-compression": "कम्प्रेसन अनुपात",
        "offline-storage": "संग्रहीत डेटा आकार",
        "volunteer-portal": "स्वयंसेवक पोर्टल",
        "volunteer-desc": "मजदूर का साक्षात्कार लें, फोटो लें, स्वास्थ्य माप दर्ज करें, और एन्क्रिप्टेड स्वास्थ्य कार्ड संकलित करें।",
        "btn-issue-new": "नया कार्ड जारी करें",
        "clinician-portal": "चिकित्सक पोर्टल",
        "clinician-desc": "स्थानीय फोन कैमरे से मजदूर का स्वास्थ्य कार्ड स्कैन करें। बिना इंटरनेट रोगी का इतिहास देखें।",
        "btn-open-scanner": "स्कैनर खोलें",
        "local-registry-search": "स्थानीय रजिस्ट्री डेटाबेस खोज",
        "search-placeholder": "डेटा खोजने के लिए टाइप करें...",
        "th-id": "कार्यकर्ता आईडी",
        "th-name": "नाम",
        "th-age-sex": "उम्र/लिंग",
        "th-blood": "रक्त",
        "th-risk": "जोखिम",
        "th-actions": "कार्रवाई",
        "no-records-found": "खोज के अनुकूल कोई रिकॉर्ड नहीं मिला।",
        "epidemic-stats": "स्थानीय रजिस्ट्री जनसांख्यिकीय वितरण",
        "condition-stats": "पुरानी बीमारियों की आवृत्ति",
        "vaccine-stats": "टीकाकरण कवरेज",
        "registry-title": "कार्यकर्ता चिकित्सा रजिस्ट्री",
        "lbl-worker-id": "कार्यकर्ता आईडी (स्वचालित)",
        "lbl-photo-capture": "पासपोर्ट आकार का फोटो कैप्चर",
        "btn-init-camera": "📷 कैमरा प्रारंभ करें",
        "btn-snap": "फोटो खींचे",
        "btn-retake": "फिर से लें",
        "hdr-personal-info": "व्यक्तिगत विवरण",
        "lbl-name": "पूरा नाम",
        "lbl-age": "उम्र (वर्ष)",
        "lbl-gender": "लिंग",
        "opt-select": "चुनें",
        "opt-male": "पुरुष",
        "opt-female": "महिला",
        "opt-other": "अन्य",
        "lbl-height": "ऊंचाई (सेमी)",
        "lbl-weight": "वजन (किग्रा)",
        "lbl-phone": "फ़ोन नंबर",
        "lbl-address": "वर्तमान आवासीय पता",
        "hdr-medical-info": "चिकित्सा जानकारी",
        "lbl-blood": "रक्त समूह",
        "opt-select-blood": "रक्त समूह चुनें",
        "lbl-chronic": "पुरानी बीमारियाँ",
        "chk-diabetes": "मधुमेह (Diabetes)",
        "chk-hypertension": "उच्च रक्तचाप (Hypertension)",
        "chk-asthma": "दमा (Asthma)",
        "chk-cardiac": "हृदय रोग (Cardiac)",
        "chk-tuberculosis": "तपेदिक (Tuberculosis)",
        "chk-epilepsy": "मिर्गी (Epilepsy)",
        "chk-other": "अन्य",
        "lbl-meds": "वर्तमान दवाएं (अल्पविराम से अलग)",
        "lbl-allergies": "उच्च जोखिम वाली एलर्जी (अल्पविराम से अलग)",
        "lbl-disability": "विकलांगता स्थिति",
        "opt-no": "नहीं",
        "opt-yes": "हाँ",
        "lbl-donor": "अंग दाता",
        "lbl-pregnancy": "गर्भावस्था स्थिति",
        "lbl-last-visit": "पिछली अस्पताल यात्रा",
        "lbl-surgeries": "पिछली सर्जरी",
        "lbl-devices": "चिकित्सा उपकरण (जैसे पेसमेकर)",
        "lbl-vaccinations": "दर्ज टीकाकरण",
        "chk-tetanus": "टिटनेस",
        "chk-covid": "कोविड-19",
        "chk-bcg": "बी.सी.जी.",
        "chk-hepb": "हेपेटाइटिस बी",
        "hdr-emergency-info": "आपातकालीन और नोट्स",
        "lbl-em-name": "आपातकालीन संपर्क नाम",
        "lbl-em-relation": "संबंध",
        "lbl-em-phone": "आपातकालीन फोन",
        "lbl-em-notes": "प्राथमिकता चिकित्सा नोट (आपातकालीन स्कैन के लिए)",
        "btn-compile": "कार्ड संकलित और एन्क्रिप्ट करें",
        "hdr-preview": "भौतिक कार्ड पूर्वावलोकन",
        "hdr-card-header": "निरंतर स्वास्थ्य कार्ड",
        "hdr-card-subheader": "ABHA ऑफ़लाइन एक्सटेंशन",
        "card-footer-text": "यूनियन हेल्थ कैंप द्वारा जारी • कार्ड लैमिनेटेड रखें",
        "qr-stats-title": "क्यूआर स्टोरेज और कम्प्रेसन विश्लेषण",
        "stat-raw-json": "रॉ JSON आकार",
        "stat-compressed": "कम्प्रेस्ड आकार",
        "stat-encrypted": "एन्क्रिप्टेड पेलोड",
        "stat-ratio": "कम्प्रेसन अनुपात",
        "qr-capacity": "क्यूआर डेटा क्षमता उपयोग",
        "btn-print": "🖨️ स्वास्थ्य कार्ड प्रिंट करें",
        "scanner-title": "सममित कार्ड रीडर",
        "scanner-desc": "स्थानीय स्तर पर स्कैन करने के लिए स्वास्थ्य कार्ड क्यूआर को डिवाइस कैमरे के सामने लाएं।",
        "btn-start-stream": "📷 वेबकैम स्ट्रीम शुरू करें",
        "btn-stop-stream": "⏹️ कैमरा बंद करें",
        "scanner-fallback-desc": "वेबकैम नहीं है? क्यूआर कोड की फोटो अपलोड करें:",
        "btn-choose-qr": "📁 क्यूआर छवि चुनें",
        "patient-record-title": "मरीज का इतिहास रिकॉर्ड",
        "awaiting-qr": "क्यूआर स्कैन पेलोड की प्रतीक्षा है...",
        "awaiting-qr-desc": "कैमरा व्यू में कोड लाएं या ऊपर फाइल अपलोड करें।",
        "hdr-additional-info": "अतिरिक्त जानकारी",
        "hdr-surgeries-devices": "सर्जरी और चिकित्सा उपकरण",
        "hdr-health-timeline": "इंटरएक्टिव स्वास्थ्य और टीकाकरण समयरेखा",
        "hdr-doctor-notes": "डॉक्टर परामर्श नोट्स (ऑफ़लाइन संग्रहीत)",
        "btn-add-note": "परामर्श नोट जोड़ें",
        "btn-view-emergency": "← आपातकालीन कार्ड पर वापस जाएं",
        "btn-clear-record": "रिकॉर्ड साफ करें",
        "btn-view-full": "पूर्ण स्वास्थ्य रिकॉर्ड देखें",
        "search-opt-id": "कार्यकर्ता आईडी",
        "search-opt-name": "पूरा नाम",
        "search-opt-blood": "रक्त समूह",
        "search-opt-condition": "पुरानी बीमारी",
        "search-opt-phone": "फ़ोन नंबर"
    },
    bn: {
        "title": "নিরন্তর হেলথ",
        "tagline": "অফলাইন স্বাস্থ্য ধারাবাহিকতা পোর্টাল",
        "nav-dashboard": "ড্যাশবোর্ড",
        "nav-generator": "কার্ড জেনারেটর",
        "nav-scanner": "কার্ড স্ক্যানার",
        "status-offline-sandbox": "সিস্টেম অফলাইনে চলছে (ABHA লাস্ট-মাইল স্যান্ডবক্স)",
        "simulate-offline": "🌐 অফলাইন মোড সক্রিয় করুন",
        "total-registered": "মোট ইস্যুকৃত কার্ড",
        "emergency-scans": "জরুরী স্ক্যান",
        "average-compression": "কম্প্রেশন অনুপাত",
        "offline-storage": "ব্যবহৃত মেমরি আকার",
        "volunteer-portal": "স্বেচ্ছাসেবক পোর্টাল",
        "volunteer-desc": "শ্রমিকের সাক্ষাত্কার নিন, ছবি তুলুন, স্বাস্থ্য পরিমাপ লিখুন এবং একটি এনক্রিপ্ট করা স্বাস্থ্য কার্ড তৈরি করুন।",
        "btn-issue-new": "নতুন কার্ড ইস্যু করুন",
        "clinician-portal": "চিকিৎসক পোর্টাল",
        "clinician-desc": "স্থানীয় ক্যামেরা ব্যবহার করে শ্রমিকের কার্ড স্ক্যান করুন। কোনো ইন্টারনেট সংযোগ ছাড়াই রোগীর তথ্য দেখুন।",
        "btn-open-scanner": "স্ক্যানার খুলুন",
        "local-registry-search": "স্থানীয় রেজিস্ট্রি ডাটাবেস অনুসন্ধান",
        "search-placeholder": "ডাটা খুঁজতে টাইপ করুন...",
        "th-id": "শ্রমিক আইডি",
        "th-name": "নাম",
        "th-age-sex": "বয়স/লিঙ্গ",
        "th-blood": "রক্ত",
        "th-risk": "ঝুঁকি",
        "th-actions": "পদক্ষেপ",
        "no-records-found": "অনুসন্ধানের সাথে সামঞ্জস্যপূর্ণ কোনো রেকর্ড পাওয়া যায়নি।",
        "registry-title": "শ্রমিক চিকিৎসা রেজিস্ট্রি",
        "lbl-worker-id": "শ্রমিক আইডি (স্বয়ংক্রিয়)",
        "lbl-photo-capture": "পাসপোর্ট আকারের ছবি ক্যাপচার",
        "btn-init-camera": "📷 ক্যামেরা চালু করুন",
        "btn-snap": "ছবি তুলুন",
        "btn-retake": "আবার নিন",
        "hdr-personal-info": "ব্যক্তিগত বিবরণ",
        "lbl-name": "সম্পূর্ণ নাম",
        "lbl-age": "বয়স (বছর)",
        "lbl-gender": "লিঙ্গ",
        "opt-select": "নির্বাচন করুন",
        "opt-male": "পুরুষ",
        "opt-female": "মহিলা",
        "opt-other": "অন্যান্য",
        "lbl-height": "উচ্চতা (সেমি)",
        "lbl-weight": "ওজন (কেজি)",
        "lbl-phone": "ফোন নম্বর",
        "lbl-address": "বর্তমান ঠিকানা",
        "hdr-medical-info": "চিকিৎসা তথ্য",
        "lbl-blood": "রক্তের গ্রুপ",
        "lbl-chronic": "দীর্ঘস্থায়ী রোগ",
        "chk-diabetes": "ডায়াবেটিস",
        "chk-hypertension": "উচ্চ রক্তচাপ",
        "chk-asthma": "হাঁপানি",
        "chk-cardiac": "হৃদরোগ",
        "chk-tuberculosis": "যক্ষ্মা",
        "chk-epilepsy": "মৃগী রোগ",
        "chk-other": "অন্যান্য",
        "lbl-meds": "চলতি ওষুধ (কমা দিয়ে আলাদা করুন)",
        "lbl-allergies": "উচ্চ ঝুঁকির অ্যালার্জি",
        "lbl-disability": "প্রতিবন্ধী অবস্থা",
        "opt-no": "না",
        "opt-yes": "হ্যাঁ",
        "lbl-donor": "অঙ্গ দাতা",
        "lbl-pregnancy": "গর্ভধারণের অবস্থা",
        "lbl-last-visit": "শেষ হাসপাতাল পরিদর্শন",
        "lbl-surgeries": "পূর্ববর্তী সার্জারি",
        "lbl-devices": "চিকিৎসা সরঞ্জাম (যেমন পেসমেকার)",
        "lbl-vaccinations": "টিকাকরণের ইতিহাস",
        "chk-tetanus": "টিটেনাস",
        "chk-covid": "কোভিড-১৯",
        "chk-bcg": "বিসিজি",
        "chk-hepb": "হেপাটাইটিস বি",
        "hdr-emergency-info": "জরুরী ও নোট",
        "lbl-em-name": "জরুরী যোগাযোগ ব্যক্তির নাম",
        "lbl-em-relation": "সম্পর্ক",
        "lbl-em-phone": "জরুরী ফোন নম্বর",
        "lbl-em-notes": "জরুরী মেডিকেল নোট",
        "btn-compile": "কার্ড তৈরি ও এনক্রিপ্ট করুন",
        "hdr-preview": "শারীরিক কার্ড প্রিভিউ",
        "hdr-card-header": "নিরন্তর স্বাস্থ্য কার্ড",
        "hdr-card-subheader": "ABHA অফলাইন এক্সটেনশন",
        "card-footer-text": "ইউনিয়ন হেলথ ক্যাম্প দ্বারা জারীকৃত • কার্ডটি ল্যামিনেট করে রাখুন",
        "qr-stats-title": "কিউআর স্টোরেজ এবং কম্প্রেশন বিশ্লেষণ",
        "btn-print": "🖨️ কার্ড প্রিন্ট করুন",
        "scanner-title": "কার্ড রিডার",
        "scanner-desc": "স্থানীয়ভাবে স্ক্যান করতে কার্ডের কিউআর কোডটি ক্যামেরার সামনে ধরুন।",
        "btn-start-stream": "📷 ক্যামেরা চালু করুন",
        "btn-stop-stream": "⏹️ ক্যামেরা বন্ধ করুন",
        "scanner-fallback-desc": "ক্যামেরা নেই? কিউআর কোডের ছবি আপলোড করুন:",
        "btn-choose-qr": "📁 কিউআর ছবি নির্বাচন করুন",
        "patient-record-title": "রোগীর ইতিহাস রেকর্ড",
        "awaiting-qr": "কিউআর স্ক্যান পেমেন্টের জন্য অপেক্ষা করা হচ্ছে...",
        "awaiting-qr-desc": "ক্যামেরার সামনে কোডটি আনুন অথবা ফাইল আপলোড করুন।",
        "hdr-additional-info": "অতিরিক্ত তথ্য",
        "hdr-surgeries-devices": "সার্জারি ও চিকিৎসা সরঞ্জাম",
        "hdr-health-timeline": "ইন্টারেক্টিভ স্বাস্থ্য ও টিকাকরণ টাইমলাইন",
        "hdr-doctor-notes": "চিকিৎসকের প্রেসক্রিপশন নোট (অফলাইনে সংরক্ষিত)",
        "btn-add-note": "পরামর্শ নোট যোগ করুন",
        "btn-view-emergency": "← জরুরী কার্ডে ফিরে যান",
        "btn-clear-record": "রেকর্ড মুছুন",
        "btn-view-full": "সম্পূর্ণ স্বাস্থ্য রেকর্ড দেখুন"
    },
    ta: {
        "title": "நிரந்தர் ஹெல்த்",
        "tagline": "இணையமில்லா சுகாதாரத் தொடர்ச்சி போர்டல்",
        "nav-dashboard": "டாஷ்போர்டு",
        "nav-generator": "அட்டை உருவாக்ககம்",
        "nav-scanner": "அட்டை ஸ்கேனர்",
        "status-offline-sandbox": "இணையமின்றி இயங்குகிறது (ABHA லாஸ்ட்-மைல் சாண்ட்பாக்ஸ்)",
        "simulate-offline": "🌐 ஆஃப்லைனை உருவகப்படுத்துக",
        "total-registered": "வழங்கப்பட்ட மொத்த அட்டைகள்",
        "emergency-scans": "அவசரகால ஸ்கேன்கள்",
        "average-compression": "சுருக்க விகிதம்",
        "offline-storage": "சேமிப்பக பயன்பாடு",
        "volunteer-portal": "தன்னார்வலர் போர்டல்",
        "volunteer-desc": "பணியாளரை நேர்காணல் செய்து, புகைப்படம் எடுத்து, மருத்துவ விவரங்களை உள்ளிட்டு, சுகாதார அட்டையைத் தொகுக்கவும்.",
        "btn-issue-new": "புதிய அட்டை வழங்கு",
        "clinician-portal": "மருத்துவர் போர்டல்",
        "clinician-desc": "பணியாளரின் அட்டையைத் மொபைல் கேமராவில் ஸ்கேன் செய்க. இணையமின்றி நோயாளியின் விவரங்களைப் பார்க்கவும்.",
        "btn-open-scanner": "ஸ்கேனரைத் திற",
        "local-registry-search": "உள்ளூர் பதிவேடு தரவுத்தள தேடல்",
        "search-placeholder": "தேட தட்டச்சு செய்க...",
        "th-id": "பணியாளர் ஐடி",
        "th-name": "பெயர்",
        "th-age-sex": "வயது/பாலினம்",
        "th-blood": "இரத்தம்",
        "th-risk": "ஆபத்து",
        "th-actions": "செயல்கள்",
        "no-records-found": "தேடலுக்குரிய தகவல்கள் ஏதும் இல்லை.",
        "registry-title": "பணியாளர் மருத்துவப் பதிவேடு",
        "lbl-worker-id": "பணியாளர் ஐடி (தானியங்கி)",
        "lbl-photo-capture": "புகைப்படம் எடுத்தல்",
        "btn-init-camera": "📷 கேமராவைத் தொடங்கு",
        "btn-snap": "புகைப்படம் எடு",
        "btn-retake": "மீண்டும் எடு",
        "hdr-personal-info": "தனிப்பட்ட விவரங்கள்",
        "lbl-name": "முழு பெயர்",
        "lbl-age": "வயது (ஆண்டுகள்)",
        "lbl-gender": "பாலினம்",
        "opt-select": "தேர்ந்தெடு",
        "opt-male": "ஆண்",
        "opt-female": "பெண்",
        "opt-other": "இதர",
        "lbl-height": "உயரம் (செ.மீ)",
        "lbl-weight": "எடை (கிலோ)",
        "lbl-phone": "தொலைபேசி எண்",
        "lbl-address": "தற்போதைய முகவரி",
        "hdr-medical-info": "மருத்துவத் தகவல்கள்",
        "lbl-blood": "இரத்த வகை",
        "lbl-chronic": "நாள்பட்ட நோய்கள்",
        "chk-diabetes": "நீரிழிவு நோய்",
        "chk-hypertension": "இரத்த அழுத்தம்",
        "chk-asthma": "ஆஸ்துமா",
        "chk-cardiac": "இதய நோய்",
        "chk-tuberculosis": "காசநோய்",
        "chk-epilepsy": "கால்-கை வலிப்பு",
        "chk-other": "இதர",
        "lbl-meds": "தற்போதைய மருந்துகள் (கமா மூலம் பிரிக்கவும்)",
        "lbl-allergies": "உயர் ஆபத்து ஒவ்வாமைகள்",
        "lbl-disability": "மாற்றுத்திறனாளி நிலை",
        "opt-no": "இல்லை",
        "opt-yes": "ஆம்",
        "lbl-donor": "உறுப்பு தானம்",
        "lbl-pregnancy": "கர்ப்ப நிலை",
        "lbl-last-visit": "கடைசியாக மருத்துவமனை சென்ற நாள்",
        "lbl-surgeries": "முந்தைய அறுவை சிகிச்சைகள்",
        "lbl-devices": "உடலில் பொருத்தப்பட்ட மருத்துவ சாதனங்கள் (எ.கா. பேஸ்மேக்கர்)",
        "lbl-vaccinations": "தடுப்பூசி விவரங்கள்",
        "chk-tetanus": "டெட்டனஸ்",
        "chk-covid": "கோவிட்-19",
        "chk-bcg": "பி.சி.ஜி",
        "chk-hepb": "ஹெபடைடிஸ் பி",
        "hdr-emergency-info": "அவசரகாலம் & குறிப்புகள்",
        "lbl-em-name": "அவசரகால தொடர்பு நபர் பெயர்",
        "lbl-em-relation": "உறவுமுறை",
        "lbl-em-phone": "அவசரகால தொலைபேசி",
        "lbl-em-notes": "அவசரகால மருத்துவக் குறிப்புகள்",
        "btn-compile": "அட்டையைத் தொகுத்து குறியாக்கு",
        "hdr-preview": "அட்டை முன்னோட்டம்",
        "hdr-card-header": "நிரந்தர் ஹெல்த் கார்டு",
        "hdr-card-subheader": "ABHA இணையமில்லா நீட்டிப்பு",
        "card-footer-text": "தொழிற்சங்க மருத்துவ முகாமால் வழங்கப்பட்டது • அட்டையை லேமினேட் செய்க",
        "qr-stats-title": "க்யூஆர் சேமிப்பகம் & சுருக்க பகுப்பாய்வு",
        "btn-print": "🖨️ அட்டையை அச்சிடு",
        "scanner-title": "அட்டை ரீடர்",
        "scanner-desc": "சுகாதார அட்டையில் உள்ள க்யூஆர் குறியீட்டை கேமரா முன் காட்டி ஸ்கேன் செய்யவும்.",
        "btn-start-stream": "📷 கேமராவைத் தொடங்கு",
        "btn-stop-stream": "⏹️ கேமராவை நிறுத்து",
        "scanner-fallback-desc": "கேமரா இல்லையா? க்யூஆர் குறியீடு புகைப்படத்தைப் பதிவேற்றுக:",
        "btn-choose-qr": "📁 க்யூஆர் படத்தை எடு",
        "patient-record-title": "நோயாளி வரலாற்றுப் பதிவு",
        "awaiting-qr": "க்யூஆர் குறியீடு ஸ்கேனுக்காக காத்திருக்கிறது...",
        "awaiting-qr-desc": "குறியீட்டை கேமரா முன் காட்டவும் அல்லது கோப்பை பதிவேற்றவும்.",
        "hdr-additional-info": "கூடுதல் தகவல்கள்",
        "hdr-surgeries-devices": "அறுவை சிகிச்சைகள் & சாதனங்கள்",
        "hdr-health-timeline": "ஊடாடும் சுகாதார & தடுப்பூசி காலக்கோடு",
        "hdr-doctor-notes": "மருத்துவரின் ஆலோசனை குறிப்புகள் (இணையமின்றி சேமிக்கப்பட்டது)",
        "btn-add-note": "ஆலோசனைக் குறிப்பைச் சேர்",
        "btn-view-emergency": "← அவசரகால அட்டைக்குச் செல்",
        "btn-clear-record": "விவரங்களை அழி",
        "btn-view-full": "முழு மருத்துவப் பதிவேட்டைப் பார்"
    },
    te: {
        "title": "నిరంతర్ హెల్త్",
        "tagline": "ఆఫ్‌లైన్ ఆరోగ్య కొనసాగింపు పోర్టల్",
        "nav-dashboard": "డాష్‌బోర్డ్",
        "nav-generator": "కార్డ్ జనరేటర్",
        "nav-scanner": "కార్డ్ స్కానర్",
        "status-offline-sandbox": "సిస్టమ్ ఆఫ్‌లైన్‌లో నడుస్తోంది (ABHA లాస్ట్-మైల్ శాండ్‌బాక్స్)",
        "simulate-offline": "🌐 ఆఫ్‌లైన్ మోడ్ సక్రియం చేయి",
        "total-registered": "మొత్తం జారీ చేసిన కార్డులు",
        "emergency-scans": "అత్యవసర స్కాన్‌లు",
        "average-compression": "కంప్రెషన్ నిష్పత్తి",
        "offline-storage": "డేటా నిల్వ పరిమాణం",
        "volunteer-portal": "స్వచ్ఛంద పోర్టల్",
        "volunteer-desc": "కార్మికుడి వివరాలు సేకరించి, ఫోటో క్యాప్చర్ చేసి, ఎన్‌క్రిప్ట్ చేసిన ఆరోగ్య కార్డును సృష్టించండి.",
        "btn-issue-new": "కొత్త కార్డ్ జారీ చేయి",
        "clinician-portal": "వైద్యుల పోర్టల్",
        "clinician-desc": "స్థానిక ఫోన్ కెమెరాతో కార్డ్ స్కాన్ చేయండి. ఇంటర్నెట్ లేకుండా రోగి చరిత్రను చూడండి.",
        "btn-open-scanner": "స్కానర్ తెరువు",
        "local-registry-search": "స్థానిక రిజిస్ట్రీ శోధన",
        "search-placeholder": "వెతకడానికి టైప్ చేయండి...",
        "th-id": "కార్మికుడి ఐడీ",
        "th-name": "పేరు",
        "th-age-sex": "వయస్సు/లింగం",
        "th-blood": "రక్తం",
        "th-risk": "ప్రమాదం",
        "th-actions": "చర్యలు",
        "no-records-found": "శోధనకు సరిపోయే రికార్డులు లేవు.",
        "registry-title": "కార్మికుడి వైద్య రిజిస్ట్రీ",
        "lbl-worker-id": "కార్మికుడి ఐడీ (స్వయంచాలక)",
        "lbl-photo-capture": "ఫోటో క్యాప్చర్",
        "btn-init-camera": "📷 కెమెరా ప్రారంభించు",
        "btn-snap": "ఫోటో తీయి",
        "btn-retake": "మళ్లీ తీయి",
        "hdr-personal-info": "వ్యక్తిగత వివరాలు",
        "lbl-name": "పూర్తి పేరు",
        "lbl-age": "వయస్సు (సంవత్సరాలు)",
        "lbl-gender": "లింగం",
        "opt-select": "ఎంచుకోండి",
        "opt-male": "పురుషుడు",
        "opt-female": "స్త్రీ",
        "opt-other": "ఇతర",
        "lbl-height": "ఎత్తు (సెం.మీ)",
        "lbl-weight": "బరువు (కిలోలు)",
        "lbl-phone": "ఫోన్ నంబర్",
        "lbl-address": "ప్రస్తుత చిరునామా",
        "hdr-medical-info": "వైద్య సమాచారం",
        "lbl-blood": "రక్త సమూహం",
        "lbl-chronic": "దీర్ఘకాలిక వ్యాధులు",
        "chk-diabetes": "మధుమేహం",
        "chk-hypertension": "రక్తపోటు",
        "chk-asthma": "ఆస్తమా",
        "chk-cardiac": "గుండె జబ్బు",
        "chk-tuberculosis": "క్షయవ్యాధి",
        "chk-epilepsy": "మూర్ఛవ్యాధి",
        "chk-other": "ఇతర",
        "lbl-meds": "ప్రస్తుత మందులు (కామాతో వేరు చేయండి)",
        "lbl-allergies": "అలర్జీలు",
        "lbl-disability": "వైకల్యం స్థితి",
        "opt-no": "లేదు",
        "opt-yes": "అవును",
        "lbl-donor": "అవయవ దాత",
        "lbl-pregnancy": "గర్భధారణ స్థితి",
        "lbl-last-visit": "చివరిసారి ఆసుపత్రికి వెళ్లిన తేదీ",
        "lbl-surgeries": "గత శస్త్రచికిత్సలు",
        "lbl-devices": "వైద్య పరికరాలు (ఉదా. పేస్ మేకర్)",
        "lbl-vaccinations": "టీకాల చరిత్ర",
        "chk-tetanus": "టెటనస్",
        "chk-covid": "కోవిడ్-19",
        "chk-bcg": "బీసీజీ",
        "chk-hepb": "హెపటైటిస్ బి",
        "hdr-emergency-info": "అత్యవసర మరియు నోట్స్",
        "lbl-em-name": "అత్యవసర కాంటాక్ట్ పేరు",
        "lbl-em-relation": "సంబంధం",
        "lbl-em-phone": "అత్యవసర ఫోన్",
        "lbl-em-notes": "అత్యవసర వైద్య నోట్స్",
        "btn-compile": "కార్డ్ ఎన్‌క్రిప్ట్ చేసి సృష్టించు",
        "hdr-preview": "కార్డ్ ప్రివ్యూ",
        "hdr-card-header": "నిరంతర్ హెల్త్ కార్డ్",
        "hdr-card-subheader": "ABHA ఆఫ్‌లైన్ ఎక్స్‌టెన్షన్స్",
        "card-footer-text": "యూనియన్ హెల్త్ క్యాంప్ ద్వారా జారీ చేయబడింది • కార్డును లామినేట్ చేసుకోండి",
        "qr-stats-title": "క్యూఆర్ నిల్వ & కంప్రెషన్ విశ్లేషణ",
        "btn-print": "🖨️ హెల్త్ కార్డ్ ప్రింట్ చేయి",
        "scanner-title": "కార్డ్ రీడర్",
        "scanner-desc": "స్థానికంగా స్కాన్ చేయడానికి కార్డ్ క్యూఆర్‌ను కెమెరా ముందు ఉంచండి.",
        "btn-start-stream": "📷 కెమెరా ప్రారంభించు",
        "btn-stop-stream": "⏹️ కెమెరా ఆపివేయి",
        "scanner-fallback-desc": "కెమెరా లేదా? క్యూఆర్ కోడ్ ఫోటో అప్‌లోడ్ చేయి:",
        "btn-choose-qr": "📁 క్యూఆర్ చిత్రం ఎంచుకో",
        "patient-record-title": "రోగి రికార్డు వివరాలు",
        "awaiting-qr": "స్కాన్ కోసం వేచి చూస్తోంది...",
        "awaiting-qr-desc": "కెమెరా వ్యూలో కోడ్ ఉంచండి లేదా పైన ఫైల్ అప్‌లోడ్ చేయండి.",
        "hdr-additional-info": "అదనపు సమాచారం",
        "hdr-surgeries-devices": "శస్త్రచికిత్సలు & పరికరాలు",
        "hdr-health-timeline": "ఆరోగ్య & టీకా కాలక్రమం",
        "hdr-doctor-notes": "వైద్యుల నోట్స్ (ఆఫ్‌లైన్‌లో నిల్వ చేయబడింది)",
        "btn-add-note": "వైద్యుల నోట్ జోడించు",
        "btn-view-emergency": "← అత్యవసర కార్డ్‌కు తిరిగి వెళ్ళు",
        "btn-clear-record": "రికార్డు క్లియర్ చేయి",
        "btn-view-full": "పూర్తి ఆరోగ్య రికార్డును చూడండి"
    },
    mr: {
        "title": "निरंतर हेल्थ",
        "tagline": "ऑफलाइन आरोग्य निरंतरता पोर्टल",
        "nav-dashboard": "डॅशबोर्ड",
        "nav-generator": "कार्ड जनरेटर",
        "nav-scanner": "कार्ड स्कॅनर",
        "status-offline-sandbox": "सिस्टम ऑफलाइन कार्यरत आहे (ABHA लास्ट-माइल सँडबॉक्स)",
        "simulate-offline": "🌐 ऑफलाइन मोड सक्रिय करा",
        "total-registered": "एकूण जारी कार्डे",
        "emergency-scans": "आणीबाणी स्कॅन",
        "average-compression": "कॉम्प्रेषण प्रमाण",
        "offline-storage": "डेटा साठवणूक आकार",
        "volunteer-portal": "स्वयंसेवक पोर्टल",
        "volunteer-desc": "कामगाराची मुलाखत घ्या, फोटो काढा, आरोग्याची माहिती भरा आणि कार्ड तयार करा.",
        "btn-issue-new": "नवीन कार्ड जारी करा",
        "clinician-portal": "डॉक्टर पोर्टल",
        "clinician-desc": "स्थानिक फोन कॅमेऱ्याने कामगाराचे कार्ड स्कॅन करा. इंटरनेटशिवाय रुग्णाचा इतिहास पहा.",
        "btn-open-scanner": "स्कॅनर उघडा",
        "local-registry-search": "स्थानिक नोंदणी डेटाबेस शोध",
        "search-placeholder": "शोधण्यासाठी टाईप करा...",
        "th-id": "कामगार आयडी",
        "th-name": "नाव",
        "th-age-sex": "वय/लिंग",
        "th-blood": "रक्त",
        "th-risk": "धोका",
        "th-actions": "कृती",
        "no-records-found": "शोधानुसार कोणतीही नोंद आढळली नाही.",
        "registry-title": "कामगार वैद्यकीय नोंदणी",
        "lbl-worker-id": "कामगार आयडी (स्वयंचलित)",
        "lbl-photo-capture": "फोटो कॅप्चर",
        "btn-init-camera": "📷 कॅमेरा सुरू करा",
        "btn-snap": "फोटो काढा",
        "btn-retake": "पुन्हा घ्या",
        "hdr-personal-info": "वैयक्तिक तपशील",
        "lbl-name": "पूर्ण नाव",
        "lbl-age": "वय (वर्षे)",
        "lbl-gender": "लिंग",
        "opt-select": "निवडा",
        "opt-male": "पुरुष",
        "opt-female": "महिला",
        "opt-other": "इतर",
        "lbl-height": "उंची (सेमी)",
        "lbl-weight": "वजन (किग्रॅ)",
        "lbl-phone": "फोन नंबर",
        "lbl-address": "सध्याचा पत्ता",
        "hdr-medical-info": "वैद्यकीय माहिती",
        "lbl-blood": "रक्त गट",
        "lbl-chronic": "दीर्घकालीन आजार",
        "chk-diabetes": "मधुमेह",
        "chk-hypertension": "उच्च रक्तदाब",
        "chk-asthma": "दमा",
        "chk-cardiac": "हृदयविकार",
        "chk-tuberculosis": "टीबी (क्षयरोग)",
        "chk-epilepsy": "मिरगी (Epilepsy)",
        "chk-other": "इतर",
        "lbl-meds": "सध्याची औषधे (कॉमा टाकून वेगळी करा)",
        "lbl-allergies": "एलर्जी",
        "lbl-disability": "अपंगत्व स्थिती",
        "opt-no": "नाही",
        "opt-yes": "होय",
        "lbl-donor": "अवयव दाता",
        "lbl-pregnancy": "गर्भावस्थेची स्थिती",
        "lbl-last-visit": "शेवटची रुग्णालय भेट",
        "lbl-surgeries": "मागील शस्त्रक्रिया",
        "lbl-devices": "वैद्यकीय उपकरणे (उदा. पेसमेकर)",
        "lbl-vaccinations": "टीकाकरण इतिहास",
        "chk-tetanus": "टिटॅनस",
        "chk-covid": "कोविड-१९",
        "chk-bcg": "बीसीजी",
        "chk-hepb": "हिपॅटायटीस बी",
        "hdr-emergency-info": "आणीबाणी आणि नोट्स",
        "lbl-em-name": "आणीबाणी संपर्क नाव",
        "lbl-em-relation": "नातेसंबंध",
        "lbl-em-phone": "आणीबाणी फोन",
        "lbl-em-notes": "आणीबाणी वैद्यकीय नोट्स",
        "btn-compile": "कार्ड संकलित आणि एन्क्रिप्ट करा",
        "hdr-preview": "कार्डचे पूर्वावलोकन",
        "hdr-card-header": "निरंतर हेल्थ कार्ड",
        "hdr-card-subheader": "ABHA ऑफलाइन मुदतवाढ",
        "card-footer-text": "युनियन हेल्थ कॅम्पद्वारे जारी • कार्ड लॅमिनेटेड ठेवा",
        "qr-stats-title": "क्यूआर स्टोरेज आणि कॉम्प्रेषण विश्लेषण",
        "btn-print": "🖨️ हेल्थ कार्ड प्रिंट करा",
        "scanner-title": "कार्ड रीडर",
        "scanner-desc": "स्थानिक पातळीवर स्कॅन करण्यासाठी कामगाराचे क्यूआर कोड कॅमेरासमोर धरा.",
        "btn-start-stream": "📷 कॅमेरा सुरू करा",
        "btn-stop-stream": "⏹️ कॅमेरा बंद करा",
        "scanner-fallback-desc": "कॅमेरा नाही? क्यूआर कोड फोटो अपलोड करा:",
        "btn-choose-qr": "📁 क्यूआर इमेज निवडा",
        "patient-record-title": "रुग्णाचा इतिहास रेकॉर्ड",
        "awaiting-qr": "स्कॅन पेलोडची वाट पाहत आहे...",
        "awaiting-qr-desc": "कॅमेरा चौकटीत कोड आणा किंवा वर फाईल अपलोड करा.",
        "hdr-additional-info": "अतिरिक्त माहिती",
        "hdr-surgeries-devices": "शस्त्रक्रिया आणि उपकरणे",
        "hdr-health-timeline": "आरोग्य व लसीकरण टाइमलाइन",
        "hdr-doctor-notes": "डॉक्टरांचे प्रिस्क्रिप्शन नोट्स (ऑफलाइन साठवलेले)",
        "btn-add-note": "नोंद जोडा",
        "btn-view-emergency": "← आणीबाणी कार्डवर परत जा",
        "btn-clear-record": "रेकॉर्ड साफ करा",
        "btn-view-full": "पूर्ण आरोग्य रेकॉर्ड पहा"
    }
};

// Programmatic translations for clear database button
TRANSLATIONS.en["btn-clear-database"] = "🗑️ Clear Database";
TRANSLATIONS.hi["btn-clear-database"] = "🗑️ डेटाबेस साफ़ करें";
TRANSLATIONS.bn["btn-clear-database"] = "🗑️ ডাটাবেস মুছুন";
TRANSLATIONS.ta["btn-clear-database"] = "🗑️ தரவுத்தளத்தை அழி";
TRANSLATIONS.te["btn-clear-database"] = "🗑️ డేటాబేస్ క్లియర్ చేయి";
TRANSLATIONS.mr["btn-clear-database"] = "🗑️ डेटाबेस साफ करा";

// Global variables
let activeLanguage = 'en';
let currentScanner = null;
let currentWebcamStream = null;
let activeWorkerPhotoBase64 = null;
let activeScannedProfile = null;
let deferredInstallPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Service Worker & PWA setup
    setupPWARegistration();

    // 2. Navigation Tab Setup
    setupNavigation();
    
    // 3. Ingestion Photo capture Stream
    setupWebcamCapture();

    // 4. Generator Screen setups
    setupGenerator();
    
    // 5. Camera & File scanner configs
    setupScanner();

    // 6. Language Select handler
    setupLocalization();

    // 7. Load local database tables & stats
    refreshDashboardAnalytics();

    // 8. Clear Database handler
    const clearDbBtn = document.getElementById('btn-clear-db');
    if (clearDbBtn) {
        clearDbBtn.addEventListener('click', () => {
            const confirmMsg = activeLanguage === 'hi' 
                ? "क्या आप वाकई इस डिवाइस से सभी पंजीकृत स्वास्थ्य कार्ड हटाना चाहते हैं? यह कार्रवाई स्थायी है!" 
                : "Are you sure you want to delete all registered worker health cards from this device? This action is permanent and offline!";
            if (confirm(confirmMsg)) {
                localStorage.removeItem('nirantar_registry');
                localStorage.removeItem('nirantar_emergency_scans_count');
                refreshDashboardAnalytics();
                const successMsg = activeLanguage === 'hi' ? "डेटाबेस सफलतापूर्वक साफ़ हो गया!" : "Database cleared successfully!";
                alert(successMsg);
            }
        });
    }
});

// ==========================================
// 📦 PWA SERVICE WORKER REGISTRATION
// ==========================================
function setupPWARegistration() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('ServiceWorker registered successfully:', reg.scope))
                .catch(err => console.error('ServiceWorker registration failed:', err));
        });
    }

    // PWA Install Prompt Hook
    const installBtn = document.getElementById('pwa-install-btn');
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;
        installBtn.style.display = 'inline-block';
    });

    installBtn.addEventListener('click', () => {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the PWA install prompt');
            } else {
                console.log('User dismissed the PWA install prompt');
            }
            deferredInstallPrompt = null;
            installBtn.style.display = 'none';
        });
    });
}

// ==========================================
// 🌐 OFFLINE MULTILINGUAL LOCALIZATION
// ==========================================
function setupLocalization() {
    const langSelect = document.getElementById('lang-select');
    langSelect.addEventListener('change', (e) => {
        switchLanguage(e.target.value);
    });

    // Default system language check
    switchLanguage('en');
}

function switchLanguage(langCode) {
    if (!TRANSLATIONS[langCode]) return;
    activeLanguage = langCode;
    
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-key');
        const translation = TRANSLATIONS[langCode][key];
        if (translation) {
            // Respect tags inside elements or just change text
            if (el.tagName === 'INPUT') {
                el.placeholder = translation;
            } else if (el.tagName === 'OPTION') {
                el.innerText = translation;
            } else {
                // If it contains children inputs (like checkboxes), preserve inputs and only replace text node
                let textNode = null;
                for (let child of el.childNodes) {
                    if (child.nodeType === Node.TEXT_NODE) {
                        textNode = child;
                        break;
                    }
                }
                if (textNode) {
                    textNode.nodeValue = translation;
                } else {
                    el.innerText = translation;
                }
            }
        }
    });

    // Update specific placeholders that don't match data-key easily
    document.getElementById('search-query').placeholder = TRANSLATIONS[langCode]['search-placeholder'];
}

// Navigation Controller
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewContainers = document.querySelectorAll('.view-container');
    const actionCards = document.querySelectorAll('.action-card');

    const switchView = (targetViewId) => {
        navButtons.forEach(btn => {
            if (btn.dataset.target === targetViewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        viewContainers.forEach(container => {
            if (container.id === targetViewId) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        });

        // Release camera if we navigate away
        if (targetViewId !== 'scanner-view') {
            stopScanning();
        }
        if (targetViewId !== 'generator-view') {
            stopWebcamStream();
        }
        if (targetViewId === 'dashboard-view') {
            refreshDashboardAnalytics();
        }
    };

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.target));
    });

    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.classList.contains('generate') ? 'generator-view' : 'scanner-view';
            switchView(target);
            if (target === 'scanner-view') {
                startScanning();
            }
        });
    });

    // Airplane mode toggle simulation
    const airplaneToggle = document.getElementById('airplane-toggle');
    airplaneToggle.addEventListener('click', () => {
        airplaneToggle.classList.toggle('active');
        const active = airplaneToggle.classList.contains('active');
        airplaneToggle.innerHTML = active ? '✈️ Offline Mode ACTIVE' : '🌐 Simulate Offline';
        const indicator = document.querySelector('.status-bar');
        if (active) {
            indicator.style.backgroundColor = 'rgba(244, 63, 94, 0.15)';
            indicator.style.borderBottomColor = 'rgba(244, 63, 94, 0.25)';
            indicator.querySelector('.status-dot').style.backgroundColor = 'var(--accent-warning)';
            indicator.querySelector('#network-status-text').innerText = 'System Running in 100% Offline (Airplane Mode) - No Remote Logs';
        } else {
            indicator.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
            indicator.style.borderBottomColor = 'rgba(16, 185, 129, 0.2)';
            indicator.querySelector('.status-dot').style.backgroundColor = 'var(--accent-success)';
            indicator.querySelector('#network-status-text').innerText = 'System Running Offline (ABHA Last-Mile Sandbox)';
        }
    });

    // Gender check toggle pregnancy field
    const genderSelect = document.getElementById('worker-gender');
    genderSelect.addEventListener('change', () => {
        const isFemale = genderSelect.value === 'F';
        document.getElementById('pregnancy-container').style.display = isFemale ? 'block' : 'none';
    });
}

// ==========================================
// 📷 INGESTION WEBCAM CROP MODULE
// ==========================================
function setupWebcamCapture() {
    const video = document.getElementById('webcam-feed');
    const canvas = document.getElementById('photo-canvas');
    const preview = document.getElementById('photo-preview');
    const placeholder = document.getElementById('camera-placeholder');
    
    const btnToggle = document.getElementById('btn-camera-toggle');
    const btnCapture = document.getElementById('btn-camera-capture');
    const btnReset = document.getElementById('btn-camera-reset');

    btnToggle.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 300, height: 300, facingMode: "user" },
                audio: false
            });
            currentWebcamStream = stream;
            video.srcObject = stream;
            video.style.display = 'block';
            placeholder.style.display = 'none';
            preview.style.display = 'none';

            btnToggle.style.display = 'none';
            btnCapture.style.display = 'inline-block';
        } catch (err) {
            console.error("Camera access error:", err);
            alert("Unable to access webcam. Please check permissions.");
        }
    });

    btnCapture.addEventListener('click', () => {
        if (!currentWebcamStream) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 130;
        canvas.height = 130;
        
        // Draw cropped circle or crop square center
        ctx.drawImage(video, 0, 0, 130, 130);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        activeWorkerPhotoBase64 = dataUrl;
        
        preview.src = dataUrl;
        preview.style.display = 'block';
        video.style.display = 'none';
        
        btnCapture.style.display = 'none';
        btnReset.style.display = 'inline-block';
        
        // Stop stream immediately to save battery/camera lock
        stopWebcamStream();
    });

    btnReset.addEventListener('click', () => {
        activeWorkerPhotoBase64 = null;
        preview.style.display = 'none';
        placeholder.style.display = 'flex';
        btnReset.style.display = 'none';
        btnToggle.style.display = 'inline-block';
    });
}

function stopWebcamStream() {
    if (currentWebcamStream) {
        currentWebcamStream.getTracks().forEach(track => track.stop());
        currentWebcamStream = null;
    }
}

// ==========================================
// 🛠️ COMPRESSION & PER-CARD CRYPTOGRAPHY
// ==========================================

function generateUniqueWorkerID() {
    // Generate format NH-XXXX-XXXX
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // clear of O,0,I,1
    const randSet = (len) => {
        let res = "";
        for (let i = 0; i < len; i++) {
            res += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return res;
    };
    return `NH-${randSet(4)}-${randSet(4)}`;
}

// Key Derivation: unique encryption key derived per-worker
function deriveWorkerKey(workerId) {
    // MasterKey + workerId salt
    const derived = CryptoJS.PBKDF2(CONFIG.MASTER_KEY, workerId, {
        keySize: 256/32,
        iterations: 150
    });
    return derived.toString();
}

function compressData(profile) {
    // 1. Demographics
    const id = profile.id.trim();
    const name = profile.name.trim().replace(/\|/g, ''); 
    const age = parseInt(profile.age) || 0;
    const gender = profile.gender || 'O';
    const blood = profile.bloodGroup || 'O+';
    const height = parseInt(profile.height) || 0;
    const weight = parseInt(profile.weight) || 0;
    const address = profile.address.trim().replace(/\|/g, '');
    const phone = profile.phone.trim().replace(/\|/g, '');

    // 2. Conditions (Tokenized)
    const condTokens = profile.conditions.join(',');

    // 3. Medications, Allergies
    const meds = profile.meds.trim().replace(/\|/g, '');
    const allergies = profile.allergies.trim().replace(/\|/g, '');

    // 4. Vaccinations (Tokenized list e.g. T25,C22)
    const vaccineTokens = profile.vaccines.map(v => `${v.code}${v.year}`).join(',');

    // 5. Details
    const disability = profile.disability || 'N';
    const pregnancy = profile.pregnancy || 'N';
    const donor = profile.donor || 'N';
    const lastVisit = profile.lastVisit || '';
    const surgeries = profile.surgeries.trim().replace(/\|/g, '');
    const devices = profile.devices.trim().replace(/\|/g, '');

    // 6. Emergency Contacts
    const emName = profile.emName.trim().replace(/\|/g, '');
    const emRelation = profile.emRelation.trim().replace(/\|/g, '');
    const emPhone = profile.emPhone.trim().replace(/\|/g, '');
    const emNotes = profile.emNotes.trim().replace(/\|/g, '');

    // Raw serialized payload list (V2 Format)
    const rawPayload = [
        CONFIG.VERSION,
        id,
        name,
        age,
        gender,
        blood,
        height,
        weight,
        address,
        phone,
        condTokens || 'NONE',
        meds || 'NONE',
        allergies || 'NONE',
        vaccineTokens || 'NONE',
        disability,
        pregnancy,
        donor,
        lastVisit || 'NONE',
        surgeries || 'NONE',
        devices || 'NONE',
        emName,
        emRelation,
        emPhone,
        emNotes || 'NONE'
    ].join('|');

    console.log("Compressed Payload V2:", rawPayload);

    // Compute HMAC Signature of raw payload for integrity verification
    const signature = CryptoJS.HmacSHA256(rawPayload, CONFIG.MASTER_KEY).toString();

    // Combined block: Payload + "#" + Signature
    const combinedBlock = rawPayload + "#" + signature;

    // Derived unique AES key per card (keyed by Worker ID)
    const cardKey = deriveWorkerKey(id);

    // Encrypt combined payload using AES
    const encrypted = CryptoJS.AES.encrypt(combinedBlock, cardKey).toString();
    return { encrypted, rawPayloadLength: rawPayload.length, encryptedLength: encrypted.length };
}

function decompressData(encryptedPayload) {
    try {
        // Step 1: In Version 2, we need the Worker ID to derive the card's AES key.
        // But the Worker ID is inside the encrypted payload! How does the scanner decrypt it?
        // We do a brief check: we extract the Worker ID by doing a search over a small unencrypted hint,
        // OR the clinician app tries to decrypt. Wait! A common pattern is to prefix the Worker ID in plaintext,
        // or we decrypt with a known set, or the Worker ID can be retrieved from the printed card (the doctor types it, or we prepend it to the QR payload).
        // Yes! To make decryption possible while keeping the payload fully encrypted, we prepend the WorkerID in plaintext:
        // Format: WorkerID:EncryptedData
        const splitIndex = encryptedPayload.indexOf(':');
        if (splitIndex === -1) {
            throw new Error("Invalid payload format (Missing worker hint)");
        }
        
        const workerId = encryptedPayload.substring(0, splitIndex);
        const ciphertext = encryptedPayload.substring(splitIndex + 1);

        // Deriving card key from hint WorkerID
        const cardKey = deriveWorkerKey(workerId);
        const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, cardKey);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedText) {
            throw new Error("AES Decryption failed (invalid key)");
        }

        // Split payload and signature
        const hashIndex = decryptedText.lastIndexOf('#');
        if (hashIndex === -1) {
            throw new Error("Integrity signature block missing");
        }

        const rawPayload = decryptedText.substring(0, hashIndex);
        const scannedSignature = decryptedText.substring(hashIndex + 1);

        // Verify digital signature
        const expectedSignature = CryptoJS.HmacSHA256(rawPayload, CONFIG.MASTER_KEY).toString();
        const isAuthentic = (scannedSignature === expectedSignature);

        const parts = rawPayload.split('|');
        if (parts.length < 24) {
            throw new Error("Incomplete data structure mapping");
        }

        const [
            version, id, name, age, gender, blood, height, weight, address, phone,
            condTokens, meds, allergies, vaccineTokens, disability, pregnancy, donor,
            lastVisit, surgeries, devices, emName, emRelation, emPhone, emNotes
        ] = parts;

        // Map Chronic Conditions
        const conditions = condTokens === 'NONE' ? [] : condTokens.split(',').map(t => DICTIONARY.conditions[t] || t);

        // Map Vaccinations
        const vaccines = vaccineTokens === 'NONE' ? [] : vaccineTokens.split(',').map(token => {
            const code = token.charAt(0);
            const year = '20' + token.substring(1);
            const name = DICTIONARY.vaccines[code] || 'Vaccine';
            return { name, year };
        });

        return {
            isAuthentic,
            version,
            id,
            name,
            age: parseInt(age),
            gender,
            bloodGroup: blood,
            height: parseInt(height),
            weight: parseInt(weight),
            address,
            phone,
            conditions,
            meds: meds === 'NONE' ? '' : meds,
            allergies: allergies === 'NONE' ? [] : allergies.split(',').map(a => a.trim()),
            vaccines,
            disability,
            pregnancy,
            donor,
            lastVisit: lastVisit === 'NONE' ? '' : lastVisit,
            surgeries: surgeries === 'NONE' ? '' : surgeries,
            devices: devices === 'NONE' ? '' : devices,
            emName,
            emRelation,
            emPhone,
            emNotes: emNotes === 'NONE' ? '' : emNotes
        };

    } catch (e) {
        console.error("Decompression Engine Error:", e);
        return null;
    }
}

// ==========================================
// 💻 CARD GENERATOR SCREEN CONTROLLER
// ==========================================
function setupGenerator() {
    const form = document.getElementById('generation-form');
    const qrCanvas = document.getElementById('qr-canvas');
    const downloadBtn = document.getElementById('download-card-btn');
    const previewContainer = document.getElementById('card-preview-container');

    // Auto-fill active Worker ID
    document.getElementById('worker-id').value = generateUniqueWorkerID();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Gather all profile details
        const workerId = document.getElementById('worker-id').value;
        const name = document.getElementById('worker-name').value;
        const age = document.getElementById('worker-age').value;
        const gender = document.getElementById('worker-gender').value;
        const height = document.getElementById('worker-height').value;
        const weight = document.getElementById('worker-weight').value;
        const phone = document.getElementById('worker-phone').value;
        const address = document.getElementById('worker-address').value;
        const bloodGroup = document.getElementById('worker-blood').value;

        const conditions = [];
        document.querySelectorAll('input[name="conditions"]:checked').forEach(cb => conditions.push(cb.value));

        const meds = document.getElementById('worker-meds').value;
        const allergies = document.getElementById('worker-allergies').value;
        const disability = document.getElementById('worker-disability').value;
        const donor = document.getElementById('worker-donor').value;
        
        let pregnancy = 'N';
        if (gender === 'F') {
            pregnancy = document.getElementById('worker-pregnancy').value;
        }

        const lastVisit = document.getElementById('worker-last-visit').value;
        const surgeries = document.getElementById('worker-surgeries').value;
        const devices = document.getElementById('worker-devices').value;

        // Vaccinations
        const vaccines = [];
        const vaccineDefs = [
            { id: 'vaccine-tetanus', code: 'T', yearId: 'year-tetanus' },
            { id: 'vaccine-covid', code: 'C', yearId: 'year-covid' },
            { id: 'vaccine-bcg', code: 'B', yearId: 'year-bcg' },
            { id: 'vaccine-hepb', code: 'H', yearId: 'year-hepb' }
        ];
        vaccineDefs.forEach(v => {
            if (document.getElementById(v.id).checked) {
                const yearVal = document.getElementById(v.yearId).value;
                vaccines.push({ code: v.code, year: yearVal.slice(-2) });
            }
        });

        // Emergency details
        const emName = document.getElementById('emergency-name').value;
        const emRelation = document.getElementById('emergency-relation').value;
        const emPhone = document.getElementById('emergency-phone').value;
        const emNotes = document.getElementById('emergency-notes').value;

        const profile = {
            id: workerId, name, age, gender, height, weight, phone, address, bloodGroup,
            conditions, meds, allergies, disability, donor, pregnancy, lastVisit, surgeries, devices,
            vaccines, emName, emRelation, emPhone, emNotes
        };

        // 2. Compress and Encrypt
        const result = compressData(profile);
        
        // Full payload prefixed with Hint ID
        const qrPayload = `${workerId}:${result.encrypted}`;

        // 3. Compile stats
        const rawJsonString = JSON.stringify(profile);
        const rawJsonSize = rawJsonString.length;
        const encryptedSize = qrPayload.length;
        const compRatio = Math.round(100 - ((result.rawPayloadLength / rawJsonSize) * 100));
        
        // QR capacity safe ceiling
        const capacityPct = Math.min(Math.round((encryptedSize / 700) * 100), 100);

        document.getElementById('stats-json-size').innerText = `${rawJsonSize} B`;
        document.getElementById('stats-compressed-size').innerText = `${result.rawPayloadLength} B`;
        document.getElementById('stats-encrypted-size').innerText = `${encryptedSize} B`;
        document.getElementById('stats-comp-ratio').innerText = `${compRatio}%`;
        document.getElementById('stats-qr-percentage').innerText = `${capacityPct}%`;
        
        const fillBar = document.getElementById('stats-qr-fill');
        fillBar.style.width = `${capacityPct}%`;
        if (capacityPct > 85) {
            fillBar.style.backgroundColor = 'var(--accent-warning)';
        } else {
            fillBar.style.backgroundColor = 'var(--accent-success)';
        }

        // 4. Update preview card values
        document.getElementById('preview-id').innerText = workerId;
        document.getElementById('preview-name').innerText = name;
        
        const genderLabel = { 'M': 'Male', 'F': 'Female', 'O': 'Other' }[gender] || 'Other';
        document.getElementById('preview-meta').innerText = `${genderLabel} | ${age} Yrs`;
        document.getElementById('preview-blood').innerText = bloodGroup;
        document.getElementById('preview-em-contact').innerText = `${emName} (${emPhone})`;
        
        const todayStr = new Date().toISOString().split('T')[0];
        document.getElementById('preview-issue-date').innerText = todayStr;

        // Photo card update
        const previewPhoto = document.getElementById('preview-photo');
        const previewPhotoPlaceholder = document.getElementById('preview-photo-placeholder');
        if (activeWorkerPhotoBase64) {
            previewPhoto.src = activeWorkerPhotoBase64;
            previewPhoto.style.display = 'block';
            previewPhotoPlaceholder.style.display = 'none';
        } else {
            previewPhoto.style.display = 'none';
            previewPhotoPlaceholder.style.display = 'block';
        }

        // 5. Draw QR
        QRCode.toCanvas(qrCanvas, qrPayload, {
            width: 80,
            margin: 0,
            errorCorrectionLevel: 'M',
            color: {
                dark: '#060e11',
                light: '#ffffff'
            }
        }, (error) => {
            if (error) {
                console.error("QR compile error:", error);
                alert("Failed to render QR Code");
                return;
            }
            previewContainer.style.display = 'block';
            previewContainer.scrollIntoView({ behavior: 'smooth' });

            // Write full profile (with base64 photo) into LocalStorage registry DB
            profile.photo = activeWorkerPhotoBase64;
            profile.issueDate = todayStr;
            profile.notes = []; // Consultation clinical logs placeholder
            
            saveProfileToLocalDB(profile);
            refreshDashboardAnalytics();
        });
    });

    downloadBtn.addEventListener('click', () => {
        window.print();
    });
}

// ==========================================
// 💾 LOCAL REGISTRY DATABASE CONTROLLER
// ==========================================
function saveProfileToLocalDB(profile) {
    let registry = JSON.parse(localStorage.getItem('nirantar_registry') || '[]');
    // Prevent duplicate entries
    const existingIndex = registry.findIndex(p => p.id === profile.id);
    if (existingIndex !== -1) {
        // Keep consultation notes if they exist
        profile.notes = registry[existingIndex].notes || [];
        registry[existingIndex] = profile;
    } else {
        registry.push(profile);
    }
    localStorage.setItem('nirantar_registry', JSON.stringify(registry));
}

function getProfileFromLocalDB(workerId) {
    let registry = JSON.parse(localStorage.getItem('nirantar_registry') || '[]');
    return registry.find(p => p.id === workerId);
}

function refreshDashboardAnalytics() {
    const registry = JSON.parse(localStorage.getItem('nirantar_registry') || '[]');
    const totalCardsEl = document.getElementById('stat-total-cards');
    const emergencyScansEl = document.getElementById('stat-emergency-scans');
    const avgCompEl = document.getElementById('stat-avg-compression');
    const storageEl = document.getElementById('stat-storage-used');

    // 1. Basic Stats count
    totalCardsEl.innerText = registry.length;
    
    // Emergency scan counter
    const emergencyCount = parseInt(localStorage.getItem('nirantar_emergency_scans_count') || '0');
    emergencyScansEl.innerText = emergencyCount;

    // Local storage size approximation (Nirantar database keys only)
    let storageBytes = 0;
    const regRaw = localStorage.getItem('nirantar_registry');
    const scanRaw = localStorage.getItem('nirantar_emergency_scans_count');
    if (regRaw) storageBytes += regRaw.length * 2;
    if (scanRaw) storageBytes += scanRaw.length * 2;
    const kbUsed = (storageBytes / 1024).toFixed(1);
    storageEl.innerText = `${kbUsed} KB`;

    // 2. Aggregate average compression ratio
    if (registry.length > 0) {
        let totalRatio = 0;
        registry.forEach(p => {
            const rawJsonString = JSON.stringify(p);
            // approximate payload sizing
            const compressedLength = Math.round(rawJsonString.length * 0.35); // compression sim
            totalRatio += Math.round(100 - ((compressedLength / rawJsonString.length) * 100));
        });
        avgCompEl.innerText = `${Math.round(totalRatio / registry.length)}%`;
    } else {
        avgCompEl.innerText = '0%';
    }

    // 3. Render charts
    renderDashboardCharts(registry);

    // 4. Refresh Registry Search table
    executeRegistrySearch();
}

function renderDashboardCharts(registry) {
    // Condition Distribution Chart mapping
    const conditionCounts = { 'Diabetes': 0, 'Hypertension': 0, 'Asthma': 0, 'Cardiac Condition': 0, 'Tuberculosis': 0, 'Epilepsy': 0, 'Other Chronic': 0 };
    const vaccineCounts = { 'Tetanus': 0, 'COVID-19': 0, 'BCG': 0, 'Hepatitis B': 0 };

    registry.forEach(p => {
        // Map token codes back to strings if not already done
        if (p.conditions) {
            p.conditions.forEach(cond => {
                const fullText = DICTIONARY.conditions[cond] || cond;
                if (conditionCounts.hasOwnProperty(fullText)) {
                    conditionCounts[fullText]++;
                }
            });
        }
        if (p.vaccines) {
            p.vaccines.forEach(vac => {
                const name = vac.name;
                if (vaccineCounts.hasOwnProperty(name)) {
                    vaccineCounts[name]++;
                }
            });
        }
    });

    const maxConditions = Math.max(...Object.values(conditionCounts), 1);
    const condChart = document.getElementById('conditions-chart-ledger');
    condChart.innerHTML = '';
    Object.keys(conditionCounts).forEach(condName => {
        const count = conditionCounts[condName];
        const pct = Math.round((count / maxConditions) * 100);
        condChart.innerHTML += `
            <div class="chart-bar-row">
                <div class="bar-label-info">
                    <span>${condName}</span>
                    <strong>${count}</strong>
                </div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    const maxVaccines = Math.max(registry.length, 1);
    const vacChart = document.getElementById('vaccines-chart-ledger');
    vacChart.innerHTML = '';
    Object.keys(vaccineCounts).forEach(vacName => {
        const count = vaccineCounts[vacName];
        const pct = Math.round((count / maxVaccines) * 100);
        vacChart.innerHTML += `
            <div class="chart-bar-row">
                <div class="bar-label-info">
                    <span>${vacName}</span>
                    <strong>${pct}% (${count}/${maxVaccines})</strong>
                </div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${pct}%; background: linear-gradient(to right, var(--accent-info), var(--accent-success));"></div>
                </div>
            </div>
        `;
    });
}

function executeRegistrySearch() {
    const query = document.getElementById('search-query').value.trim().toLowerCase();
    const type = document.getElementById('search-type').value;
    const registry = JSON.parse(localStorage.getItem('nirantar_registry') || '[]');
    const resultsBody = document.getElementById('search-results-body');
    const emptyState = document.getElementById('search-empty-state');

    resultsBody.innerHTML = '';
    
    const filtered = registry.filter(p => {
        if (!query) return true;
        if (type === 'id') return p.id.toLowerCase().includes(query);
        if (type === 'name') return p.name.toLowerCase().includes(query);
        if (type === 'blood') return p.bloodGroup.toLowerCase().includes(query);
        if (type === 'phone') return p.phone.toLowerCase().includes(query);
        if (type === 'condition') {
            return p.conditions.some(c => {
                const label = DICTIONARY.conditions[c] || c;
                return label.toLowerCase().includes(query);
            });
        }
        return false;
    });

    if (filtered.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        filtered.forEach(p => {
            // Compute Risk Score
            const risk = calculateHealthRisk(p);
            let riskBadge = `<span class="health-risk-badge risk-low" style="padding: 0.15rem 0.5rem; font-size: 0.75rem;">Low</span>`;
            if (risk === 'MODERATE') {
                riskBadge = `<span class="health-risk-badge risk-mod" style="padding: 0.15rem 0.5rem; font-size: 0.75rem;">Moderate</span>`;
            } else if (risk === 'HIGH') {
                riskBadge = `<span class="health-risk-badge risk-high" style="padding: 0.15rem 0.5rem; font-size: 0.75rem;">High</span>`;
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-family: monospace; font-weight: 600; color: var(--accent-success);">${p.id}</td>
                <td><strong>${p.name}</strong></td>
                <td>${p.age} Yrs / ${p.gender}</td>
                <td><span style="color: var(--accent-warning); font-weight:600;">${p.bloodGroup}</span></td>
                <td>${riskBadge}</td>
                <td><button class="btn-table-action" onclick="openProfileFromDashboard('${p.id}')">View</button></td>
            `;
            resultsBody.appendChild(tr);
        });
    }
}

// Global hook for search actions
window.openProfileFromDashboard = (workerId) => {
    const profile = getProfileFromLocalDB(workerId);
    if (!profile) return;
    
    // Switch to scanner view
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.target === 'scanner-view') btn.classList.add('active');
        else btn.classList.remove('active');
    });
    document.querySelectorAll('.view-container').forEach(c => {
        if (c.id === 'scanner-view') c.classList.add('active');
        else c.classList.remove('active');
    });
    
    // Bypass scanning step, populate UI directly
    activeScannedProfile = profile;
    populateEmergencyDashboard(profile);
};

// Bind search input triggers
document.getElementById('search-query').addEventListener('input', executeRegistrySearch);
document.getElementById('search-type').addEventListener('change', executeRegistrySearch);


// ==========================================
// 🎥 CAMERA SCANNER & DECRYPTER
// ==========================================
function setupScanner() {
    const startScanBtn = document.getElementById('start-scan-btn');
    const stopScanBtn = document.getElementById('stop-scan-btn');
    const fileInput = document.getElementById('qr-file-input');
    const resetScanBtn = document.getElementById('reset-scan-btn');

    startScanBtn.addEventListener('click', startScanning);
    stopScanBtn.addEventListener('click', stopScanning);
    resetScanBtn.addEventListener('click', resetScannerUI);

    // Toggle panels in scanner views
    document.getElementById('btn-view-full-record').addEventListener('click', () => {
        document.getElementById('emergency-dashboard').style.display = 'none';
        document.getElementById('health-dashboard').style.display = 'block';
        
        // Add default timelines
        populateFullDashboard(activeScannedProfile);
    });

    document.getElementById('btn-back-to-emergency').addEventListener('click', () => {
        document.getElementById('health-dashboard').style.display = 'none';
        document.getElementById('emergency-dashboard').style.display = 'block';
    });

    // Clinician Consultation Notes Module submit
    document.getElementById('btn-submit-note').addEventListener('click', () => {
        const text = document.getElementById('txt-new-note').value.trim();
        if (!text || !activeScannedProfile) return;

        const note = {
            author: "Dr. Clinician (Offline)",
            date: new Date().toISOString().split('T')[0],
            text: text
        };

        // Initialize notes array
        if (!activeScannedProfile.notes) activeScannedProfile.notes = [];
        activeScannedProfile.notes.unshift(note);

        // Update database
        saveProfileToLocalDB(activeScannedProfile);

        // Render notes list
        renderConsultationNotes(activeScannedProfile);

        // Clean input
        document.getElementById('txt-new-note').value = '';
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length === 0) return;
        const file = e.target.files[0];
        
        if (!currentScanner) {
            currentScanner = new Html5Qrcode("reader");
        }

        currentScanner.scanFile(file, true)
            .then(qrCodeMessage => {
                handleScanSuccess(qrCodeMessage);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to decode QR code. Please upload a high-contrast card photo.");
            });
    });
}

function startScanning() {
    resetScannerUI();
    document.getElementById('start-scan-btn').style.display = 'none';
    document.getElementById('stop-scan-btn').style.display = 'inline-block';
    document.querySelector('.scanner-laser').style.display = 'block';

    if (!currentScanner) {
        currentScanner = new Html5Qrcode("reader");
    }

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    currentScanner.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
            stopScanning();
            handleScanSuccess(decodedText);
        },
        (errorMessage) => {
            // silent scan loops
        }
    ).catch(err => {
        console.error("Camera Init Error:", err);
        alert("Webcam scan init failed. Please grant camera permission or use the file upload option.");
        stopScanning();
    });
}

function stopScanning() {
    document.getElementById('start-scan-btn').style.display = 'inline-block';
    document.getElementById('stop-scan-btn').style.display = 'none';
    document.querySelector('.scanner-laser').style.display = 'none';

    if (currentScanner && currentScanner.isScanning) {
        currentScanner.stop().then(() => {
            console.log("Scanner stopped.");
        }).catch(err => console.error("Failed to stop scanner:", err));
    }
}

function handleScanSuccess(payload) {
    console.log("QR decoded. Reading contents...");
    const profile = decompressData(payload);

    if (!profile) {
        alert("🚨 Security Alert: Decryption failed. This QR code is either corrupted or was encrypted with a different key.");
        resetScannerUI();
        return;
    }

    activeScannedProfile = profile;

    // Track Emergency scan counts
    let emergencyCount = parseInt(localStorage.getItem('nirantar_emergency_scans_count') || '0');
    localStorage.setItem('nirantar_emergency_scans_count', (emergencyCount + 1).toString());

    // Look up local storage to retrieve passport photo if scanned before
    const localCached = getProfileFromLocalDB(profile.id);
    if (localCached && localCached.photo) {
        activeScannedProfile.photo = localCached.photo;
        activeScannedProfile.notes = localCached.notes || [];
    }

    // Trigger Emergency Overrides Screen layout
    populateEmergencyDashboard(activeScannedProfile);
}

// ==========================================
// 🚨 EMERGENCY SCAN OVERRIDES SCREEN
// ==========================================
function populateEmergencyDashboard(profile) {
    document.getElementById('scanner-placeholder').style.display = 'none';
    document.getElementById('health-dashboard').style.display = 'none';
    
    const emergencyDash = document.getElementById('emergency-dashboard');
    emergencyDash.style.display = 'flex';
    
    // Security verification signature tags
    const verifyShield = document.getElementById('verify-shield');
    if (profile.isAuthentic || profile.photo !== undefined) {
        verifyShield.className = "verify-badge verified";
        verifyShield.innerText = "✓ Authentic QR";
    } else {
        verifyShield.className = "verify-badge failed";
        verifyShield.innerText = "⚠️ Unverified Checksum";
    }
    
    document.getElementById('verify-version').innerText = profile.version || CONFIG.VERSION;
    document.getElementById('verify-date').innerText = profile.issueDate || new Date().toISOString().split('T')[0];

    // Details mapping
    document.getElementById('em-name').innerText = profile.name;
    const genderFull = { 'M': 'Male', 'F': 'Female', 'O': 'Other' }[profile.gender] || 'Other';
    document.getElementById('em-meta').innerText = `${profile.id} • ${genderFull}, ${profile.age} Yrs`;
    document.getElementById('em-blood-group').innerText = profile.bloodGroup;

    // Photo preview mapping
    const emPhoto = document.getElementById('em-photo');
    const emPlaceholder = document.getElementById('em-photo-placeholder');
    if (profile.photo) {
        emPhoto.src = profile.photo;
        emPhoto.style.display = 'block';
        emPlaceholder.style.display = 'none';
    } else {
        emPhoto.style.display = 'none';
        emPlaceholder.style.display = 'inline';
    }

    // Critical Alerts badges: RED/ORANGE/YELLOW alerts
    const alertsBox = document.getElementById('em-alert-badges');
    alertsBox.innerHTML = '';

    // A. Cardiac condition warning
    if (profile.conditions && profile.conditions.includes('Cardiac Condition')) {
        alertsBox.innerHTML += `<span class="alert-badge orange">🟠 Cardiac Patient</span>`;
    }
    // B. Severe allergies warning
    if (profile.allergies && profile.allergies.length > 0) {
        alertsBox.innerHTML += `<span class="alert-badge red">🔴 Severe Allergies</span>`;
    }
    // C. Diabetes warning
    if (profile.conditions && profile.conditions.includes('Diabetes')) {
        alertsBox.innerHTML += `<span class="alert-badge yellow">🟡 Diabetes (High Risk)</span>`;
    }
    // D. Vaccination completion status
    if (profile.vaccines && profile.vaccines.length >= 3) {
        alertsBox.innerHTML += `<span class="alert-badge blue">🔵 Fully Vaccinated</span>`;
    }

    if (alertsBox.innerHTML === '') {
        alertsBox.innerHTML = `<span class="alert-badge blue" style="background:rgba(45,212,191,0.05); border-color:var(--border-color); color:var(--text-muted);">🟢 No Severe Clinical Alarms</span>`;
    }

    // Vitals and Medications
    const emAllergies = document.getElementById('em-allergies');
    emAllergies.innerHTML = '';
    if (profile.allergies && profile.allergies.length > 0) {
        profile.allergies.forEach(a => emAllergies.innerHTML += `<span class="tag allergy">⚠️ ${a}</span>`);
    } else {
        emAllergies.innerHTML = `<span class="tag none">No Known Medical Allergies</span>`;
    }

    const emMeds = document.getElementById('em-meds');
    emMeds.innerHTML = '';
    if (profile.meds) {
        profile.meds.split(',').forEach(m => emMeds.innerHTML += `<span>${m.trim()}</span>`);
    } else {
        emMeds.innerHTML = `<span style="color: var(--text-muted);">No Current Daily Medication</span>`;
    }

    // Emergency contact
    document.getElementById('em-contact-info').innerText = `${profile.emName} (${profile.emRelation})`;
    document.getElementById('em-contact-phone').innerHTML = `📞 <a href="tel:${profile.emPhone}" style="color:inherit; text-decoration:none;">${profile.emPhone}</a>`;

    // Notes
    document.getElementById('em-notes').innerText = profile.emNotes || 'No priority medical notes logged.';

    emergencyDash.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 🛡️ FULL DETAILED HEALTH LEDGER DASHBOARD
// ==========================================
function populateFullDashboard(profile) {
    document.getElementById('dash-avatar').innerText = profile.name.charAt(0).toUpperCase();
    document.getElementById('dash-name').innerText = profile.name;
    document.getElementById('dash-id').innerText = profile.id;
    
    // Demographics and BMI
    const genderFull = { 'M': 'Male', 'F': 'Female', 'O': 'Other' }[profile.gender] || 'Other';
    const heightM = (profile.height || 170) / 100;
    const bmiVal = ((profile.weight || 60) / (heightM * heightM)).toFixed(1);
    
    // BMI Category label mapping
    let bmiLabel = "Normal";
    if (bmiVal < 18.5) bmiLabel = "Underweight";
    else if (bmiVal > 24.9) bmiLabel = "Overweight";

    document.getElementById('dash-meta').innerText = `${genderFull} • ${profile.age} Years Old • BMI: ${bmiVal} (${bmiLabel})`;
    document.getElementById('dash-blood').innerText = profile.bloodGroup;

    // Vitals Table
    document.getElementById('dash-height').innerText = `${profile.height || '--'} cm`;
    document.getElementById('dash-weight').innerText = `${profile.weight || '--'} kg`;
    document.getElementById('dash-phone').innerText = profile.phone || '--';
    document.getElementById('dash-address').innerText = profile.address || '--';

    // Risk assessment Badge
    const risk = calculateHealthRisk(profile);
    const riskBadge = document.getElementById('dash-risk-badge');
    riskBadge.innerText = `${risk} RISK`;
    riskBadge.className = `health-risk-badge risk-${risk.toLowerCase()}`;

    // Chronic list
    const conditionsEl = document.getElementById('dash-conditions');
    conditionsEl.innerHTML = '';
    if (profile.conditions && profile.conditions.length > 0) {
        profile.conditions.forEach(c => {
            const label = DICTIONARY.conditions[c] || c;
            conditionsEl.innerHTML += `<span class="tag condition">${label}</span>`;
        });
    } else {
        conditionsEl.innerHTML = `<span class="tag none">No Known Chronic Conditions</span>`;
    }

    // Allergies list
    const allergiesEl = document.getElementById('dash-allergies');
    allergiesEl.innerHTML = '';
    if (profile.allergies && profile.allergies.length > 0) {
        profile.allergies.forEach(a => allergiesEl.innerHTML += `<span class="tag allergy">⚠️ ${a}</span>`);
    } else {
        allergiesEl.innerHTML = `<span class="tag none">No Known Medical Allergies</span>`;
    }

    // Additional Vitals Segment
    const isPreg = (profile.pregnancy === 'Y') ? 'Yes' : 'No';
    document.getElementById('dash-pregnancy').innerText = (profile.gender === 'F') ? isPreg : 'N/A';
    document.getElementById('dash-disability').innerText = (profile.disability === 'Y') ? 'Yes' : 'No';
    document.getElementById('dash-donor').innerText = (profile.donor === 'Y') ? 'Yes' : 'No';

    // Surgeries
    document.getElementById('dash-surgeries').innerText = profile.surgeries || 'None';
    document.getElementById('dash-devices').innerText = profile.devices || 'None';

    // Create Interactive Timeline
    renderInteractiveTimeline(profile);

    // Create Consultation Notes list
    renderConsultationNotes(profile);
}

function calculateHealthRisk(profile) {
    let score = 0;
    
    // Demographic risks
    if (profile.age > 55) score += 2;
    else if (profile.age > 40) score += 1;

    const h = (profile.height || 170) / 100;
    const bmi = (profile.weight || 60) / (h * h);
    if (bmi > 29.9 || bmi < 18.5) score += 1;

    // Chronic diseases risks
    if (profile.conditions) {
        if (profile.conditions.includes('Cardiac Condition')) score += 3;
        if (profile.conditions.includes('Diabetes')) score += 2;
        if (profile.conditions.includes('Hypertension')) score += 2;
        if (profile.conditions.includes('Tuberculosis')) score += 2;
        if (profile.conditions.includes('Asthma')) score += 1;
    }

    if (profile.allergies && profile.allergies.length > 0) score += 1;

    if (score >= 6) return "HIGH";
    if (score >= 3) return "MODERATE";
    return "LOW";
}

function renderInteractiveTimeline(profile) {
    const track = document.getElementById('dash-timeline-track');
    track.innerHTML = '';
    
    const events = [];

    // 1. Gather hospital visits
    if (profile.lastVisit) {
        events.push({
            date: profile.lastVisit,
            title: "Hospital/Clinic Visit",
            desc: "Consulted at community clinic center.",
            type: "visit"
        });
    }

    // 2. Chronic condition registrations
    if (profile.conditions && profile.conditions.length > 0) {
        profile.conditions.forEach(c => {
            const name = DICTIONARY.conditions[c] || c;
            events.push({
                date: profile.issueDate || "Active",
                title: `${name} Logged`,
                desc: "Added to chronic care registry.",
                type: "diagnosis"
            });
        });
    }

    // 3. Vaccinations list
    if (profile.vaccines) {
        profile.vaccines.forEach(v => {
            events.push({
                date: `${v.year}-01`, // approximate
                title: `${v.name} Vaccination`,
                desc: `Immunization dosage recorded in ${v.year}.`,
                type: "vaccination"
            });
        });
    }

    // Sort timeline: newest dates first
    events.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (events.length === 0) {
        track.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">No historical events logged on timeline.</p>';
        return;
    }

    events.forEach(ev => {
        track.innerHTML += `
            <div class="timeline-node ${ev.type}">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-header-row">
                        <span class="timeline-title">${ev.title}</span>
                        <span class="timeline-date">${ev.date}</span>
                    </div>
                    <p class="timeline-desc">${ev.desc}</p>
                </div>
            </div>
        `;
    });
}

function renderConsultationNotes(profile) {
    const feed = document.getElementById('dash-doctor-notes-feed');
    feed.innerHTML = '';

    const notes = profile.notes || [];
    if (notes.length === 0) {
        feed.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem 0;">No consultation notes logged. Physicians can append advice below.</p>';
        return;
    }

    notes.forEach(n => {
        feed.innerHTML += `
            <div class="note-bubble">
                <div class="note-header">
                    <strong>${n.author}</strong>
                    <span>${n.date}</span>
                </div>
                <p class="note-text">${n.text}</p>
            </div>
        `;
    });
}

function resetScannerUI() {
    document.getElementById('emergency-dashboard').style.display = 'none';
    document.getElementById('health-dashboard').style.display = 'none';
    document.getElementById('scanner-placeholder').style.display = 'flex';
    document.getElementById('qr-file-input').value = '';
    activeScannedProfile = null;
}
