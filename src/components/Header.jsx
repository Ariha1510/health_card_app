import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isOffline, setIsOffline] = useState(false);

    return (
        <header>
            <div className="header-container">
                <div className="logo-section">
                    <div className="logo-icon">N</div>
                    <div className="logo-text">
                        <h1>Nirantar Health</h1>
                        <p>Continuity of Care Network</p>
                    </div>
                </div>
                <nav className="nav-links">
                    <NavLink to="/" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/worker" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Worker Passport
                    </NavLink>
                    <NavLink to="/register" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Register
                    </NavLink>
                    <NavLink to="/screening" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Screening
                    </NavLink>
                    <NavLink to="/follow-ups" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Follow-ups
                    </NavLink>
                    <NavLink to="/search" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Search
                    </NavLink>
                    <NavLink to="/doctors" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Doctors
                    </NavLink>
                    <NavLink to="/reports" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        Reports
                    </NavLink>
                    <NavLink to="/scanner" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
                        QR Scan
                    </NavLink>
                </nav>

                <div className="header-controls" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ padding: '5px', borderRadius: '4px', background: '#000000', color: '#ffffff', border: '1px solid var(--border-color)' }}
                    >
                        <option value="en">English</option>
                        <option value="hi">हिंदी (Hindi)</option>
                        <option value="bn">বাংলা (Bengali)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="te">తెలుగు (Telugu)</option>
                        <option value="mr">मराठी (Marathi)</option>
                    </select>

                    <div className="offline-toggle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                            <input
                                type="checkbox"
                                checked={isOffline}
                                onChange={(e) => setIsOffline(e.target.checked)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: isOffline ? '#ef4444' : '#10b981',
                                transition: '.4s', borderRadius: '20px'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '2px', bottom: '2px',
                                    backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                                    transform: isOffline ? 'translateX(20px)' : 'translateX(0)'
                                }}></span>
                            </span>
                        </label>
                        <span style={{ fontSize: '0.9rem', color: isOffline ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                            {isOffline ? t('offline') : t('online')}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
