import React, { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const RegisterPWA = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(swUrl, r) {
      console.log('SW Registered: ' + swUrl);
    },
    onRegisterError(error) {
      console.error('SW Registration Error:', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="pwa-toast-container" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      display: (offlineReady || needRefresh) ? 'block' : 'none'
    }}>
      <div className="pwa-toast" style={{
        backgroundColor: 'var(--bg-card, #112a32)',
        border: '1px solid var(--accent-primary, #19d8d8)',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        color: 'white'
      }}>
        <div style={{ marginBottom: '12px' }}>
          {offlineReady
            ? <span>App ready to work offline</span>
            : <span>New content available, click on reload button to update.</span>}
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          {needRefresh && (
            <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }} onClick={() => updateServiceWorker(true)}>
              Reload
            </button>
          )}
          <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }} onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPWA;
