// Nirantar Health Card - System Logic (100% Client-Side / Offline)

const CONFIG = {
    SECRET_KEY: "NirantarHealthSecretKey2026",
    VERSION: "V1"
};

// Vocabulary mappings for token compression
const DICTIONARY = {
    conditions: {
        'DIA': 'Diabetes',
        'HYP': 'Hypertension',
        'AST': 'Asthma',
        'CAR': 'Cardiac Condition',
        'TB':  'Tuberculosis',
        'EPI': 'Epilepsy',
        'OTH': 'Other Chronic Condition'
    },
    vaccines: {
        'T': 'Tetanus',
        'C': 'COVID-19',
        'B': 'BCG (Tuberculosis)',
        'H': 'Hepatitis B'
    }
};

// State Variables
let html5QrCode = null;

document.addEventListener('DOMContentLoaded', () => {
    // Navigation setup
    setupNavigation();
    
    // Generator setups
    setupGenerator();
    
    // Scanner setups
    setupScanner();
});

// Navigation Controller
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewContainers = document.querySelectorAll('.view-container');
    const actionCards = document.querySelectorAll('.action-card');

    const switchView = (targetViewId) => {
        // Toggle Nav Buttons
        navButtons.forEach(btn => {
            if (btn.dataset.target === targetViewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Toggle Views
        viewContainers.forEach(container => {
            if (container.id === targetViewId) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        });

        // Handle camera scanner life cycle
        if (targetViewId !== 'scanner-view') {
            stopScanning();
        }
    };

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.target));
    });

    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.classList.contains('generate') ? 'generator-view' : 'scanner-view';
            switchView(target);
            if (target === 'scanner-view') {
                startScanning();
            }
        });
    });

    // Airplane mode toggle simulation
    const airplaneToggle = document.getElementById('airplane-toggle');
    airplaneToggle.addEventListener('click', () => {
        airplaneToggle.classList.toggle('active');
        const active = airplaneToggle.classList.contains('active');
        airplaneToggle.innerHTML = active ? '✈️ Offline Mode ACTIVE' : '🌐 Simulate Offline';
        const indicator = document.querySelector('.status-bar');
        if (active) {
            indicator.style.backgroundColor = 'rgba(244, 63, 94, 0.15)';
            indicator.style.borderBottomColor = 'rgba(244, 63, 94, 0.25)';
            indicator.querySelector('.status-dot').style.backgroundColor = 'var(--accent-warning)';
            indicator.querySelector('span').innerText = 'System Running in 100% Offline (Airplane Mode) - No Remote Logs';
        } else {
            indicator.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
            indicator.style.borderBottomColor = 'rgba(16, 185, 129, 0.2)';
            indicator.querySelector('.status-dot').style.backgroundColor = 'var(--accent-success)';
            indicator.querySelector('span').innerText = 'System Running Offline (ABHA Last-Mile Sandbox)';
        }
    });
}

// ==========================================
// 🛠️ DATA COMPRESSION & ENCRYPTION ENGINE
// ==========================================

function compressData(profile) {
    // 1. Demographics: Name, Age, Gender
    const name = profile.name.trim().replace(/\|/g, ''); // strip delimiters
    const age = parseInt(profile.age) || 0;
    const gender = profile.gender || 'O';

    // 2. Blood Group
    const blood = profile.bloodGroup || 'O+';

    // 3. Chronic Conditions (Tokenized list)
    const condTokens = profile.conditions.join(',');

    // 4. Allergies (Free text to tokens or cleaned string)
    const allergies = profile.allergies.trim().toUpperCase().replace(/\|/g, '');

    // 5. Vaccinations (Tokenized list e.g. T25,C22)
    const vaccineTokens = profile.vaccines.map(v => `${v.code}${v.year}`).join(',');

    // Construct Payload: V1|Name|Age|Gender|Blood|Conditions|Allergies|Vaccinations
    const rawPayload = [
        CONFIG.VERSION,
        name,
        age,
        gender,
        blood,
        condTokens || 'NONE',
        allergies || 'NONE',
        vaccineTokens || 'NONE'
    ].join('|');

    console.log("Raw Payload:", rawPayload);
    console.log("Raw Payload size:", rawPayload.length, "bytes");

    // Encrypt payload using AES
    const encrypted = CryptoJS.AES.encrypt(rawPayload, CONFIG.SECRET_KEY).toString();
    console.log("Encrypted string:", encrypted);
    return encrypted;
}

