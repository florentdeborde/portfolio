import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectDetails } from './ProjectDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, options?: { defaultValue?: string }) => options?.defaultValue || key,
    }),
}));

// Mock components that might be complex or external
vi.mock('@/components/projects/GithubReadme', () => ({
    GithubReadme: () => <div data-testid="github-readme" />,
}));

vi.mock('@/components/projects/mayleo/MayleoDemo', () => ({
    MayleoDemo: () => <div data-testid="mayleo-demo" />,
}));

describe('ProjectDetails', () => {
    it('redirects to projects if project not found', () => {
        render(
            <MemoryRouter initialEntries={['/projects/non-existent']}>
                <Routes>
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/projects" element={<div data-testid="projects-page" />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('projects-page')).toBeInTheDocument();
    });

    it('renders project details correctly for portfolio', () => {
        render(
            <MemoryRouter initialEntries={['/projects/portfolio']}>
                <Routes>
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('projects.items.portfolio.title')).toBeInTheDocument();
        expect(screen.getByText('tabs.overview')).toBeInTheDocument();
        expect(screen.getByTestId('project-overview-grid')).toBeInTheDocument();
    });

    it('switches between tabs', () => {
        render(
            <MemoryRouter initialEntries={['/projects/mayleo-email-gateway']}>
                <Routes>
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                </Routes>
            </MemoryRouter>
        );

        // Should start with overview
        expect(screen.getByTestId('project-overview-grid')).toBeInTheDocument();

        // Click on GitHub tab
        fireEvent.click(screen.getByText('GitHub'));
        expect(screen.getByTestId('github-readme')).toBeInTheDocument();

        // Click on Demo tab
        fireEvent.click(screen.getByText('tabs.demo'));
        expect(screen.getByTestId('mayleo-demo')).toBeInTheDocument();
    });

    it('initializes with a tab from search params', () => {
        render(
            <MemoryRouter initialEntries={['/projects/mayleo-email-gateway?tab=demo']}>
                <Routes>
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('mayleo-demo')).toBeInTheDocument();
    });
});
