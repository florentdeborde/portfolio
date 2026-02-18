import { useTranslation } from 'react-i18next';
import { Button } from '@/components/common/Button';
import { Home, Compass } from 'lucide-react';
import styles from './BentoNotFound.module.css';

export const BentoNotFound = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.bentoNotFoundContainer}>
            <div className={styles.bentoNotFoundCard}>
                <div className={styles.backgroundText}>404</div>

                <div className={styles.contentWrapper}>
                    <div className={styles.iconWrapper}>
                        <Compass size={48} className={styles.compassIcon} />
                    </div>

                    <h2 className={styles.title}>{t('error404.title')}</h2>
                    <p className={styles.desc}>{t('error404.desc')}</p>

                    <div className={styles.actions}>
                        <Button to="/" icon={<Home size={20} />} fullWidth>
                            {t('error404.cta')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
