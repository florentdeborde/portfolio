import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { language: 'en', changeLanguage: vi.fn() },
    }),
    Trans: ({ i18nKey }: { i18nKey: string }) => <span>{i18nKey}</span>,
    initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

// Mock lucide icons to avoid issues
vi.mock('lucide-react', () => ({
    Moon: () => <div data-testid="moon-icon" />,
    Sun: () => <div data-testid="sun-icon" />,
    Languages: () => <div />,
    ChevronDown: () => <div />,
    Menu: () => <div />,
    X: () => <div />,
    Github: () => <div />,
    Linkedin: () => <div />,
    Mail: () => <div />,
    ArrowLeft: () => <div />,
    Play: () => <div />,
    Leaf: () => <div />,
    Zap: () => <div />,
    Shield: () => <div />,
    User: () => <div />,
    Heart: () => <div />,
    ChevronUp: () => <div />,
    Layout: () => <div />,
    Server: () => <div />,
    Code2: () => <div />,
    Check: () => <div />,
    Send: () => <div />,
    ArrowRight: () => <div />,
    Globe: () => <div />,
    UserRoundSearch: () => <div />,
}));

// Mock brand icons
vi.mock('./components/BrandIcons', () => ({
    GithubIcon: () => <div data-testid="github-icon" />,
    LinkedinIcon: () => <div data-testid="linkedin-icon" />,
    ExternalLinkIcon: () => <div data-testid="external-icon" />,
}));

describe('App Navigation', () => {
    it('renders home page by default', () => {
        render(<App />);
        expect(screen.getByText('home.hero.title')).toBeInTheDocument();
    });

    it('navigates to projects page', () => {
        render(<App />);

        const projectsLinks = screen.getAllByText('nav.projects');
        fireEvent.click(projectsLinks[0]);

        expect(screen.getByText('projects.header.title')).toBeInTheDocument();
    });

    it('navigates to about page', () => {
        render(<App />);

        const aboutLinks = screen.getAllByText('nav.about');
        fireEvent.click(aboutLinks[0]);

        expect(screen.getByText('about.title')).toBeInTheDocument();
    });

    it('navigates to portfolio page', () => {
        render(<App />);

        // First go to projects
        const projectsLinks = screen.getAllByText('nav.projects');
        fireEvent.click(projectsLinks[0]);

        // Then click on portfolio card
        const portfolioCard = screen.getByText('projects.items.portfolio.title');
        fireEvent.click(portfolioCard.closest('a')!);

        // Expect to see the short title on the details page
        expect(screen.getByText('projects.items.portfolio.title-short')).toBeInTheDocument();
        // Also check for something specific to ProjectDetails like the Overview tab
        expect(screen.getByText('tabs.overview')).toBeInTheDocument();
    });
});