function decompressData(encryptedPayload) {
    try {
        // Decrypt payload
        const bytes = CryptoJS.AES.decrypt(encryptedPayload, CONFIG.SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedText || !decryptedText.startsWith(CONFIG.VERSION + '|')) {
            throw new Error("Invalid decryption or unsupported format version");
        }

        const parts = decryptedText.split('|');
        if (parts.length < 8) {
            throw new Error("Corrupted or incomplete data payload");
        }

        const [version, name, age, gender, blood, condTokens, allergyText, vaccineTokens] = parts;

        // Map Chronic Conditions back to full labels
        const conditions = condTokens === 'NONE' ? [] : condTokens.split(',').map(token => {
            return DICTIONARY.conditions[token] || token;
        });

        // Map Allergies
        const allergies = allergyText === 'NONE' ? [] : allergyText.split(',').map(s => s.trim());

        // Map Vaccinations back to full names and years
        const vaccines = vaccineTokens === 'NONE' ? [] : vaccineTokens.split(',').map(token => {
            const code = token.charAt(0);
            const yearStr = token.substring(1);
            const name = DICTIONARY.vaccines[code] || 'Unknown Vaccine';
            const year = '20' + yearStr;
            return { name, year };
        });

        return {
            name,
            age: parseInt(age),
            gender,
            bloodGroup: blood,
            conditions,
            allergies,
            vaccines
        };

    } catch (e) {
        console.error("Decompress Error:", e);
        return null;
    }
}

// ==========================================
// 💻 GENERATOR SCREEN LOGIC
// ==========================================

function setupGenerator() {
    const form = document.getElementById('generation-form');
    const qrCanvas = document.getElementById('qr-canvas');
    const downloadBtn = document.getElementById('download-card-btn');
    const printBtn = document.getElementById('print-card-btn');
    
    // Dynamic preview binding
    const inputs = ['worker-name', 'worker-age', 'worker-gender', 'worker-blood'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', updateCardPreviewText);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect Form Data
        const name = document.getElementById('worker-name').value;
        const age = document.getElementById('worker-age').value;
        const gender = document.getElementById('worker-gender').value;
        const bloodGroup = document.getElementById('worker-blood').value;

        // Conditions checkboxes
        const conditions = [];
        document.querySelectorAll('input[name="conditions"]:checked').forEach(cb => {
            conditions.push(cb.value);
        });

        // Allergies
        const allergies = document.getElementById('worker-allergies').value;

        // Vaccinations (Get selected and map to token model)
        const vaccines = [];
        const vaccineCheckboxes = [
            { id: 'vaccine-tetanus', code: 'T', yearId: 'year-tetanus' },
            { id: 'vaccine-covid', code: 'C', yearId: 'year-covid' },
            { id: 'vaccine-bcg', code: 'B', yearId: 'year-bcg' },
            { id: 'vaccine-hepb', code: 'H', yearId: 'year-hepb' }
        ];

        vaccineCheckboxes.forEach(v => {
            if (document.getElementById(v.id).checked) {
                const yearVal = document.getElementById(v.yearId).value;
                const shortYear = yearVal.slice(-2); // get last 2 digits of year (e.g. 2025 -> 25)
                vaccines.push({ code: v.code, year: shortYear });
            }
        });

        const profile = { name, age, gender, bloodGroup, conditions, allergies, vaccines };

        // Compress and encrypt
        const encrypted = compressData(profile);

        // Generate QR code directly on the canvas
        QRCode.toCanvas(qrCanvas, encrypted, {
            width: 140,
            margin: 1,
            errorCorrectionLevel: 'M',
            color: {
                dark: '#0f172a',
                light: '#ffffff'
            }
        }, (error) => {
            if (error) {
                console.error(error);
                alert("Failed to compile QR code: " + error.message);
                return;
            }
            console.log("QR Code drawn successfully!");
            document.getElementById('card-preview-container').style.display = 'block';
            
            // Scroll to preview
            document.getElementById('card-preview-container').scrollIntoView({ behavior: 'smooth' });
        });
    });

    downloadBtn.addEventListener('click', () => {
        // Download card as PNG
        const cardFrame = document.getElementById('id-card-frame');
        
        // Use html2canvas or render card to canvas for download (Simple fallback download QR only or tell worker to print)
        // Here we can trigger print stylesheet easily for premium experience
        window.print();
    });

    printBtn.addEventListener('click', () => {
        window.print();
    });
}

function updateCardPreviewText() {
    const name = document.getElementById('worker-name').value || "Worker Name";
    const age = document.getElementById('worker-age').value || "--";
    const gender = document.getElementById('worker-gender').value || "-";
    const blood = document.getElementById('worker-blood').value || "--";

    document.getElementById('preview-name').innerText = name;
    document.getElementById('preview-meta').innerText = `${gender} | ${age} Years`;
    document.getElementById('preview-blood').innerText = blood;
}

