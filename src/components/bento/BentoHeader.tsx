import React from 'react';
import styles from './BentoHeader.module.css';

interface BentoHeaderProps {
    icon: React.ElementType;
    title: string;
    subtitle?: string;
    className?: string;
}

export const BentoHeader = ({ icon: Icon, title, subtitle, className = '' }: BentoHeaderProps) => {
    return (
        <div className={`${styles.bentoHeader} ${className}`}>
            <div className={styles.bentoHeaderIconWrapper}>
                <Icon size={24} />
            </div>
            <div className={styles.bentoHeaderText}>
                {subtitle && <div className={styles.bentoHeaderSubtitle}>{subtitle}</div>}
                <h2>{title}</h2>
            </div>
        </div>
    );
};
