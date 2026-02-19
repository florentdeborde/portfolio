import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScrollToTopButton } from './ScrollToTopButton';

// Mock window.scrollTo
const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock });

// Mock styles
vi.mock('./ScrollToTopButton.module.css', () => ({
    default: {
        scrollToTop: 'scrollToTop',
        visible: 'visible',
    },
}));

describe('ScrollToTopButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        scrollToMock.mockClear();

        // Reset scroll position and dimensions
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
        Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });

        // Reset fireEvent behavior if needed
    });

    it('is initially hidden', () => {
        render(<ScrollToTopButton />);
        const button = screen.getByRole('button', { name: "Scroll to top" });

        // Initially scrollY is 0, so it should not have 'visible' class
        expect(button.className).not.toContain('visible');
    });

    it('becomes visible on scroll > 300', () => {
        render(<ScrollToTopButton />);

        // Simulate scroll > 300px
        Object.defineProperty(window, 'scrollY', { value: 350 });

        act(() => {
            fireEvent.scroll(window);
        });

        const button = screen.getByRole('button', { name: "Scroll to top" });
        expect(button.className).toContain('visible');
    });

    it('scrolls to top when clicked', () => {
        render(<ScrollToTopButton />);

        // Make it visible first so we can click it "realistically"
        Object.defineProperty(window, 'scrollY', { value: 350 });
        act(() => {
            fireEvent.scroll(window);
        });

        const button = screen.getByRole('button', { name: "Scroll to top" });
        fireEvent.click(button);

        expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});