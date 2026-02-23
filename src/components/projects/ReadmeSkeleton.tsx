import styles from './GithubReadme.module.css';

export const ReadmeSkeleton = () => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={`${styles.skeletonLine} ${styles.skeletonMeta}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} />
            <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />

            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} style={{ marginTop: '2rem' }} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} />
            <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
        </div>
    );
};
