import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import QRCode from 'react-qr-code';
import { User, Calendar, FileText, AlertCircle, Phone, MapPin, Activity } from 'lucide-react';

const WorkerDashboard = () => {
    const [workerId, setWorkerId] = useState(localStorage.getItem('myWorkerId') || '');
    const [inputId, setInputId] = useState('');
    const [worker, setWorker] = useState(null);
    const [screenings, setScreenings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (workerId) {
            fetchWorkerData(workerId);
        }
    }, [workerId]);

    const fetchWorkerData = async (id) => {
        setLoading(true);
        setError('');
        try {
            const { data: workerData, error: workerError } = await supabase
                .from('workers')
                .select('*')
                .eq('worker_id', id)
                .single();

            if (workerError || !workerData) {
                setError('Health ID not found. Please check and try again.');
                setWorker(null);
                localStorage.removeItem('myWorkerId');
                setWorkerId('');
                return;
            }

            setWorker(workerData);
            localStorage.setItem('myWorkerId', id);

            const { data: screeningData } = await supabase
                .from('screenings')
                .select('*')
                .eq('worker_id', workerData.id)
                .order('created_at', { ascending: false });

            setScreenings(screeningData || []);
        } catch (err) {
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputId.trim()) {
            setWorkerId(inputId.trim().toUpperCase());
        }
    };

    if (!worker && !loading && !error && !workerId) {
        return (
            <div className="view-container active" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="card-panel" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Welcome, Worker!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please enter your unique Health ID to access your digital health passport.</p>
                    <form onSubmit={handleSearch}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="e.g. W123456" 
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            View My Profile
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="view-container active">
            {loading && <p style={{ textAlign: 'center' }}>Loading your health passport...</p>}
            {error && (
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', textAlign: 'center', marginBottom: '2rem' }}>
                    {error} <br/>
                    <button onClick={() => setWorkerId('')} style={{ marginTop: '1rem', padding: '5px 10px', background: 'transparent', border: '1px solid currentColor', color: 'inherit', borderRadius: '4px', cursor: 'pointer' }}>Try Again</button>
                </div>
            )}

            {worker && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Left Column: QR and Basics */}
                    <div className="card-panel" style={{ textAlign: 'center' }}>
                        <div style={{ background: 'white', padding: '1.5rem', display: 'inline-block', borderRadius: '12px', marginBottom: '1.5rem' }}>
                            <QRCode value={worker.worker_id} size={180} />
                        </div>
                        <h2 style={{ margin: '0 0 0.5rem 0' }}>{worker.name}</h2>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
                            {worker.worker_id}
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', background: 'var(--background-color)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><User size={18} color="var(--text-muted)"/> {worker.age} yrs • {worker.gender} • {worker.blood_group || 'N/A'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={18} color="var(--text-muted)"/> {worker.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={18} color="var(--text-muted)"/> {worker.worksite || 'N/A'}</div>
                        </div>
                        
                        <button onClick={() => setWorkerId('')} style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>
                            Switch ID
                        </button>
                    </div>

                    {/* Right Column: History */}
                    <div>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Activity size={24} color="var(--accent-primary)" /> Medical Timeline
                        </h2>
                        
                        {screenings.length === 0 ? (
                            <div className="card-panel" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                No medical history found.
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {screenings.map(s => (
                                    <div key={s.id} className="card-panel" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 5px 0', color: 'var(--accent-primary)' }}>Camp: {s.camp_location || 'General'}</h4>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Dr. {s.doctor_name || 'Unknown'}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                <Calendar size={16} /> {new Date(s.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ background: 'var(--background-color)', padding: '0.75rem', borderRadius: '6px' }}>
                                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Vitals</span>
                                                <strong>BP:</strong> {s.bp_systolic}/{s.bp_diastolic} <br/>
                                                <strong>Sugar:</strong> {s.sugar_level}
                                            </div>
                                            <div style={{ background: 'var(--background-color)', padding: '0.75rem', borderRadius: '6px' }}>
                                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Diagnosis</span>
                                                {s.diagnosis || 'None'}
                                            </div>
                                        </div>

                                        {s.prescription && (
                                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                                <h5 style={{ margin: '0 0 8px 0', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <FileText size={16}/> Prescription
                                                </h5>
                                                <p style={{ margin: 0, fontSize: '0.9rem' }}>{s.prescription}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerDashboard;
