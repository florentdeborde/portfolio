import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages, ChevronDown, Menu, X } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import styles from './Header.module.css';
import { useTheme } from '@/context/ThemeContext';
import { Image as PortfolioImage } from '@/components/common/Image';

export const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const mobileLangMenuRef = useRef<HTMLDivElement>(null);

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsLangOpen(false);
    };

    const menuOverlayRef = useRef<HTMLDivElement>(null);

    // Focus trap for mobile menu
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
                return;
            }

            if (e.key !== 'Tab') return;

            const focusableElements = menuOverlayRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        // Prevent scroll on body when menu is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isOutsideDesktop = langMenuRef.current && !langMenuRef.current.contains(event.target as Node);
            const isOutsideMobile = mobileLangMenuRef.current && !mobileLangMenuRef.current.contains(event.target as Node);

            if (isOutsideDesktop && isOutsideMobile) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menu on navigation
    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.navBrand}>
                    <Link to={ROUTES.HOME} className={styles.navLogo}>
                        <PortfolioImage src="/p-logo.svg" alt="Portfolio Logo" loading="eager" fetchPriority="high" />
                    </Link>
                </div>

                <div className={styles.navDesktopLinks}>
                    <Link to={ROUTES.PROJECTS.ROOT} className={`${styles.navLink} ${location.pathname === ROUTES.PROJECTS.ROOT ? styles.active : ''}`}>
                        {t('nav.projects')}
                    </Link>
                    <Link to={ROUTES.ABOUT} className={`${styles.navLink} ${location.pathname === ROUTES.ABOUT ? styles.active : ''}`}>
                        {t('nav.about')}
                    </Link>
                </div>

                <div className={styles.navDesktopControls}>
                    <div className={styles.langContainer} ref={langMenuRef}>
                        <button
                            className={`${styles.langSelectWrapper} ${isLangOpen ? styles.open : ''}`}
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            aria-label="Toggle Language Menu"
                            aria-expanded={isLangOpen}
                            aria-haspopup="true"
                            aria-controls="desktop-lang-menu"
                        >
                            <Languages size={18} className={styles.langIcon} aria-hidden="true" />
                            <span className={styles.langText}>{i18n.resolvedLanguage?.startsWith('fr') ? 'FR' : 'EN'}</span>
                            <ChevronDown size={14} className={`${styles.langArrow} ${isLangOpen ? styles.rotate : ''}`} aria-hidden="true" />
                        </button>

                        {isLangOpen && (
                            <div className={styles.langDropdown} id="desktop-lang-menu" role="menu">
                                <button
                                    className={`${styles.langOption} ${i18n.resolvedLanguage?.startsWith('fr') ? styles.active : ''}`}
                                    onClick={() => changeLang('fr')}
                                >
                                    Français
                                </button>
                                <button
                                    className={`${styles.langOption} ${i18n.resolvedLanguage?.startsWith('en') ? styles.active : ''}`}
                                    onClick={() => changeLang('en')}
                                >
                                    English
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={toggleTheme}
                        className={styles.themeToggle}
                        aria-label="Toggle Theme"
                        title={theme === 'dark' ? t('nav.switchLight') : t('nav.switchDark')}
                    >
                        <div className={`${styles.toggleTrack} ${theme === 'dark' ? styles.dark : styles.light}`}>
                            <div className={styles.toggleThumb}>
                                {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
                            </div>
                        </div>
                    </button>
                </div>

                <button
                    className={styles.mobileMenuToggle}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-nav-overlay"
                >
                    {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                </button>
            </nav>

            <div
                className={`${styles.navOverlay} ${isMenuOpen ? styles.mobileOpen : ''}`}
                onClick={() => setIsMenuOpen(false)}
                id="mobile-nav-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
                ref={menuOverlayRef}
            >
                <div className={styles.navOverlayContent}>
                    <div className={styles.navLinks} onClick={(e) => e.stopPropagation()} role="presentation">
                        <Link to="/projects" className={`${styles.navLink} ${location.pathname === '/projects' ? styles.active : ''}`}>
                            {t('nav.projects')}
                        </Link>
                        <Link to="/about" className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}>
                            {t('nav.about')}
                        </Link>
                    </div>

                    <div className={styles.navControls} onClick={(e) => e.stopPropagation()} role="presentation">
                        <div className={styles.langContainer} ref={mobileLangMenuRef}>
                            <button
                                className={`${styles.langSelectWrapper} ${isLangOpen ? styles.open : ''}`}
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                aria-label="Toggle Language Menu"
                                aria-expanded={isLangOpen}
                                aria-haspopup="true"
                                aria-controls="mobile-lang-menu"
                            >
                                <Languages size={18} className={styles.langIcon} aria-hidden="true" />
                                <span className={styles.langText}>{i18n.resolvedLanguage?.startsWith('fr') ? 'FR' : 'EN'}</span>
                                <ChevronDown size={14} className={`${styles.langArrow} ${isLangOpen ? styles.rotate : ''}`} aria-hidden="true" />
                            </button>

                            {isLangOpen && (
                                <div className={`${styles.langDropdown} ${styles.mobile}`} id="mobile-lang-menu" role="menu">
                                    <button
                                        className={`${styles.langOption} ${i18n.resolvedLanguage?.startsWith('fr') ? styles.active : ''}`}
                                        onClick={() => changeLang('fr')}
                                    >
                                        Français
                                    </button>
                                    <button
                                        className={`${styles.langOption} ${i18n.resolvedLanguage?.startsWith('en') ? styles.active : ''}`}
                                        onClick={() => changeLang('en')}
                                    >
                                        English
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={toggleTheme}
                            className={styles.themeToggle}
                            aria-label="Toggle Theme"
                            title={theme === 'dark' ? t('nav.switchLight') : t('nav.switchDark')}
                        >
                            <div className={`${styles.toggleTrack} ${theme === 'dark' ? styles.dark : styles.light}`}>
                                <div className={styles.toggleThumb}>
                                    {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
