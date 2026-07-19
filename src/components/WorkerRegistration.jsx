import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';
import QRCode from 'react-qr-code';

const WorkerRegistration = () => {
    const { t } = useLanguage();
    const [workerId, setWorkerId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        blood_group: '',
        phone: '',
        emergency_contact: '',
        address: '',
        occupation: '',
        employer: '',
        worksite: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Aadhaar State
    const [aadhaar, setAadhaar] = useState('');
    const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');

    // WhatsApp State
    const [sendingWhatsApp, setSendingWhatsApp] = useState(false);
    const [isWhatsAppSent, setIsWhatsAppSent] = useState(false);

    React.useEffect(() => {
        // Generate an initial random worker ID
        setWorkerId('W' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { data, error } = await supabase
                .from('workers')
                .insert([{ ...formData, worker_id: workerId }]);

            if (error) throw error;
            
            setMessage({ type: 'success', text: 'Worker registered successfully!', workerId: workerId });
            setFormData({
                name: '', age: '', gender: '', blood_group: '', phone: '',
                emergency_contact: '', address: '', occupation: '', employer: '', worksite: ''
            });
            // Generate a new ID for the next registration
            setWorkerId('W' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));
        } catch (error) {
            console.error('Error inserting worker:', error);
            setMessage({ type: 'error', text: 'Failed to register worker. Check console.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSendWhatsApp = () => {
        setSendingWhatsApp(true);
        // Simulate network delay
        setTimeout(() => {
            setSendingWhatsApp(false);
            setIsWhatsAppSent(true);
        }, 1500);
    };

    const handleAadhaarVerifyClick = (e) => {
        e.preventDefault();
        if (aadhaar.length === 12) {
            setShowOtpModal(true);
        } else {
            setMessage({ type: 'error', text: 'Please enter a valid 12-digit Aadhaar number.' });
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp.length > 3) {
            setShowOtpModal(false);
            setIsAadhaarVerified(true);
            setFormData(prev => ({
                ...prev,
                name: 'Rahul Kumar',
                age: '34',
                gender: 'Male',
                address: '14, Example Street, New Delhi'
            }));
            setMessage({ type: 'success', text: t('aadhaarVerified') || 'Aadhaar Verified Successfully!' });
        } else {
            setMessage({ type: 'error', text: 'Invalid OTP' });
        }
    };

    return (
        <div className="view-container active">
            <div className="card-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t('regTitle')}</h2>
                
                <div style={{ padding: '1rem', marginBottom: '2rem', background: 'rgba(54, 162, 235, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>{t('autoAssignedId')}</p>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)', letterSpacing: '2px', marginTop: '0.5rem' }}>
                        {workerId}
                    </div>
                </div>

                {message && message.type === 'success' && (
                    <div style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', textAlign: 'center' }}>
                        <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>✅ {t('regSuccess')}</h3>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>{t('uniqueHealthId')}</p>
                        
                        <div style={{ background: 'white', padding: '1.5rem', display: 'inline-block', borderRadius: '12px', marginBottom: '1rem' }}>
                            <QRCode value={message.workerId} size={150} />
                        </div>
                        <br/>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px', padding: '0.5rem 1rem', background: 'var(--surface-color)', borderRadius: '8px', display: 'inline-block', border: '1px dashed var(--border-color)', marginBottom: '1rem' }}>
                            {message.workerId}
                        </div>
                        
                        <div style={{ marginTop: '1rem' }}>
                            <button 
                                type="button" 
                                className="btn-primary" 
                                onClick={handleSendWhatsApp}
                                disabled={sendingWhatsApp || isWhatsAppSent}
                                style={{ 
                                    backgroundColor: isWhatsAppSent ? '#10b981' : '#25D366', 
                                    borderColor: isWhatsAppSent ? '#10b981' : '#25D366',
                                    color: 'white',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {sendingWhatsApp ? 'Sending...' : isWhatsAppSent ? `✅ Sent to ${formData.phone || '+91-XXXXX'}` : '📱 Send Digital Card via WhatsApp'}
                            </button>
                        </div>
                    </div>
                )}
                
                {message && message.type === 'error' && (
                    <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }}>
                        {message.text}
                    </div>
                )}

                {/* Aadhaar eKYC Verification Section */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div className="form-group">
                        <label>{t('aadhaarNumber') || 'Aadhaar Number (12 Digits)'}</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input 
                                type="text" 
                                value={aadhaar} 
                                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                placeholder="XXXX XXXX XXXX"
                                disabled={isAadhaarVerified}
                                style={{ flex: 1 }}
                            />
                            <button 
                                type="button" 
                                className="btn-secondary"
                                onClick={handleAadhaarVerifyClick}
                                disabled={isAadhaarVerified || aadhaar.length !== 12}
                                style={{
                                    backgroundColor: isAadhaarVerified ? '#10b981' : '',
                                    borderColor: isAadhaarVerified ? '#10b981' : '',
                                    color: isAadhaarVerified ? 'white' : ''
                                }}
                            >
                                {isAadhaarVerified ? '✓ ' + (t('aadhaarVerified') || 'Verified') : (t('verifyAadhaar') || 'Verify via OTP')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* OTP Modal */}
                {showOtpModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ backgroundColor: 'var(--bg-card, #112a32)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--accent-primary)', width: '90%', maxWidth: '400px' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'white' }}>{t('enterOtp') || 'Enter OTP'}</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>An OTP has been sent to the mobile number registered with Aadhaar ending in {aadhaar.slice(-4)}.</p>
                            <form onSubmit={handleOtpSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="123456"
                                        style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px' }}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                                    <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>{t('submitOtp') || 'Submit'}</button>
                                    <button type="button" className="btn-secondary" onClick={() => setShowOtpModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>{t('fullName')}</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>{t('age')}</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>{t('gender')}</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">{t('selectGender')}</option>
                            <option value="Male">{t('male')}</option>
                            <option value="Female">{t('female')}</option>
                            <option value="Other">{t('other')}</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>{t('bloodGroup')}</label>
                        <select name="blood_group" value={formData.blood_group} onChange={handleChange}>
                            <option value="">{t('selectBloodGroup')}</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>{t('phoneNum')}</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>{t('emergencyContact')}</label>
                        <input type="tel" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} required />
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>{t('homeAddress')}</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows="2" required></textarea>
                    </div>

                    <div className="form-group">
                        <label>{t('occupation')}</label>
                        <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>{t('employer')}</label>
                        <input type="text" name="employer" value={formData.employer} onChange={handleChange} />
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>{t('worksiteLoc')}</label>
                        <input type="text" name="worksite" value={formData.worksite} onChange={handleChange} />
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            {loading ? t('registering') : t('regWorkerBtn')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkerRegistration;
