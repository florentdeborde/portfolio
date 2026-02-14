import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'dark';
    });

    // Sync theme with document and localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    // Mouse Glow Effect Logic
    useEffect(() => {
        // Only enable mouse effect on devices with fine pointer (mouse/trackpad)
        const mediaQuery = window.matchMedia('(pointer: fine)');

        if (!mediaQuery.matches) return;

        let rafId: number | null = null;

        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                const x = e.clientX;
                const y = e.clientY;
                document.documentElement.style.setProperty('--mouse-x', `${x}px`);
                document.documentElement.style.setProperty('--mouse-y', `${y}px`);
                rafId = null;
            });
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
