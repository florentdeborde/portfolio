import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
    duration?: number;
}

export const Toast = ({ message, type = 'success', onClose, duration = 5000 }: ToastProps) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const Icon = type === 'success' ? CheckCircle : AlertCircle;

    return (
        <div className={`${styles.toastNotification} ${styles[type]}`}>
            <div className={styles.toastContent}>
                <Icon className={styles.toastIcon} size={20} />
                <span className={styles.toastMessage}>{message}</span>
            </div>
            <button className={styles.toastClose} onClick={onClose} aria-label="Close">
                <X size={16} />
            </button>
            <div className={styles.toastProgress} style={{ animationDuration: `${duration}ms` }} />
        </div>
    );
};
export const ToastContainer = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.toastContainer}>
        {children}
    </div>
);
