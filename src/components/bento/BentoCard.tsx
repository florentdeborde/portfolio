import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BentoHeader } from './BentoHeader';
import styles from './BentoCard.module.css';
import { gridStyles } from '@/components/common/Grid';

export interface BentoCardProps {
    children?: React.ReactNode;
    className?: string;
    size?: 'large' | 'wide' | 'full' | 'large-full' | 'normal';
    to?: string;
    href?: string;
    headerIcon?: React.ElementType;
    headerTitle?: string;
    headerSubtitle?: string;
    description?: string;
}

export const BentoCard = ({ children, className = '', size = 'normal', to, href, headerIcon, headerTitle, headerSubtitle, description }: BentoCardProps) => {
    const cardRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const getSizeClass = (size: string) => {
        switch (size) {
            case 'large': return `${gridStyles.colSpan2} ${gridStyles.rowSpan2}`;
            case 'wide': return gridStyles.colSpan2;
            case 'full': return gridStyles.colSpan4;
            case 'large-full': return `${gridStyles.colSpan4} ${gridStyles.rowSpan2}`;
            default: return gridStyles.colSpan1;
        }
    };

    const commonClasses = `${styles.bentoCard} ${getSizeClass(size)} ${className}`;

    const content = (
        <>
            {(headerIcon || headerTitle) && (
                <BentoHeader
                    icon={headerIcon!}
                    title={headerTitle || ''}
                    subtitle={headerSubtitle}
                    className="bento-card-header"
                />
            )}
            {description && (
                <p className={styles.bentoCardDesc}>
                    {description}
                </p>
            )}
            {children}
        </>
    );

    if (to) {
        return (
            <Link
                to={to}
                className={`${commonClasses} clickable`}
                onMouseMove={handleMouseMove}
                ref={cardRef as React.RefObject<HTMLAnchorElement>}
            >
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                className={`${commonClasses} clickable`}
                onMouseMove={handleMouseMove}
                ref={cardRef as React.RefObject<HTMLAnchorElement>}
                target="_blank"
                rel="noopener noreferrer"
            >
                {content}
            </a>
        );
    }

    return (
        <article
            ref={cardRef}
            className={commonClasses}
            onMouseMove={handleMouseMove}
        >
            {content}
        </article>
    );
};
