import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScrollToTopButton } from './ScrollToTopButton';
import styles from './ScrollToTopButton.module.css';

describe('ScrollToTopButton', () => {
    beforeEach(() => {
        // Reset scroll position before each test
        window.scrollY = 0;
        // Mock scrollTo because JSDOM doesn't implement it
        window.scrollTo = vi.fn();
    });

    it('is not visible initially (does not have the "visible" class)', () => {
        render(<ScrollToTopButton />);
        const button = screen.getByRole('button');
        expect(button).not.toHaveClass(styles.visible);
    });

    it('becomes visible after scrolling down past the 300px threshold', () => {
        render(<ScrollToTopButton />);

        // Simulate scrolling down 500px
        window.scrollY = 500;
        fireEvent.scroll(window);

        const button = screen.getByRole('button');
        /**
         * The component logic sets isVisible to true when scrolled > 300
         */
        expect(button).toHaveClass(styles.visible);
    });

    it('triggers window.scrollTo to the top with smooth behavior when clicked', () => {
        render(<ScrollToTopButton />);

        // Simulate scroll to make it active
        window.scrollY = 500;
        fireEvent.scroll(window);

        const button = screen.getByRole('button', { name: /scroll to top/i });
        fireEvent.click(button);

        // Verify the native browser API was called correctly
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth'
        });
    });
});