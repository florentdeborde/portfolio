import styles from './Loader.module.css';

interface LoaderProps {
    text?: string;
}

export const Loader = ({ text }: LoaderProps) => {
    return (
        <div className={styles.loaderOverlay}>
            <div className={styles.loaderContent}>
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinnerRing}></div>
                    <div className={styles.spinnerCore}></div>
                </div>
                {text && <p className={styles.loaderText}>{text}</p>}
            </div>
        </div>
    );
};