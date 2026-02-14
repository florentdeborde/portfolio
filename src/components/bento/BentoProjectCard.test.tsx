import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BentoProjectCard, Project } from './BentoProjectCard';
import { BrowserRouter } from 'react-router-dom';
import { Mail } from 'lucide-react';

/**
 * Mocking react-i18next
 * The 't' function returns the key to verify correct translation pathing.
 */
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const mockProject: Project = {
    id: 'mayleo-email-gateway',
    icon: Mail,
    color: 'blob-orange',
    size: 'full',
    category: 'microservice',
    tech: ['react', 'vite'],
    github: 'https://github.com/test',
    internalLink: '/projects/test',
    status: 'operational'
};

describe('BentoProjectCard', () => {
    const renderBentoProjectCard = (project = mockProject) => {
        return render(
            <BrowserRouter>
                <BentoProjectCard project={project} />
            </BrowserRouter>
        );
    };

    it('renders project title, category and description correctly', () => {
        renderBentoProjectCard();
        expect(screen.getByText('projects.items.mayleo-email-gateway.title')).toBeInTheDocument();
        expect(screen.getByText('projects.categories.microservice')).toBeInTheDocument();
    });

    it('renders status badge when a status is provided', () => {
        renderBentoProjectCard();

        // Using a function matcher to find the text even if split across nodes
        const statusBadge = screen.getByText((content, element) => {
            return element?.tagName.toLowerCase() === 'span' && content.includes('projects.status.operational');
        });

        expect(statusBadge).toBeInTheDocument();
    });

    it('renders tech tags', () => {
        renderBentoProjectCard();
        expect(screen.getByText('projects.tech.react')).toBeInTheDocument();
    });

    it('renders the GitHub link button', () => {
        renderBentoProjectCard();
        const githubLink = screen.getByLabelText('projects.links.github');
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/test');
    });

    it('renders the internal demo link when demoLink is provided', () => {
        const projectWithDemo = { ...mockProject, demoLink: '/projects/test' };
        renderBentoProjectCard(projectWithDemo);

        const tryItLink = screen.getByLabelText('projects.links.tryIt');
        expect(tryItLink).toBeInTheDocument();
    });
});
