import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectLinkButton.module.css';

interface ProjectLinkButtonProps {
    children: React.ReactNode;
    to?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: 'default' | 'primary';
}

export const ProjectLinkButton = ({
    children,
    to,
    href,
    onClick,
    className = '',
    variant = 'default'
}: ProjectLinkButtonProps) => {
    const commonClasses = `${styles.projectLinkButton} ${variant === 'primary' ? styles.primary : ''} ${className}`;

    if (to) {
        return (
            <Link to={to} className={commonClasses}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={commonClasses} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={commonClasses}>
            {children}
        </button>
    );
};
