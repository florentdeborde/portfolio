import { useTranslation } from 'react-i18next';
import { Button } from '@/components/common/Button';
import { Home, AlertCircle } from 'lucide-react';
import styles from './BentoNotFound.module.css';

export const BentoNotFound = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.bentoNotFoundContainer}>
            <div className={styles.bentoNotFoundCard}>
                <div className={styles.bentoNotFoundIcon}>
                    <AlertCircle size={32} />
                </div>

                <h1>404</h1>
                <p className={styles.subtitle}>{t('error404.title')}</p>
                <p className={styles.desc}>{t('error404.desc')}</p>

                <Button to="/" icon={<Home size={20} />}>
                    {t('error404.cta')}
                </Button>
            </div>
        </div>
    );
};
