import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
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
import { Bar, Pie } from 'react-chartjs-2';
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
    // Dummy Data for now until DB is populated
    const stats = {
        totalRegistered: 145,
        females: 53,
        children: 17,
        highBP: 24,
        diabetes: 11,
        pregnant: 8,
        vaccinated: 102
    };

    const ageData = {
        labels: ['0-18', '19-30', '31-45', '46-60', '60+'],
        datasets: [
            {
                label: 'Workers by Age Group',
                data: [17, 45, 50, 25, 8],
                backgroundColor: 'rgba(54, 162, 235, 0.8)', // Brighter blue
            }
        ]
    };

    const conditionData = {
        labels: ['High BP', 'Diabetes', 'Normal'],
        datasets: [
            {
                data: [24, 11, 110],
                backgroundColor: [
                    'rgba(255, 69, 96, 0.9)',   // Brighter red/pink
                    'rgba(254, 176, 25, 0.9)',  // Brighter orange/yellow
                    'rgba(0, 227, 150, 0.9)',   // Brighter green
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        color: '#ffffff', // White text for legends and titles
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

    const pieOptions = {
        color: '#ffffff',
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff'
                }
            }
        }
    };

    return (
        <div className="view-container active dashboard-view">
            <h2 style={{ marginBottom: '0.5rem' }}>Government & NGO Dashboard</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Continuity of Care Network Analytics</p>
            
            <div className="dashboard-analytics-grid" style={{ marginBottom: '2rem' }}>
                <div className="analytics-card">
                    <div className="analytics-icon"><Users size={24} /></div>
                    <div className="analytics-info">
                        <h4>Total Registered</h4>
                        <p className="analytics-number">{stats.totalRegistered}</p>
                    </div>
                </div>
                <div className="analytics-card warning">
                    <div className="analytics-icon"><Activity size={24} /></div>
                    <div className="analytics-info">
                        <h4>High BP Cases</h4>
                        <p className="analytics-number">{stats.highBP}</p>
                    </div>
                </div>
                <div className="analytics-card success">
                    <div className="analytics-icon"><Shield size={24} /></div>
                    <div className="analytics-info">
                        <h4>Vaccinated</h4>
                        <p className="analytics-number">{stats.vaccinated}</p>
                    </div>
                </div>
                <div className="analytics-card info">
                    <div className="analytics-icon"><Heart size={24} /></div>
                    <div className="analytics-info">
                        <h4>Diabetes</h4>
                        <p className="analytics-number">{stats.diabetes}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div className="card-panel" style={{ flex: '1', minWidth: '300px' }}>
                    <h3 style={{ color: 'white' }}>Demographics</h3>
                    <Bar data={ageData} options={chartOptions} />
                </div>
                <div className="card-panel" style={{ flex: '1', minWidth: '300px' }}>
                    <h3 style={{ color: 'white' }}>Health Conditions</h3>
                    <div style={{ width: '60%', margin: '0 auto' }}>
                        <Pie data={conditionData} options={pieOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDashboard;
