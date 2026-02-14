import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    to?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    style?: React.CSSProperties;
}

export const Button = ({ children, to, href, onClick, className = '', icon, type = 'button', disabled, style }: ButtonProps) => {
    const content = (
        <>
            {children}
            {icon && <span className={styles.buttonIcon}>{icon}</span>}
        </>
    );

    const commonClasses = `${styles.button} ${className}`;

    if (to) {
        return (
            <Link to={to} className={commonClasses} style={style}>
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={commonClasses} target="_blank" rel="noopener noreferrer" style={style}>
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={commonClasses}
            disabled={disabled}
            style={style}
        >
            {content}
        </button>
    );
};
