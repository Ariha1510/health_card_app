import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const FollowUpTracking = () => {
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowUps = async () => {
            setLoading(true);
            try {
                // In a real app, you'd join with workers table. 
                // For now, we mock some data if none exists, or fetch real data.
                const { data, error } = await supabase
                    .from('follow_ups')
                    .select(`
                        id,
                        reason,
                        due_date,
                        status,
                        workers ( name, phone )
                    `)
                    .eq('status', 'pending');
                    
                if (error) throw error;
                
                // If we have data, use it. Otherwise, provide some dummy data for preview.
                if (data && data.length > 0) {
                    setFollowUps(data);
                } else {
                    setFollowUps([
                        { id: '1', reason: 'High Blood Pressure Check', due_date: '2023-11-20', status: 'pending', workers: { name: 'Ramesh Kumar', phone: '9876543210' } },
                        { id: '2', reason: 'Diabetes Medication Refill', due_date: '2023-11-22', status: 'pending', workers: { name: 'Sunita Devi', phone: '9876543211' } },
                        { id: '3', reason: 'Tetanus Booster', due_date: '2023-11-25', status: 'pending', workers: { name: 'Arjun Singh', phone: '9876543212' } },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching follow-ups:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowUps();
    }, []);

    const handleMarkComplete = async (id) => {
        // In a real app, update Supabase status
        // await supabase.from('follow_ups').update({ status: 'completed' }).eq('id', id);
        setFollowUps(followUps.filter(f => f.id !== id));
    };

    return (
        <div className="view-container active">
            <h2 style={{ marginBottom: '1.5rem' }}>Follow-up Tracking</h2>
            
            <div className="card-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>Pending Follow-ups ({followUps.length})</h3>
                    <input type="date" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                </div>

                {loading ? (
                    <p>Loading follow-ups...</p>
                ) : (
                    <div className="search-results-table-container">
                        <table className="search-results-table">
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Phone</th>
                                    <th>Reason</th>
                                    <th>Due Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {followUps.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.workers?.name}</td>
                                        <td>{item.workers?.phone}</td>
                                        <td><span style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>{item.reason}</span></td>
                                        <td>{new Date(item.due_date).toLocaleDateString()}</td>
                                        <td>
                                            <button 
                                                className="btn-primary" 
                                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                                onClick={() => handleMarkComplete(item.id)}
                                            >
                                                Mark Done
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {followUps.length === 0 && (
                            <div className="table-empty-state">
                                No pending follow-ups for this period.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FollowUpTracking;
