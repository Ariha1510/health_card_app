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
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px', padding: '0.5rem 1rem', background: 'var(--surface-color)', borderRadius: '8px', display: 'inline-block', border: '1px dashed var(--border-color)' }}>
                            {message.workerId}
                        </div>
                    </div>
                )}
                
                {message && message.type === 'error' && (
                    <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }}>
                        {message.text}
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
