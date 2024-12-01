// src/shared/components/layout/Navigation/Navigation.styles.js
import { css } from '@emotion/css';

export const styles = {
    nav: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
    z-index: 1000;
  `,

    container: css`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 22px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 833px) {
      padding: 0 16px;
    }
  `,

    logo: css`
    color: #f5f5f7;
    /*opacity: 0.8;*/
    /*transition: opacity 0.3s;*/
    
    &:hover {
      opacity: 1;
    }
  `,

    links: css`
    display: flex;
    gap: 35px;
    align-items: center;
    justify-content: center;
    flex: 1;
        
    @media (max-width: 833px) {
      display: none;
    }
  `,

    link: css`
    color: #f5f5f7;
    text-decoration: none;
    font-size: 12px;
    opacity: 0.8;
    transition: opacity 0.3s;

    
    &:hover {
      opacity: 1;
    }
  `,

    mobileMenu: css`
    display: none;
    color: #f5f5f7;
    font-size: 24px;
    cursor: pointer;
    
    @media (max-width: 833px) {
      display: block;
    }
  `,

    mobileNav: css`
    display: none;
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    width: 100vw;
    background: rgba(0, 0, 0, 0.95);
    padding: 20px;
    
    @media (max-width: 833px) {
      display: block;
    }
  `,

    mobileLink: css`
    display: block;
    color: #f5f5f7;
    text-decoration: none;
    font-size: 17px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  `
};
