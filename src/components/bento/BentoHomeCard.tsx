import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BentoHeader } from './BentoHeader';
import styles from './BentoHomeCard.module.css';

interface BentoHomeCardProps {
    icon?: React.ElementType;
    title?: string;
    children?: React.ReactNode;
    className?: string;
    gradient?: string;
    ctaLink?: string;
    ctaText?: string;
    ctaSize?: 'normal' | 'small';
    headerExtras?: React.ReactNode;
}

export const BentoHomeCard = ({
    icon,
    title,
    children,
    className = '',
    gradient,
    ctaLink,
    ctaText,
    ctaSize = 'normal',
    headerExtras
}: BentoHomeCardProps) => {
    const content = (
        <>
            <div className={styles.bentoHomeCardContent}>
                {(icon && title) && (
                    <div className={headerExtras ? styles.bentoHomeCardHeaderRow : ""}>
                        <BentoHeader icon={icon} title={title} />
                    </div>
                )}

                {headerExtras}
                {children}

                {ctaLink && ctaText && (
                    <div className={ctaSize === 'small' ? styles.bentoHomeCardLinkSm : styles.bentoHomeCardLink}>
                        {ctaText} <ArrowRight size={ctaSize === 'small' ? 14 : 16} />
                    </div>
                )}
            </div>
            {gradient && <div className={`${styles.bentoHomeCardBgGradient} ${styles[`gradient${gradient.charAt(0).toUpperCase() + gradient.slice(1)}`]}`}></div>}
        </>
    );

    if (ctaLink) {
        return (
            <Link to={ctaLink} className={`${styles.bentoHomeCard} ${className} ${styles.clickable}`}>
                {content}
            </Link>
        );
    }

    return (
        <div className={`${styles.bentoHomeCard} ${className}`}>
            {content}
        </div>
    );
};
