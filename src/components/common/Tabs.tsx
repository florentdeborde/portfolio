import React, { useState } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
}

interface TabsProps {
    items: TabItem[];
    activeId?: string;
    onChange?: (id: string) => void;
    className?: string;
}

export const Tabs = ({ items, activeId, onChange, className = '' }: TabsProps) => {
    const [internalActiveTab, setInternalActiveTab] = useState(items[0]?.id);

    // Derived state: Use prop if controlled, otherwise internal state
    const activeTab = activeId !== undefined ? activeId : internalActiveTab;

    const handleTabClick = (id: string) => {
        if (activeId === undefined) {
            setInternalActiveTab(id);
        }
        if (onChange) {
            onChange(id);
        }
    };

    const activeContent = items.find(item => item.id === activeTab)?.content;

    return (
        <div className={`${styles.tabsWrapper} ${className}`}>
            <div className={styles.tabsContainer}>
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={`${styles.tabButton} ${activeTab === item.id ? styles.active : ''}`}
                        onClick={() => handleTabClick(item.id)}
                        role="tab"
                        aria-selected={activeTab === item.id}
                        aria-controls={`panel-${item.id}`}
                    >
                        {item.icon && <span className={styles.tabIcon}>{item.icon}</span>}
                        {item.label}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent} role="tabpanel" id={`panel-${activeTab}`}>
                {activeContent}
            </div>
        </div>
    );
};
