import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Projects } from './Projects';
import { BrowserRouter } from 'react-router-dom';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Projects Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the projects header', () => {
        render(
            <BrowserRouter>
                <Projects />
            </BrowserRouter>
        );

        expect(screen.getByText('projects.header.title')).toBeInTheDocument();
    });

    it('renders project card as a link to detail page', () => {
        render(
            <BrowserRouter>
                <Projects />
            </BrowserRouter>
        );

        // Find the card container for Mayleo by heading (now h2)
        const titles = screen.getAllByRole('heading', { level: 2 });
        const mayleoTitle = titles.find(t => t.textContent === 'projects.items.mayleo-email-gateway.title');

        expect(mayleoTitle).toBeDefined();
        // The card itself should be a link now
        const mayleoCardLink = mayleoTitle!.closest('a');

        expect(mayleoCardLink).toBeInTheDocument();
        expect(mayleoCardLink).toHaveAttribute('href', '/projects/mayleo');
    });

    it('renders portfolio project card with correct link', () => {
        render(
            <BrowserRouter>
                <Projects />
            </BrowserRouter>
        );

        const titles = screen.getAllByRole('heading', { level: 2 });
        const portfolioTitle = titles.find(t => t.textContent === 'projects.items.portfolio.title');

        expect(portfolioTitle).toBeDefined();
        const portfolioCardLink = portfolioTitle!.closest('a');

        expect(portfolioCardLink).toBeInTheDocument();
        expect(portfolioCardLink).toHaveAttribute('href', '/projects/portfolio');
    });
});
