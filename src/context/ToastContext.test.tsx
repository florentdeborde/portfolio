import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider, useToast } from './ToastContext';

// Helper component to use the context
const TestComponent = () => {
    const { showToast } = useToast();
    return (
        <button onClick={() => showToast('Global Toast Message', 'success', 3000)}>
            Trigger Toast
        </button>
    );
};

describe('ToastContext', () => {
    it('provides showToast and renders notifications', async () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        const button = screen.getByText('Trigger Toast');

        act(() => {
            button.click();
        });

        // Check if toast appears in DOM (portaled to body)
        expect(screen.getByText('Global Toast Message')).toBeInTheDocument();
    });

    it('removes toast after duration', () => {
        vi.useFakeTimers();
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        const button = screen.getByText('Trigger Toast');

        act(() => {
            button.click();
        });

        expect(screen.getByText('Global Toast Message')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Toast should be gone
        expect(screen.queryByText('Global Toast Message')).not.toBeInTheDocument();

        vi.useRealTimers();
    });

    it('throws error when used outside provider', () => {
        // Suppress console.error for this expected error
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => render(<TestComponent />)).toThrow('useToast must be used within a ToastProvider');

        consoleSpy.mockRestore();
    });
});
