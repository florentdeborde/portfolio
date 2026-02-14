import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Portfolio } from './Portfolio';
import { BrowserRouter } from 'react-router-dom';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('Portfolio Page', () => {
    it('renders overview content by default', () => {
        render(
            <BrowserRouter>
                <Portfolio />
            </BrowserRouter>
        );

        expect(screen.getByText('projects.items.portfolio.title')).toBeInTheDocument();
        expect(screen.getByText('projects.items.portfolio.overview.architecture.title')).toBeInTheDocument();
        expect(screen.getByText('projects.items.portfolio.overview.features.title')).toBeInTheDocument();
        expect(screen.getByText('projects.items.portfolio.overview.techStack.title')).toBeInTheDocument();
        expect(screen.getByText('projects.items.portfolio.overview.links.title')).toBeInTheDocument();
    });

    it('switches to GitHub tab', () => {
        render(
            <BrowserRouter>
                <Portfolio />
            </BrowserRouter>
        );

        const githubTab = screen.getByRole('tab', { name: 'GitHub' });
        fireEvent.click(githubTab);

        // Check for GithubReadme content (mocked or actual text)
        // Since we mock t, we expect the loading or error text keys
        expect(screen.getByText('projects.github-readme.loading')).toBeInTheDocument();
    });

    it('renders the back-link with correct destination', () => {
        render(
            <BrowserRouter>
                <Portfolio />
            </BrowserRouter>
        );

        const backLink = screen.getByRole('link', { name: 'nav.projects' });
        expect(backLink).toHaveAttribute('href', '/projects');
    });
});
