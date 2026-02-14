import { useTranslation, Trans } from 'react-i18next';
import styles from './HomeHero.module.css';

export const HomeHero = () => {
    const { t } = useTranslation();

    return (
        <section className={`${styles.homeHero} animate-fade-in-up`}>
            <div className={styles.heroStatusBadge}>
                <span className={styles.statusDot}></span>
                {t('home.hero.status')}
            </div>

            <h1 className={styles.heroTitle}>
                {t('home.hero.title')}
            </h1>

            <p className={styles.heroSubtitle}>
                <Trans i18nKey="home.hero.subtitle" components={{ 1: <strong className={styles.highlight}></strong>, 3: <strong className={styles.highlight}></strong> }} />
            </p>
        </section>
    );
};
