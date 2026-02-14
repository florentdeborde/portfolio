import styles from './TechStack.module.css';

export const TechStack = () => {
    const techItems = [
        { name: 'Java 17', class: 'java' },
        { name: 'Spring Boot 3', class: 'spring' },
        { name: 'SQL', class: 'sql' },
        { name: 'React 19', class: 'react' },
        { name: 'Vite 7', class: 'vite' },
    ];

    return (
        <div className={styles.techGrid}>
            {techItems.map((item) => (
                <div key={item.name} className={styles.techItem}>
                    <span className={`${styles.techDot} ${styles[item.class]}`}></span>
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default TechStack;
