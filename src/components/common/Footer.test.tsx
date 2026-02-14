import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock parameters
vi.mock('../../config/parameters', () => ({
    parameters: {
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/test',
        email: 'test@example.com',
    },
}));

// Mock icons
vi.mock('lucide-react', () => ({
    Mail: () => <div data-testid="mail-icon" />,
}));

describe('Footer Component', () => {
    it('renders copyright with current year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
        expect(screen.getByText(/footer.allRightsReserved/)).toBeInTheDocument();
    });

    it('renders social links with correct hrefs', () => {
        render(<Footer />);

        const githubLink = screen.getByLabelText('GitHub');
        const linkedinLink = screen.getByLabelText('LinkedIn');
        const emailLink = screen.getByLabelText('Email');

        expect(githubLink).toHaveAttribute('href', 'https://github.com/test');
        expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/test');
        expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('renders credits', () => {
        render(<Footer />);
        expect(screen.getByText(/footer.builtWith/)).toBeInTheDocument();
        expect(screen.getByText(/React & Vite/)).toBeInTheDocument();
    });
});
