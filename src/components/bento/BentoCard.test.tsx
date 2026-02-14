import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoCard } from './BentoCard';
import { BrowserRouter } from 'react-router-dom';
import { gridStyles } from '@/components/common/Grid';

/**
 * Mocking react-i18next
 * The 't' function returns the key to verify correct translation pathing.
 */
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('BentoCard', () => {
    it('renders header when props are provided', () => {
        const MockIcon = () => <svg data-testid="mock-icon" />;
        render(
            <BrowserRouter>
                <BentoCard headerIcon={MockIcon} headerTitle="Header Title" headerSubtitle="Subtitle">
                    <div>Content</div>
                </BentoCard>
            </BrowserRouter>
        );
        expect(screen.getByText('Header Title')).toBeInTheDocument();
        expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
        render(
            <BrowserRouter>
                <BentoCard description="Test Description">
                    <div>Content</div>
                </BentoCard>
            </BrowserRouter>
        );
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        // Since we are using CSS modules, we can't easily check for class name without importing styles
        // but we can check if it's a paragraph
        const desc = screen.getByText('Test Description');
        expect(desc.tagName).toBe('P');
    });

    it('renders children correctly', () => {
        render(
            <BrowserRouter>
                <BentoCard>
                    <div data-testid="child-content">Child Content</div>
                </BentoCard>
            </BrowserRouter>
        );
        expect(screen.getByTestId('child-content')).toBeInTheDocument();
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <BrowserRouter>
                <BentoCard className="custom-class">
                    <div>Content</div>
                </BentoCard>
            </BrowserRouter>
        );
        // The first child of the container should be the article or link, having the class
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass('custom-class');
        expect(card.className).toMatch(/bentoCard/);
    });

    it('applies size classes correctly', () => {
        const { container } = render(
            <BrowserRouter>
                <BentoCard size="large">
                    <div>Content</div>
                </BentoCard>
            </BrowserRouter>
        );
        const card = container.firstChild;
        expect(card).toHaveClass(gridStyles.colSpan2);
        expect(card).toHaveClass(gridStyles.rowSpan2);
    });

    it('renders as article by default', () => {
        const { container } = render(
            <BrowserRouter>
                <BentoCard>
                    <div>Content</div>
                </BentoCard>
            </BrowserRouter>
        );
        expect(container.querySelector('article')).toBeInTheDocument();
    });
});