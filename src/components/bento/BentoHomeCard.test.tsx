import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BentoHomeCard } from './BentoHomeCard';
import { BrowserRouter } from 'react-router-dom';

// Mock BentoHeader
vi.mock('./BentoHeader', () => ({
    BentoHeader: ({ title }: { title: string }) => <div data-testid="bento-header">{title}</div>
}));

// Mock Icon
const MockIcon = () => <div data-testid="mock-icon" />;

describe('BentoHomeCard', () => {
    const renderWithRouter = (ui: React.ReactNode) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders children content', () => {
        renderWithRouter(
            <BentoHomeCard>
                <div>Child Content</div>
            </BentoHomeCard>
        );
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('renders header when icon and title are provided', () => {
        renderWithRouter(
            <BentoHomeCard icon={MockIcon} title="Header Title">
                <div>Content</div>
            </BentoHomeCard>
        );
        expect(screen.getByTestId('bento-header')).toHaveTextContent('Header Title');
    });

    it('renders CTA link when ctaLink and ctaText are provided', () => {
        renderWithRouter(
            <BentoHomeCard ctaLink="/test" ctaText="Click Me">
                <div>Content</div>
            </BentoHomeCard>
        );
        const link = screen.getByRole('link', { name: /click me/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
    });

    it('renders small CTA link when ctaSize is small', () => {
        renderWithRouter(
            <BentoHomeCard ctaLink="/test" ctaText="Click Me" ctaSize="small">
                <div>Content</div>
            </BentoHomeCard>
        );

        const cta = screen.getByText(/click me/i);
        // Check for partial match of the class name
        expect(cta.className).toMatch(/bentoHomeCardLinkSm/);
    });

    it('renders header extras', () => {
        renderWithRouter(
            <BentoHomeCard headerExtras={<div data-testid="extras">Extras</div>}>
                <div>Content</div>
            </BentoHomeCard>
        );
        expect(screen.getByTestId('extras')).toBeInTheDocument();
    });

    it('applies gradient class when gradient prop is provided', () => {
        const { container } = renderWithRouter(
            <BentoHomeCard gradient="blue">
                <div>Content</div>
            </BentoHomeCard>
        );
        // Css module class will contain 'gradientBlue'
        const gradientEl = container.querySelector('[class*="gradientBlue"]');
        expect(gradientEl).toBeInTheDocument();
    });
});
