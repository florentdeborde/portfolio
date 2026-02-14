import styles from './TechStack.module.css';

export interface TechItem {
    name: string;
    class: string;
}

interface TechStackProps {
    items: TechItem[];
    className?: string; // Allow passing custom class for grid layout if needed
}

export const TechStack = ({ items, className = '' }: TechStackProps) => {
    return (
        <div className={`${styles.techGrid} ${className}`}>
            {items.map((item) => (
                <div key={item.name} className={styles.techItem}>
                    <span className={`${styles.techDot} ${styles[item.class]}`}></span>
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default TechStack;
