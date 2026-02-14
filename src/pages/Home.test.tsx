import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Home } from './Home';
import { BrowserRouter } from 'react-router-dom';

// Mock useTranslation and Trans
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
    Trans: ({ i18nKey }: { i18nKey: string }) => <span>{i18nKey}</span>,
}));

describe('Home Page', () => {
    it('renders correctly with sections and navigation links', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(screen.getByText('home.hero.title')).toBeInTheDocument();

        // Verify CTA links
        const viewProjectsLink = screen.getByRole('link', { name: /home.projects.cta/i });
        const viewAboutLink = screen.getByRole('link', { name: /home.about.cta/i });
        const latestProjectLink = screen.getByRole('link', { name: /home.latestProject.cta/i });

        expect(viewProjectsLink).toHaveAttribute('href', '/projects');
        expect(viewAboutLink).toHaveAttribute('href', '/about');
        expect(latestProjectLink).toHaveAttribute('href', '/projects/mayleo');
    });
});
