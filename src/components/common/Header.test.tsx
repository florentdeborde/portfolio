import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';
import * as ThemeContext from '@/context/ThemeContext';

// Mock translation
const mockChangeLanguage = vi.fn();
const mockI18n = {
    resolvedLanguage: 'en',
    changeLanguage: mockChangeLanguage,
    language: 'en',
    languages: ['en', 'fr'],
    options: {},
};

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: mockI18n,
    }),
}));

// Mock icons
vi.mock('lucide-react', () => ({
    Moon: () => <div data-testid="moon-icon" />,
    Sun: () => <div data-testid="sun-icon" />,
    Languages: () => <div data-testid="lang-icon" />,
    ChevronDown: () => <div />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="close-icon" />,
}));

// Mock Image component
vi.mock('@/components/common/Image', () => ({
    Image: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />
}));

// Mock useTheme
const mockToggleTheme = vi.fn();
const useThemeSpy = vi.spyOn(ThemeContext, 'useTheme');

// Mock CSS modules
vi.mock('./Header.module.css', () => ({
    default: {
        navContainer: 'navContainer',
        navDesktopControls: 'navDesktopControls',
        navOverlay: 'navOverlay',
        mobileOpen: 'mobileOpen',
    }
}));

describe('Header', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockChangeLanguage.mockClear();
        useThemeSpy.mockReturnValue({
            theme: 'light',
            toggleTheme: mockToggleTheme,
        });
    });

    const renderHeader = () => {
        return render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    };

    it('renders navigation links', () => {
        renderHeader();
        // Links exist in both desktop and mobile menus
        expect(screen.getAllByText('nav.projects').length).toBeGreaterThan(0);
        expect(screen.getAllByText('nav.about').length).toBeGreaterThan(0);
        expect(screen.getByAltText('Portfolio Logo')).toBeInTheDocument();
    });

    it('opens and closes language menu', () => {
        renderHeader();

        // Find all language toggles.
        const langButtons = screen.getAllByLabelText('Toggle Language Menu');
        const desktopLangButton = langButtons[0];

        fireEvent.click(desktopLangButton);

        // Both desktop and mobile menus might open since they share state
        const frOptions = screen.getAllByText('Français');
        expect(frOptions.length).toBeGreaterThan(0);

        // Click first option
        fireEvent.click(frOptions[0]);

        expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
    });

    it('opens mobile menu', () => {
        renderHeader();
        const menuButton = screen.getByLabelText('Toggle Menu');
        fireEvent.click(menuButton);

        const overlay = document.getElementById('mobile-nav-overlay');
        expect(overlay?.className).toContain('mobileOpen');
    });
});
