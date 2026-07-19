import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Stethoscope, Clock, Phone, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const getLocalizedDoctors = (lang) => {
    const data = {
        en: [
            { id: '1', name: 'Dr. Anita Sharma', specialty: 'General Physician', qualification: 'MBBS, MD (Medicine)', available_times: '09:00 AM - 02:00 PM', contact_info: '9876543210' },
            { id: '2', name: 'Dr. Rajesh Patel', specialty: 'Cardiologist', qualification: 'MBBS, MD, DM (Cardiology)', available_times: '10:00 AM - 01:00 PM', contact_info: '9876543211' },
            { id: '3', name: 'Dr. Sneha Gupta', specialty: 'Gynecologist', qualification: 'MBBS, MS (OBG)', available_times: '02:00 PM - 06:00 PM', contact_info: '9876543212' }
        ],
        hi: [
            { id: '1', name: 'डॉ. अनीता शर्मा', specialty: 'सामान्य चिकित्सक', qualification: 'एमबीबीएस, एमडी (चिकित्सा)', available_times: 'सुबह 09:00 - दोपहर 02:00', contact_info: '9876543210' },
            { id: '2', name: 'डॉ. राजेश पटेल', specialty: 'हृदय रोग विशेषज्ञ', qualification: 'एमबीबीएस, एमडी, डीएम (कार्डियोलॉजी)', available_times: 'सुबह 10:00 - दोपहर 01:00', contact_info: '9876543211' },
            { id: '3', name: 'डॉ. स्नेहा गुप्ता', specialty: 'स्त्री रोग विशेषज्ञ', qualification: 'एमबीबीएस, एमएस (ओबीजी)', available_times: 'दोपहर 02:00 - शाम 06:00', contact_info: '9876543212' }
        ],
        bn: [
            { id: '1', name: 'ডাঃ অনিতা শর্মা', specialty: 'সাধারণ চিকিৎসক', qualification: 'এমবিবিএস, এমডি (মেডিসিন)', available_times: 'সকাল ০৯:০০ - দুপুর ০২:০০', contact_info: '9876543210' },
            { id: '2', name: 'ডাঃ রাজেশ প্যাটেল', specialty: 'হৃদরোগ বিশেষজ্ঞ', qualification: 'এমবিবিএস, এমডি, ডিএম (কার্ডিওলজি)', available_times: 'সকাল ১০:০০ - দুপুর ০১:০০', contact_info: '9876543211' },
            { id: '3', name: 'ডাঃ স্নেহা গুপ্তা', specialty: 'স্ত্রীরোগ বিশেষজ্ঞ', qualification: 'এমবিবিএস, এমএস (ওবিজি)', available_times: 'দুপুর ০২:০০ - সন্ধ্যা ০৬:০০', contact_info: '9876543212' }
        ],
        ta: [
            { id: '1', name: 'டாக்டர் அனிதா சர்மா', specialty: 'பொது மருத்துவர்', qualification: 'எம்பிபிஎஸ், எம்.டி (மருத்துவம்)', available_times: 'காலை 09:00 - பிற்பகல் 02:00', contact_info: '9876543210' },
            { id: '2', name: 'டாக்டர் ராஜேஷ் படேல்', specialty: 'இதயவியலாளர்', qualification: 'எம்பிபிஎஸ், எம்.டி, டி.எம் (இதயவியல்)', available_times: 'காலை 10:00 - பிற்பகல் 01:00', contact_info: '9876543211' },
            { id: '3', name: 'டாக்டர் சினேகா குப்தா', specialty: 'மகளிர் மருத்துவ நிபுணர்', qualification: 'எம்பிபிஎஸ், எம்.எஸ் (மகளிர் மருத்துவம்)', available_times: 'பிற்பகல் 02:00 - மாலை 06:00', contact_info: '9876543212' }
        ],
        te: [
            { id: '1', name: 'డాక్టర్ అనితా శర్మ', specialty: 'జనరల్ ఫిజీషియన్', qualification: 'ఎంబీబీఎస్, ఎండీ (మెడిసిన్)', available_times: 'ఉదయం 09:00 - మధ్యాహ్నం 02:00', contact_info: '9876543210' },
            { id: '2', name: 'డాక్టర్ రాజేష్ పటేల్', specialty: 'కార్డియాలజిస్ట్', qualification: 'ఎంబీబీఎస్, ఎండీ, డీఎం (కార్డియాలజీ)', available_times: 'ఉదయం 10:00 - మధ్యాహ్నం 01:00', contact_info: '9876543211' },
            { id: '3', name: 'డాక్టర్ స్నేహ గుప్తా', specialty: 'గైనకాలజిస్ట్', qualification: 'ఎంబీబీఎస్, ఎంఎస్ (ఓబీజీ)', available_times: 'మధ్యాహ్నం 02:00 - సాయంత్రం 06:00', contact_info: '9876543212' }
        ],
        mr: [
            { id: '1', name: 'डॉ. अनिता शर्मा', specialty: 'सामान्य चिकित्सक', qualification: 'एमबीबीएस, एमडी (औषध)', available_times: 'सकाळी 09:00 - दुपारी 02:00', contact_info: '9876543210' },
            { id: '2', name: 'डॉ. राजेश पटेल', specialty: 'हृदयरोगतज्ज्ञ', qualification: 'एमबीबीएस, एमडी, डीएम (कार्डिओलॉजी)', available_times: 'सकाळी 10:00 - दुपारी 01:00', contact_info: '9876543211' },
            { id: '3', name: 'डॉ. स्नेहा गुप्ता', specialty: 'स्त्रीरोगतज्ज्ञ', qualification: 'एमबीबीएस, एमएस (ओबीजी)', available_times: 'दुपारी 02:00 - संध्याकाळी 06:00', contact_info: '9876543212' }
        ]
    };
    return data[lang] || data['en'];
};

const DoctorDirectory = () => {
    const { t, language } = useLanguage();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from('doctors').select('*');
                if (error) throw error;
                
                if (data && data.length > 0) {
                    setDoctors(data);
                } else {
                    // Dummy data for MVP localized
                    setDoctors(getLocalizedDoctors(language));
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setDoctors(getLocalizedDoctors(language));
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [language]);

    return (
        <div className="view-container active">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t('docDirectoryTitle')}</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                {t('docDirectoryDesc')}
            </p>

            {loading ? (
                <div style={{ textAlign: 'center' }}>{t('loadingDir')}</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {doctors.map(doc => (
                        <div key={doc.id} className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <div style={{ background: 'var(--accent-primary)', padding: '1rem', borderRadius: '50%', color: 'white' }}>
                                    <Stethoscope size={24} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>{doc.name}</h3>
                                    <p style={{ margin: 0, color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>{doc.specialty}</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <Award size={18} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>{t('qualifications')}</span>
                                        {doc.qualification}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <Clock size={18} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>{t('availTimings')}</span>
                                        {doc.available_times}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <Phone size={18} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>{t('contactDesk')}</span>
                                        {doc.contact_info}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorDirectory;
