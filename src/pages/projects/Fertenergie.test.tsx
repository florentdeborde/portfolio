import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Fertenergie } from './Fertenergie';
import { BrowserRouter } from 'react-router-dom';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock GithubReadme
vi.mock('../../components/projects/GithubReadme', () => ({
    GithubReadme: () => <div data-testid="github-readme">Github Readme Content</div>,
}));

describe('Fertenergie Page', () => {
    it('renders initial overview tab correctly', () => {
        render(
            <BrowserRouter>
                <Fertenergie />
            </BrowserRouter>
        );

        // Check if PageLayout title is rendered
        expect(screen.getByText('projects.items.fertenergie.title')).toBeInTheDocument();

        // Check if default architecture section title is rendered
        expect(screen.getByText('projects.items.fertenergie.overview.architecture.title')).toBeInTheDocument();

        // Check for overview grid
        // Check for overview grid
        expect(screen.getByTestId('project-overview-grid')).toBeInTheDocument();
    });

    it('switches to GitHub tab and renders GithubReadme', () => {
        render(
            <BrowserRouter>
                <Fertenergie />
            </BrowserRouter>
        );

        // Find and click the GitHub tab
        const githubTab = screen.getByRole('tab', { name: /GitHub/i });
        fireEvent.click(githubTab);

        // Verify GithubReadme component is rendered
        expect(screen.getByTestId('github-readme')).toBeInTheDocument();
    });

    it('renders project links in overview', () => {
        render(
            <BrowserRouter>
                <Fertenergie />
            </BrowserRouter>
        );

        // Check for section title
        expect(screen.getByText('projects.items.fertenergie.overview.links.title')).toBeInTheDocument();

        // Check for GitHub link
        const githubLink = screen.getByText('projects.links.github').closest('a');
        expect(githubLink).toHaveAttribute('href');
        expect(githubLink).toHaveAttribute('target', '_blank');

        // Check for External link
        const externalLink = screen.getByText('projects.links.external').closest('a');
        expect(externalLink).toHaveAttribute('href');
        expect(externalLink).toHaveAttribute('target', '_blank');
    });

    it('renders the back-link with correct destination', () => {
        render(
            <BrowserRouter>
                <Fertenergie />
            </BrowserRouter>
        );

        const backLink = screen.getByRole('link', { name: 'nav.projects' });
        expect(backLink).toHaveAttribute('href', '/projects');
    });
});
