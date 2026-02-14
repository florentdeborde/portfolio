import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { About } from './About';
import { BrowserRouter } from 'react-router-dom';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('About Page', () => {
    it('renders all sections correctly', () => {
        render(
            <BrowserRouter>
                <About />
            </BrowserRouter>
        );

        expect(screen.getByText('about.title')).toBeInTheDocument();
        expect(screen.getByText('about.intro.title')).toBeInTheDocument();
        expect(screen.getByText('about.international.title')).toBeInTheDocument();
        expect(screen.getByText('about.values.title')).toBeInTheDocument();
    });
});
