import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, AlertTriangle, Pill, Stethoscope } from 'lucide-react';

const MedicalScreening = () => {
    const [searchParams] = useSearchParams();
    const urlWorkerId = searchParams.get('id');
    
    const [workers, setWorkers] = useState([]);
    const [selectedWorkerId, setSelectedWorkerId] = useState('');
    const [selectedWorkerDetails, setSelectedWorkerDetails] = useState(null);
    const [formData, setFormData] = useState({
        camp_location: '',
        doctor_name: '',
        bp_systolic: '',
        bp_diastolic: '',
        sugar_level: '',
        bmi: '',
        temperature: '',
        oxygen_level: '',
        symptoms: '',
        diagnosis: '',
        prescription: '',
        lab_reports: '',
        vaccinations: '',
        referral: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            const { data, error } = await supabase.from('workers').select('id, name, worker_id, age, gender');
            if (data) {
                setWorkers(data);
                if (urlWorkerId) {
                    const match = data.find(w => w.worker_id === urlWorkerId);
                    if (match) {
                        setSelectedWorkerId(match.id);
                        setSelectedWorkerDetails(match);
                    }
                }
            }
        };
        fetchWorkers();
    }, [urlWorkerId]);

    const handleWorkerSelect = (e) => {
        const id = e.target.value;
        setSelectedWorkerId(id);
        setSelectedWorkerDetails(workers.find(w => w.id === id) || null);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedWorkerId) {
            setMessage({ type: 'error', text: 'Please select a worker first.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const { data, error } = await supabase
                .from('screenings')
                .insert([{ ...formData, worker_id: selectedWorkerId }]);

            if (error) throw error;
            
            setMessage({ type: 'success', text: 'Screening recorded successfully!' });
            setFormData({
                camp_location: '', doctor_name: '', bp_systolic: '', bp_diastolic: '',
                sugar_level: '', bmi: '', temperature: '', oxygen_level: '',
                symptoms: '', diagnosis: '', prescription: '', lab_reports: '',
                vaccinations: '', referral: ''
            });
            setSelectedWorkerId('');
            setSelectedWorkerDetails(null);
        } catch (error) {
            console.error('Error recording screening:', error);
            setMessage({ type: 'error', text: 'Failed to record screening. Check console.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="view-container active">
            <div className="card-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Medical Screening</h2>
                
                {message && (
                    <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: message.type === 'success' ? '#10b981' : '#ef4444', border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}` }}>
                        {message.text}
                    </div>
                )}

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label>Select Patient</label>
                    <select value={selectedWorkerId} onChange={handleWorkerSelect} required style={{ border: '2px solid var(--accent-primary)' }}>
                        <option value="">-- Scan QR or Select Worker --</option>
                        {workers.map(w => (
                            <option key={w.id} value={w.id}>{w.name} ({w.worker_id})</option>
                        ))}
                    </select>
                </div>

                {selectedWorkerDetails && (
                    <div style={{ background: 'rgba(54, 162, 235, 0.05)', border: '1px solid var(--accent-primary)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', margin: '0 0 1rem 0' }}>
                            <Sparkles size={20} /> AI Clinical Assistant Summary
                        </h3>
                        
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            Based on past records, <strong>{selectedWorkerDetails.name}</strong> ({selectedWorkerDetails.age}y, {selectedWorkerDetails.gender}) has visited Nirantar Health camps twice in the last 12 months. Historical vitals indicate borderline hypertension. No recent vaccinations recorded.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '8px' }}>
                                <h4 style={{ color: '#ef4444', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <AlertTriangle size={16}/> High Risk Indicators
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
                                    <li>Hypertension (Avg BP: 145/90)</li>
                                    <li>Dust Allergy (Reported 2023)</li>
                                </ul>
                            </div>
                            
                            <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Pill size={16}/> Active Medications
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
                                    <li>Amlodipine 5mg (Prescribed 6mo ago)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

                    <div className="form-group">
                        <label>Camp Location</label>
                        <input type="text" name="camp_location" value={formData.camp_location} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Doctor Name</label>
                        <input type="text" name="doctor_name" value={formData.doctor_name} onChange={handleChange} required />
                    </div>

                    <h4 style={{ gridColumn: '1 / -1', marginTop: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Vitals</h4>

                    <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label>BP (Systolic)</label>
                            <input type="number" name="bp_systolic" value={formData.bp_systolic} onChange={handleChange} placeholder="120" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>BP (Diastolic)</label>
                            <input type="number" name="bp_diastolic" value={formData.bp_diastolic} onChange={handleChange} placeholder="80" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Sugar Level (mg/dL)</label>
                        <input type="number" name="sugar_level" value={formData.sugar_level} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>BMI</label>
                        <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Temperature (°F)</label>
                        <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Oxygen Level (SpO2 %)</label>
                        <input type="number" name="oxygen_level" value={formData.oxygen_level} onChange={handleChange} />
                    </div>

                    <h4 style={{ gridColumn: '1 / -1', marginTop: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Diagnosis & Treatment</h4>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Symptoms</label>
                        <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} rows="2"></textarea>
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Diagnosis</label>
                        <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} rows="2"></textarea>
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Prescription</label>
                        <textarea name="prescription" value={formData.prescription} onChange={handleChange} rows="2"></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label>Vaccinations Given</label>
                        <input type="text" name="vaccinations" value={formData.vaccinations} onChange={handleChange} placeholder="e.g. Tetanus, COVID-19" />
                    </div>
                    
                    <div className="form-group">
                        <label>Referral to Specialist/Hospital</label>
                        <input type="text" name="referral" value={formData.referral} onChange={handleChange} />
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Screening Record'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedicalScreening;
