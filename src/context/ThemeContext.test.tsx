import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';

// Reset localStorage before each test
beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
});

const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-value">{theme}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeContext', () => {
    it('provides default theme (dark) if localStorage is empty', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
        expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    });

    it('loads theme from localStorage', () => {
        localStorage.setItem('theme', 'light');
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
        expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    });

    it('toggles theme correctly', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const button = screen.getByText('Toggle Theme');

        // Initial state
        expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

        // Toggle to light
        fireEvent.click(button);
        expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
        expect(document.documentElement).toHaveAttribute('data-theme', 'light');
        expect(localStorage.getItem('theme')).toBe('light');

        // Toggle back to dark
        fireEvent.click(button);
        expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
        expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('throws error if useTheme is used outside ThemeProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => render(<TestComponent />)).toThrow('useTheme must be used within a ThemeProvider');

        consoleSpy.mockRestore();
    });
});
