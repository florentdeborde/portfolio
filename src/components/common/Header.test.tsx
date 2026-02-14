import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

// Mock useTranslation
const mockChangeLanguage = vi.fn();
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            language: 'en',
            changeLanguage: mockChangeLanguage,
        },
    }),
}));

// Mock lucide icons
vi.mock('lucide-react', () => ({
    Moon: () => <div data-testid="moon-icon" />,
    Sun: () => <div data-testid="sun-icon" />,
    Languages: () => <div />,
    ChevronDown: () => <div />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
}));

// Mock ThemeContext
const mockToggleTheme = vi.fn();
const mockUseTheme = vi.fn();

vi.mock('../../context/ThemeContext', () => ({
    useTheme: () => mockUseTheme(),
}));

describe('Header Component', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        // Default mock implementation
        mockUseTheme.mockReturnValue({
            theme: 'dark',
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
        // Check Desktop links
        const projectsLink = screen.getAllByRole('link', { name: 'nav.projects' })[0];
        const aboutLink = screen.getAllByRole('link', { name: 'nav.about' })[0];

        expect(projectsLink).toHaveAttribute('href', '/projects');
        expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('toggles theme when theme button is clicked', () => {
        renderHeader();
        // Both desktop and mobile buttons
        const themeButton = screen.getAllByRole('button', { name: /Toggle Theme/i })[0];
        fireEvent.click(themeButton);
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('opens language dropdown and changes language', () => {
        renderHeader();
        const langButton = screen.getAllByLabelText('Toggle Language Menu')[0];
        fireEvent.click(langButton);

        // Both desktop and mobile dropdowns
        const frOption = screen.getAllByText('Français')[0];
        fireEvent.click(frOption);

        expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
    });

    it('toggles mobile menu', () => {
        renderHeader();
        const menuToggle = screen.getByLabelText('Toggle Menu');

        // Initial state: menu icon visible, x icon hidden
        expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();

        // Click to open
        fireEvent.click(menuToggle);

        expect(screen.getByTestId('x-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();

        // Click to close
        fireEvent.click(menuToggle);
        expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    });

    it('displays correct theme icon', () => {
        // Test dark theme
        mockUseTheme.mockReturnValue({
            theme: 'dark',
            toggleTheme: mockToggleTheme,
        });
        const { unmount } = renderHeader();
        expect(screen.getAllByTestId('moon-icon')[0]).toBeInTheDocument();
        unmount();

        // Test light theme
        mockUseTheme.mockReturnValue({
            theme: 'light',
            toggleTheme: mockToggleTheme,
        });
        renderHeader();
        expect(screen.getAllByTestId('sun-icon')[0]).toBeInTheDocument();
    });
});
