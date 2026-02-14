import { useTranslation } from 'react-i18next';
import { SocialLinks } from './SocialLinks';
import styles from './Footer.module.css';

export const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.footerCopyright}>
                    © {currentYear} Florent Deborde. {t('footer.allRightsReserved')}
                </div>
                <SocialLinks />
                <div className={styles.footerCredits}>
                    {t('footer.builtWith')} React & Vite
                </div>
            </div>
        </footer>
    );
};

export default Footer;
