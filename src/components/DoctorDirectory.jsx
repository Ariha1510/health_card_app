import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Stethoscope, Clock, Phone, Award } from 'lucide-react';

const DoctorDirectory = () => {
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
                    // Dummy data for MVP
                    setDoctors([
                        { id: '1', name: 'Dr. Anita Sharma', specialty: 'General Physician', qualification: 'MBBS, MD (Medicine)', available_times: '09:00 AM - 02:00 PM', contact_info: '9876543210' },
                        { id: '2', name: 'Dr. Rajesh Patel', specialty: 'Cardiologist', qualification: 'MBBS, MD, DM (Cardiology)', available_times: '10:00 AM - 01:00 PM', contact_info: '9876543211' },
                        { id: '3', name: 'Dr. Sneha Gupta', specialty: 'Gynecologist', qualification: 'MBBS, MS (OBG)', available_times: '02:00 PM - 06:00 PM', contact_info: '9876543212' },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="view-container active">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Camp Doctor Directory</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                View available medical professionals, their qualifications, and schedule.
            </p>

            {loading ? (
                <div style={{ textAlign: 'center' }}>Loading directory...</div>
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
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Qualifications</span>
                                        {doc.qualification}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <Clock size={18} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Available Timings</span>
                                        {doc.available_times}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <Phone size={18} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Contact Desk</span>
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
