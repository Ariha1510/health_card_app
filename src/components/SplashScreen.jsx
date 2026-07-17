import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setIsFading(true);
            const timer2 = setTimeout(() => {
                setIsVisible(false);
                if (onFinish) onFinish();
            }, 800); // 800ms fade transition
            return () => clearTimeout(timer2);
        }, 5000); // 5 second visible duration

        return () => clearTimeout(timer1);
    }, [onFinish]);

    if (!isVisible) return null;

    return (
        <div 
            id="splash-screen" 
            style={{ opacity: isFading ? 0 : 1, transition: 'opacity 0.8s ease' }}
        >
            <img src="/logo.png" className="splash-logo" alt="Nirantar Health Logo" />
            <h1>NIRANTAR HEALTH</h1>
            <p>Your Health, Our Priority</p>
        </div>
    );
};

export default SplashScreen;
