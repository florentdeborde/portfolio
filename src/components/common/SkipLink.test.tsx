import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SkipLink } from './SkipLink';
import styles from './SkipLink.module.css';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key === 'a11y.skipToContent' ? 'Skip to Content' : key,
    }),
}));

describe('SkipLink Component', () => {
    it('renders the skip link with correct text', () => {
        render(<SkipLink />);
        const link = screen.getByRole('link', { name: /Skip to Content/i });
        expect(link).toBeInTheDocument();
    });

    it('points to the main content id', () => {
        render(<SkipLink />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '#main-content');
    });

    it('has the correct CSS class for accessibility styling', () => {
        render(<SkipLink />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass(styles.skipLink);
    });
});
