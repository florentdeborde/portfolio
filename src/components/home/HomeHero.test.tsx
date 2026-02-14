import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HomeHero } from './HomeHero';
import { BrowserRouter } from 'react-router-dom';

/**
 * Mocking react-i18next
 * We mock both 'useTranslation' for simple keys and the 'Trans' component 
 * for complex translations containing HTML tags (like your subtitle).
 */
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
    // The Trans component is mocked to render its key directly as text
    Trans: ({ i18nKey }: { i18nKey: string }) => <span>{i18nKey}</span>,
}));

describe('HomeHero', () => {
    /**
     * Helper function to wrap the component in a Router.
     * Even if you don't have buttons yet, it's good practice if the component 
     * is part of a routed layout.
     */
    const renderWithRouter = (ui: React.ReactNode) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders the status badge, title, and subtitle correctly', () => {
        renderWithRouter(<HomeHero />);

        // 1. Check for the status badge text
        expect(screen.getByText('home.hero.status')).toBeInTheDocument();

        // 2. Check for the main H1 title
        expect(screen.getByText('home.hero.title')).toBeInTheDocument();

        // 3. Check for the subtitle (rendered via the mocked Trans component)
        expect(screen.getByText('home.hero.subtitle')).toBeInTheDocument();

        // 4. Check for the animation class
        const heroSection = screen.getByText('home.hero.title').closest('section');
        expect(heroSection).toHaveClass('animate-fade-in-up');
    });
});