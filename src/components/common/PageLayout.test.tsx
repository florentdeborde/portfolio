import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PageLayout } from './PageLayout';
import { BrowserRouter } from 'react-router-dom';

// Mock translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('PageLayout', () => {
    const renderWithRouter = (ui: React.ReactNode) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders children and title', () => {
        renderWithRouter(
            <PageLayout title="Test Page">
                <div>Child Content</div>
            </PageLayout>
        );
        expect(screen.getByText('Test Page')).toBeInTheDocument();
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('renders back link with module class', () => {
        renderWithRouter(
            <PageLayout backTo="/home">
                <div>Content</div>
            </PageLayout>
        );
        const link = screen.getByRole('link', { name: /nav.projects/i });
        expect(link).toBeInTheDocument();
        // Check for partial match of the class name due to CSS Modules
        expect(link.className).toMatch(/backLink/);
    });
});
