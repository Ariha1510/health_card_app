import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';

const FollowUpTracking = () => {
    const { t } = useLanguage();
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [smsStatus, setSmsStatus] = useState({});

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

    const handleSendSms = (id) => {
        setSmsStatus(prev => ({ ...prev, [id]: 'sending' }));
        setTimeout(() => {
            setSmsStatus(prev => ({ ...prev, [id]: 'sent' }));
        }, 1500);
    };

    return (
        <div className="view-container active">
            <h2 style={{ marginBottom: '1.5rem' }}>{t('followUpTitle')}</h2>
            
            <div className="card-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>{t('pendingFollowUps')} ({followUps.length})</h3>
                    <input type="date" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                </div>

                {loading ? (
                    <p>{t('loadingFollowUps')}</p>
                ) : (
                    <div className="search-results-table-container">
                        <table className="search-results-table">
                            <thead>
                                <tr>
                                    <th>{t('patientName')}</th>
                                    <th>{t('phone')}</th>
                                    <th>{t('reason')}</th>
                                    <th>{t('dueDate')}</th>
                                    <th>{t('action')}</th>
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
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button 
                                                    className="btn-primary" 
                                                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                                    onClick={() => handleMarkComplete(item.id)}
                                                >
                                                    {t('markDone')}
                                                </button>
                                                <button 
                                                    className="btn-secondary" 
                                                    style={{ 
                                                        padding: '0.25rem 0.75rem', 
                                                        fontSize: '0.85rem',
                                                        backgroundColor: smsStatus[item.id] === 'sent' ? '#10b981' : '',
                                                        borderColor: smsStatus[item.id] === 'sent' ? '#10b981' : '',
                                                        color: smsStatus[item.id] === 'sent' ? 'white' : ''
                                                    }}
                                                    onClick={() => handleSendSms(item.id)}
                                                    disabled={smsStatus[item.id] === 'sending' || smsStatus[item.id] === 'sent'}
                                                >
                                                    {smsStatus[item.id] === 'sending' ? 'Sending...' : smsStatus[item.id] === 'sent' ? '✅ Sent' : '📱 SMS'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {followUps.length === 0 && (
                            <div className="table-empty-state">
                                {t('noPending')}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FollowUpTracking;
