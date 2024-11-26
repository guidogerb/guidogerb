// App.js
// import React from 'react';
import { useState, useEffect } from 'react';
import Navigation from "./shared/components/layout/Navigation";
import { css } from '@emotion/css';

const styles = {
  app: css`
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  `,

  main: css`
    width: 100%;
    margin-top: 44px; /* Height of navigation */
  `,

  installPrompt: css`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    color: #fff;
    padding: 16px 24px;
    border-radius: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      background: #fff;
      color: #000;
      cursor: pointer;
      font-weight: 500;
      
      &:hover {
        background: #f5f5f5;
      }
    }
  `,

  mobileMenu: css`
    display: none;
    color: #f5f5f7;
    font-size: 24px;
    
    @media (max-width: 833px) {
      display: block;
    }
  `,

  hero: css`
    text-align: center;
    padding: 95px 0;
    background: #fbfbfd;
    
    h1 {
      font-size: 56px;
      line-height: 1.07143;
      font-weight: 600;
      letter-spacing: -0.005em;
      margin: 0;
      
      @media (max-width: 1068px) {
        font-size: 48px;
      }
      
      @media (max-width: 734px) {
        font-size: 32px;
      }
    }
    
    h2 {
      margin-top: 6px;
      font-size: 28px;
      line-height: 1.10722;
      font-weight: 400;
      letter-spacing: .004em;
      color: #1d1d1f;
      
      @media (max-width: 1068px) {
        font-size: 24px;
      }
      
      @media (max-width: 734px) {
        font-size: 19px;
      }
    }
  `,

  grid: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px;
    max-width: 1440px;
    margin: 0 auto;
    
    @media (max-width: 734px) {
      grid-template-columns: 1fr;
    }
  `,

  card: css`
    position: relative;
    background: #fbfbfd;
    border-radius: 18px;
    overflow: hidden;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
    
    img {
      width: 100%;
      height: auto;
    }
    
    .content {
      position: absolute;
      top: 48px;
      left: 0;
      right: 0;
      text-align: center;
      
      h3 {
        font-size: 40px;
        line-height: 1.1;
        font-weight: 600;
        letter-spacing: 0;
        margin: 0;
        
        @media (max-width: 1068px) {
          font-size: 32px;
        }
      }
      
      p {
        margin-top: 4px;
        font-size: 21px;
        line-height: 1.2381;
        font-weight: 400;
        letter-spacing: .016em;
        
        @media (max-width: 1068px) {
          font-size: 19px;
        }
      }
    }
  `
};

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  return (
      <div className={styles.app}>
        <Navigation />

        <main className={styles.main}>
          <section className={styles.hero}>
            <h1>Chatbot Pro</h1>
            <h2>AI chatting like a professional.</h2>
            {showInstallPrompt && (
                <div className={styles.installPrompt}>
                  <span>Install Chatbot Pro for a better experience
                    <button onClick={handleInstallClick}>Install</button>
                    <button onClick={() => setShowInstallPrompt(false)}>✕</button>
                  </span>
                </div>
            )}
          </section>

          <div className={styles.grid}>
            <div className={styles.card}>
              <img src="path-to-image" alt="Image 1"/>
              <div className="content">
                <h3>Image 1</h3>
                <p>Supercharged by M1</p>
              </div>
            </div>
            <div className={styles.card}>
              <img src="path-to-image" alt="Image 2"/>
              <div className="content">
                <h3>Image 2</h3>
                <p>Supercharged by M2</p>
              </div>
            </div>
            {/* Add more cards as needed */}
          </div>
        </main>

      </div>
  );
};

export default App;
