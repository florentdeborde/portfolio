import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BentoNotFound } from './BentoNotFound';
import { BrowserRouter } from 'react-router-dom';

// Mock translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('BentoNotFound', () => {
    const renderWithRouter = (ui: React.ReactNode) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders 404 content correctly', () => {
        renderWithRouter(<BentoNotFound />);
        expect(screen.getByText('error404.title')).toBeInTheDocument();
        expect(screen.getByText('error404.desc')).toBeInTheDocument();
    });

    it('renders back to home button', () => {
        renderWithRouter(<BentoNotFound />);
        const link = screen.getByRole('link', { name: /error404.cta/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});
