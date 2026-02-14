import React from 'react';
import styles from './Grid.module.css';

interface GridProps {
    children: React.ReactNode;
    variant?: 'standard' | 'auto';
    className?: string; // Allow additional custom classes if needed
    style?: React.CSSProperties;
}

export const Grid = ({ children, variant = 'standard', className = '', style }: GridProps) => {
    const variantClass = variant === 'auto' ? styles.gridAuto : styles.gridStandard;

    return (
        <div className={`${styles.gridBase} ${variantClass} ${className}`} style={style}>
            {children}
        </div>
    );
};

export { styles as gridStyles };
