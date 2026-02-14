import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotFound } from './NotFound';
import { BrowserRouter } from 'react-router-dom';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('NotFound Page', () => {
    it('renders correctly and provides a back-link to home', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByText('error404.title')).toBeInTheDocument();

        const homeLink = screen.getByRole('link', { name: 'error404.cta' });
        expect(homeLink).toHaveAttribute('href', '/');
    });
});
