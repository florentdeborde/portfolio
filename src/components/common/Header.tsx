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
                        <PortfolioImage src="/p-logo.svg" alt="Portfolio Logo" />
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
                        >
                            <Languages size={18} className={styles.langIcon} />
                            <span className={styles.langText}>{i18n.resolvedLanguage?.startsWith('fr') ? 'FR' : 'EN'}</span>
                            <ChevronDown size={14} className={`${styles.langArrow} ${isLangOpen ? styles.rotate : ''}`} />
                        </button>

                        {isLangOpen && (
                            <div className={styles.langDropdown}>
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
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            <div
                className={`${styles.navOverlay} ${isMenuOpen ? styles.mobileOpen : ''}`}
                onClick={() => setIsMenuOpen(false)}
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
                            >
                                <Languages size={18} className={styles.langIcon} />
                                <span className={styles.langText}>{i18n.resolvedLanguage?.startsWith('fr') ? 'FR' : 'EN'}</span>
                                <ChevronDown size={14} className={`${styles.langArrow} ${isLangOpen ? styles.rotate : ''}`} />
                            </button>

                            {isLangOpen && (
                                <div className={`${styles.langDropdown} ${styles.mobile}`}>
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