// ==========================================
// 🎥 CAMERA SCANNER LOGIC
// ==========================================

function setupScanner() {
    const startScanBtn = document.getElementById('start-scan-btn');
    const stopScanBtn = document.getElementById('stop-scan-btn');
    const fileInput = document.getElementById('qr-file-input');
    const resetScanBtn = document.getElementById('reset-scan-btn');

    startScanBtn.addEventListener('click', startScanning);
    stopScanBtn.addEventListener('click', stopScanning);
    resetScanBtn.addEventListener('click', resetScannerUI);

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length === 0) return;
        const file = e.target.files[0];
        
        if (!html5QrCode) {
            html5QrCode = new Html5Qrcode("reader");
        }

        html5QrCode.scanFile(file, true)
            .then(qrCodeMessage => {
                handleScanSuccess(qrCodeMessage);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to decode QR code from file. Please ensure it is a clear image of the card QR.");
            });
    });
}

function startScanning() {
    resetScannerUI();
    document.getElementById('start-scan-btn').style.display = 'none';
    document.getElementById('stop-scan-btn').style.display = 'inline-block';
    document.querySelector('.scanner-laser').style.display = 'block';

    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("reader");
    }

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
            // Success callback
            stopScanning();
            handleScanSuccess(decodedText);
        },
        (errorMessage) => {
            // Verbose logging of scans. Ignored for standard production flows.
        }
    ).catch(err => {
        console.error("Camera Init Error:", err);
        alert("Camera scan failed to initialize. Please check permissions or use the file upload option below.");
        stopScanning();
    });
}

function stopScanning() {
    document.getElementById('start-scan-btn').style.display = 'inline-block';
    document.getElementById('stop-scan-btn').style.display = 'none';
    document.querySelector('.scanner-laser').style.display = 'none';

    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            console.log("Webcam stopped scanning.");
        }).catch(err => {
            console.error("Failed to stop scanning:", err);
        });
    }
}

function handleScanSuccess(payload) {
    console.log("Successful Scan! Payload received.");
    const decryptedProfile = decompressData(payload);

    if (!decryptedProfile) {
        alert("🚨 Security Alert: Decryption failed. This QR code is either not a valid Nirantar QR Health Card, or was encrypted with a different key.");
        resetScannerUI();
        return;
    }

    // Populate Decoded Health Dashboard
    document.getElementById('dash-avatar').innerText = decryptedProfile.name.charAt(0).toUpperCase();
    document.getElementById('dash-name').innerText = decryptedProfile.name;
    
    // Map gender code to label
    const genderLabels = { 'M': 'Male', 'F': 'Female', 'O': 'Other' };
    const genderFull = genderLabels[decryptedProfile.gender] || 'Other';
    document.getElementById('dash-meta').innerText = `${genderFull} • ${decryptedProfile.age} Years Old`;
    document.getElementById('dash-blood').innerText = decryptedProfile.bloodGroup;

    // Conditions
    const conditionsContainer = document.getElementById('dash-conditions');
    conditionsContainer.innerHTML = '';
    if (decryptedProfile.conditions.length === 0) {
        conditionsContainer.innerHTML = '<span class="tag none">No Known Chronic Conditions</span>';
    } else {
        decryptedProfile.conditions.forEach(c => {
            conditionsContainer.innerHTML += `<span class="tag condition">${c}</span>`;
        });
    }

    // Allergies
    const allergiesContainer = document.getElementById('dash-allergies');
    allergiesContainer.innerHTML = '';
    if (decryptedProfile.allergies.length === 0) {
        allergiesContainer.innerHTML = '<span class="tag none">No Known Medical Allergies</span>';
    } else {
        decryptedProfile.allergies.forEach(a => {
            allergiesContainer.innerHTML += `<span class="tag allergy">⚠️ ${a}</span>`;
        });
    }

    // Vaccinations
    const vaccinesContainer = document.getElementById('dash-vaccines');
    vaccinesContainer.innerHTML = '';
    if (decryptedProfile.vaccines.length === 0) {
        vaccinesContainer.innerHTML = '<span class="tag none">No Recorded Vaccinations</span>';
    } else {
        decryptedProfile.vaccines.forEach(v => {
            vaccinesContainer.innerHTML += `<span class="tag vaccine">✓ ${v.name} (${v.year})</span>`;
        });
    }

    // Activate Dashboard Display
    const dashboard = document.getElementById('health-dashboard');
    dashboard.classList.add('active');
    dashboard.scrollIntoView({ behavior: 'smooth' });
}

function resetScannerUI() {
    document.getElementById('health-dashboard').classList.remove('active');
    document.getElementById('qr-file-input').value = '';
}
