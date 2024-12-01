// src/shared/components/layout/Navigation/Navigation.jsx
import { useState } from 'react';
import { styles } from './Navigation.styles';

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { href: '#store', text: 'Store' },
        { href: '#chat', text: 'Chat' },
        { href: '#support', text: 'Support' }
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <a href="#chatgpt" className={styles.logo}>
                    <svg
                        viewBox="0 0 200 200"
                        width="33"
                        height="33"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="100"
                            cy="100"
                            fill="#FFD700"
                            r="78"
                            stroke="#FFFFFF"
                            strokeWidth="5"
                        />
                        <g className="eyes">
                            <circle
                                cx="61"
                                cy="82"
                                r="12"
                                fill="#000000"
                            />
                            <circle
                                cx="127"
                                cy="82"
                                r="12"
                                fill="#000000"
                            />
                        </g>
                        <path
                            d="m136.81 116.53c.69 26.17-64.11 42-81.52-.73"
                            style={{
                                fill: "none",
                                stroke: "#000000",
                                strokeWidth: 3
                            }}
                        />
                    </svg>
                </a>


                <div className={styles.links}>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={styles.link}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>

                <div
                    className={styles.mobileMenu}
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className={styles.mobileNav}>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={styles.mobileLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
