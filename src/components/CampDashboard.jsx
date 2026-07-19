import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Users, Activity, Heart, Shield } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CampDashboard = () => {
    const { t } = useLanguage();
    // Dummy Data for now until DB is populated
    const stats = {
        totalRegistered: 248,
        females: 105,
        children: 22,
        highBP: 42,
        diabetes: 19,
        pregnant: 8,
        vaccinated: 172
    };

    const ageData = {
        labels: ['19-30', '31-45', '46-60', '60+'],
        datasets: [
            {
                label: t('patients'),
                data: [45, 50, 25, 8],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
            }
        ]
    };

    const conditionData = {
        labels: [t('normal'), t('highBP'), t('diabetes')],
        datasets: [
            {
                data: [187, 42, 19],
                backgroundColor: [
                    '#81C784',
                    '#EF6C00',
                    '#8E24AA',
                ],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        color: '#ffffff',
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff'
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#ffffff' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            },
            y: {
                ticks: { color: '#ffffff' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    };

    const doughnutOptions = {
        cutout: '75%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return ' ' + context.label + ': ' + context.raw;
                    }
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="view-container active dashboard-view">
            <h2 style={{ marginBottom: '0.5rem' }}>{t('dashboardTitle')}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{t('dashboardSubtitle')}</p>
            
            <div className="dashboard-analytics-grid" style={{ marginBottom: '2rem' }}>
                <div className="analytics-card">
                    <div className="analytics-icon"><Users size={24} /></div>
                    <div className="analytics-info">
                        <h4>{t('totalRegistered')}</h4>
                        <p className="analytics-number">{stats.totalRegistered}</p>
                    </div>
                </div>
                <div className="analytics-card warning">
                    <div className="analytics-icon"><Activity size={24} /></div>
                    <div className="analytics-info">
                        <h4>{t('highBpCases')}</h4>
                        <p className="analytics-number">{stats.highBP}</p>
                    </div>
                </div>
                <div className="analytics-card success">
                    <div className="analytics-icon"><Shield size={24} /></div>
                    <div className="analytics-info">
                        <h4>{t('vaccinated')}</h4>
                        <p className="analytics-number">{stats.vaccinated}</p>
                    </div>
                </div>
                <div className="analytics-card info">
                    <div className="analytics-icon"><Heart size={24} /></div>
                    <div className="analytics-info">
                        <h4>{t('diabetes')}</h4>
                        <p className="analytics-number">{stats.diabetes}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div className="card-panel" style={{ flex: '1', minWidth: '300px' }}>
                    <h3 style={{ color: 'white' }}>{t('demographics')}</h3>
                    <Bar data={ageData} options={chartOptions} />
                </div>
                
                <div className="card-panel" style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ color: 'white', margin: '0 0 4px 0' }}>{t('healthStatus')}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{t('patientDistribution')}</p>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                        <div style={{ flex: 1, background: 'rgba(239, 108, 0, 0.1)', border: '1px solid rgba(239, 108, 0, 0.3)', borderRadius: '8px', padding: '12px 8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#EF6C00', marginBottom: '6px', fontWeight: 'bold' }}>❤️ {t('highBP')}</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white' }}>42</div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(142, 36, 170, 0.1)', border: '1px solid rgba(142, 36, 170, 0.3)', borderRadius: '8px', padding: '12px 8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#8E24AA', marginBottom: '6px', fontWeight: 'bold' }}>🩸 {t('diabetes')}</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white' }}>19</div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(129, 199, 132, 0.1)', border: '1px solid rgba(129, 199, 132, 0.3)', borderRadius: '8px', padding: '12px 8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#81C784', marginBottom: '6px', fontWeight: 'bold' }}>✅ {t('normal')}</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white' }}>187</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                        {/* Doughnut Chart */}
                        <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
                            <Doughnut data={conditionData} options={doughnutOptions} />
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', lineHeight: '1', marginBottom: '4px' }}>248</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('patients')}</div>
                            </div>
                        </div>
                        
                        {/* Custom Legend */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#81C784' }}></span>
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>{t('normal')} <span style={{color: 'var(--text-muted)', fontWeight: 'normal'}}>(187)</span></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 'bold' }}>76%</span>
                                    <span style={{ color: '#10b981', fontSize: '0.8rem' }}>▲ +4%</span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF6C00' }}></span>
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>{t('highBP')} <span style={{color: 'var(--text-muted)', fontWeight: 'normal'}}>(42)</span></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 'bold' }}>16%</span>
                                    <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>▲ +6%</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#8E24AA' }}></span>
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>{t('diabetes')} <span style={{color: 'var(--text-muted)', fontWeight: 'normal'}}>(19)</span></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 'bold' }}>8%</span>
                                    <span style={{ color: '#10b981', fontSize: '0.8rem' }}>▼ -2%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDashboard;
