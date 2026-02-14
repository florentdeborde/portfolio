import React from 'react';
import styles from './GlassPanel.module.css';

interface GlassPanelProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const GlassPanel = ({ children, className = '', style }: GlassPanelProps) => {
    return (
        <div className={`${styles.glassPanel} ${className}`} style={style}>
            {children}
        </div>
    );
};
