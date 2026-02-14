import { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import styles from './ScrollToTopButton.module.css';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleScroll = () => {
        const scrolled = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;

        setProgress(scrollPercent);
        setIsVisible(scrolled > 300);
    };

    // Auto-blur when it disappears at the top
    useEffect(() => {
        if (!isVisible && buttonRef.current) {
            buttonRef.current.blur();
        }
    }, [isVisible]);

    const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
        // We still blur on click for immediate feedback,
        // but the useEffect ensures it's clean at the top too.
        e.currentTarget.blur();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // SVG Circle properties
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <button
            ref={buttonRef}
            className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
            onClick={(e) => scrollToTop(e)}
            aria-label="Scroll to top"
        >
            <svg className={styles.progressRing} viewBox="0 0 56 56" width="100%" height="100%">
                <circle
                    className={styles.progressRingCircle}
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    r={radius}
                    cx="28"
                    cy="28"
                    style={{
                        strokeDasharray: `${circumference} ${circumference}`,
                        strokeDashoffset: offset
                    }}
                />
            </svg>
            <div className={styles.iconContainer}>
                <ChevronUp size={24} />
            </div>
        </button>
    );
};
