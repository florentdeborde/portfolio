import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

// Mock translation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock SocialLinks
vi.mock('./SocialLinks', () => ({
    SocialLinks: () => <div data-testid="social-links" />,
}));

describe('Footer', () => {
    it('renders copyright with current year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear().toString();
        // Since the text is split or formatted, we look for parts
        expect(screen.getByText((content) => content.includes(currentYear))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes("Florent Deborde"))).toBeInTheDocument();
    });

    it('renders social links', () => {
        render(<Footer />);
        expect(screen.getByTestId('social-links')).toBeInTheDocument();
    });
});
