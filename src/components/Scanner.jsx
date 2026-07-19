import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Scanner = () => {
    const { t } = useLanguage();
    const [scannedId, setScannedId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            false
        );
        
        scanner.render(
            (decodedText) => {
                // We expect the QR code to just be the worker ID (e.g. W123456)
                if (decodedText && decodedText.startsWith('W')) {
                    setScannedId(decodedText);
                    scanner.clear();
                    
                    // Navigate to screening page with the ID pre-filled
                    navigate(`/screening?id=${decodedText}`);
                } else {
                    alert(t('invalidQR'));
                }
            }, 
            (error) => {}
        );

        return () => {
            scanner.clear().catch(error => console.error(error));
        };
    }, [navigate]);

    return (
        <div className="view-container active">
            <div className="card-panel" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <h2>{t('scanPatientQR')}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    {t('scanQRHelp')}
                </p>
                <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '12px' }}>
                    <div id="reader" style={{ width: '100%', border: 'none' }}></div>
                </div>
                {scannedId && (
                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px' }}>
                        {t('scanSuccess')} {scannedId} <br/> {t('redirecting')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scanner;
