import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FileText, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Reports = () => {
    const { t } = useLanguage();
    const generateDailyReport = () => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(18);
        doc.text('Nirantar Health - Daily Camp Report', 14, 22);
        
        doc.setFontSize(11);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Location: Sector 45 Construction Site`, 14, 36);

        // Summary
        doc.setFontSize(14);
        doc.text('Summary', 14, 50);
        
        doc.autoTable({
            startY: 55,
            head: [['Metric', 'Count']],
            body: [
                ['Total Workers Registered', '145'],
                ['Total Screenings Conducted', '130'],
                ['High BP Cases Detected', '24'],
                ['Diabetes Cases Detected', '11'],
                ['Vaccinations Administered', '102'],
                ['Referrals Made', '5']
            ],
            theme: 'grid',
            headStyles: { fillColor: [16, 185, 129] }
        });

        doc.save('daily_camp_report.pdf');
    };

    return (
        <div className="view-container active">
            <h2 style={{ marginBottom: '1.5rem' }}>{t('reportsTitle')}</h2>
            
            <div className="action-grid" style={{ marginTop: '1.5rem' }}>
                <div className="action-card generate" style={{ textAlign: 'center', padding: '2rem' }}>
                    <div className="action-card-icon" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <FileText size={48} color="var(--accent-primary)" />
                    </div>
                    <h3>{t('dailyCampReport')}</h3>
                    <p>{t('dailyCampDesc')}</p>
                    <button className="btn-primary" style={{ margin: '1rem auto 0' }} onClick={generateDailyReport}>
                        <Download size={18} style={{ marginRight: '8px' }} />
                        {t('downloadPdf')}
                    </button>
                </div>

                <div className="action-card scan" style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}>
                    <div className="action-card-icon" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <FileText size={48} color="var(--accent-secondary)" />
                    </div>
                    <h3>{t('monthlyDistReport')}</h3>
                    <p>{t('monthlyDistDesc')}</p>
                    <button className="btn-secondary" style={{ margin: '1rem auto 0' }} disabled>
                        {t('comingSoon')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
