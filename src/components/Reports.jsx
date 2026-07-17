import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FileText, Download } from 'lucide-react';

const Reports = () => {
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
            <h2 style={{ marginBottom: '1.5rem' }}>Reports & Analytics</h2>
            
            <div className="action-grid" style={{ marginTop: '1.5rem' }}>
                <div className="action-card generate" style={{ textAlign: 'center', padding: '2rem' }}>
                    <div className="action-card-icon" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <FileText size={48} color="var(--accent-primary)" />
                    </div>
                    <h3>Daily Camp Report</h3>
                    <p>Generate a PDF summary of today's registrations and screenings.</p>
                    <button className="btn-primary" style={{ margin: '1rem auto 0' }} onClick={generateDailyReport}>
                        <Download size={18} style={{ marginRight: '8px' }} />
                        Download PDF
                    </button>
                </div>

                <div className="action-card scan" style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}>
                    <div className="action-card-icon" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <FileText size={48} color="var(--accent-secondary)" />
                    </div>
                    <h3>Monthly District Report</h3>
                    <p>Aggregate data across all camps in the district for the month.</p>
                    <button className="btn-secondary" style={{ margin: '1rem auto 0' }} disabled>
                        Coming Soon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
