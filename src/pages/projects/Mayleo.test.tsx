import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Mayleo } from './Mayleo';
import { BrowserRouter } from 'react-router-dom';
import * as EmailService from '@/services/EmailService';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            // Special handling for error translations in tests
            if (key.includes('projects.items.mayleo-email-gateway.demo.form.errors.')) {
                return `Translated Error: ${key.split('.').pop()}`;
            }
            return key;
        },
    }),
}));

// Mock EmailService
vi.mock('../../services/EmailService', () => ({
    sendEmail: vi.fn(),
    MAYLEO_ERROR_CODES: {
        DISABLED: 'MAYLEO_DISABLED',
        MISSING_CONFIG: 'MAYLEO_MISSING_CONFIG',
        INVALID_REQUEST: 'MAYLEO_INVALID_REQUEST',
        SERVICE_UNAVAILABLE: 'MAYLEO_SERVICE_UNAVAILABLE',
        UNKNOWN_ERROR: 'MAYLEO_UNKNOWN_ERROR'
    },
    default: {
        sendEmail: vi.fn()
    }
}));

// Mock assets
vi.mock('@/assets/postcards/postcard-0.jpg', () => ({ default: 'test-file-stub' }));
vi.mock('@/assets/postcards/postcard-1.jpg', () => ({ default: 'test-file-stub' }));
vi.mock('@/assets/postcards/postcard-2.jpg', () => ({ default: 'test-file-stub' }));
vi.mock('@/assets/postcards/postcard-3.jpg', () => ({ default: 'test-file-stub' }));
vi.mock('@/assets/postcards/postcard-4.jpg', () => ({ default: 'test-file-stub' }));
vi.mock('@/assets/postcards/postcard-5.jpg', () => ({ default: 'test-file-stub' }));

describe('Mayleo Page', () => {
    it('renders side-by-side layout with photo picker and form after switching to Demo tab', async () => {
        render(
            <BrowserRouter>
                <Mayleo />
            </BrowserRouter>
        );

        // Check that architecture details are shown by default
        expect(screen.getByText('projects.items.mayleo-email-gateway.overview.architecture.title')).toBeInTheDocument();

        // Switch to Demo tab
        const demoTab = screen.getByRole('tab', { name: 'tabs.demo' });
        fireEvent.click(demoTab);

        await waitFor(() => {
            expect(screen.getByText('projects.items.mayleo-email-gateway.demo.photo.title')).toBeInTheDocument();
        });
        expect(screen.getByText('projects.items.mayleo-email-gateway.demo.form.title')).toBeInTheDocument();
    });

    it('handles successful form submission', async () => {
        vi.mocked(EmailService.sendEmail).mockResolvedValue({ success: true });

        const { container } = render(
            <BrowserRouter>
                <Mayleo />
            </BrowserRouter>
        );

        // Switch to Demo tab
        fireEvent.click(screen.getByRole('tab', { name: 'tabs.demo' }));

        const emailInput = screen.getByPlaceholderText('projects.items.mayleo-email-gateway.demo.form.placeholder-email');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

        const messageInput = screen.getByPlaceholderText('projects.items.mayleo-email-gateway.demo.form.placeholder-message');
        fireEvent.change(messageInput, { target: { value: 'Test message content' } });

        const form = container.querySelector('form');
        expect(form).not.toBeNull();
        fireEvent.submit(form!);

        await waitFor(() => {
            expect(EmailService.sendEmail).toHaveBeenCalled();
            expect(screen.getByText('projects.items.mayleo-email-gateway.demo.form.success')).toBeInTheDocument();
        });
    });

    const errorCodes = [
        'MAYLEO_DISABLED',
        'MAYLEO_MISSING_CONFIG',
        'MAYLEO_INVALID_REQUEST',
        'MAYLEO_SERVICE_UNAVAILABLE',
        'MAYLEO_UNKNOWN_ERROR'
    ];

    errorCodes.forEach((errorCode) => {
        it(`handles form submission with error code: ${errorCode}`, async () => {
            vi.mocked(EmailService.sendEmail).mockRejectedValue(new Error(errorCode));

            const { container } = render(
                <BrowserRouter>
                    <Mayleo />
                </BrowserRouter>
            );

            // Switch to Demo tab
            fireEvent.click(screen.getByRole('tab', { name: 'tabs.demo' }));

            const emailInput = screen.getByPlaceholderText('projects.items.mayleo-email-gateway.demo.form.placeholder-email');
            fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

            const messageInput = screen.getByPlaceholderText('projects.items.mayleo-email-gateway.demo.form.placeholder-message');
            fireEvent.change(messageInput, { target: { value: 'Test message content' } });

            const form = container.querySelector('form');
            expect(form).not.toBeNull();
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.getByText(`Translated Error: ${errorCode}`)).toBeInTheDocument();
            });
        });
    });

    it('renders the back-link with correct destination', () => {
        render(
            <BrowserRouter>
                <Mayleo />
            </BrowserRouter>
        );

        const backLink = screen.getByRole('link', { name: 'nav.projects' });
        expect(backLink).toHaveAttribute('href', '/projects');
    });
});
