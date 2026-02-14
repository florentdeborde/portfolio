import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MayleoDemo } from './MayleoDemo';
import { sendEmail } from '@/services/EmailService';

// Mock focus
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('@/services/EmailService', () => ({
    sendEmail: vi.fn(),
}));

describe('MayleoDemo', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the photo picker and message form', () => {
        render(<MayleoDemo />);
        expect(screen.getByText('projects.items.mayleo-email-gateway.demo.photo.title')).toBeInTheDocument();
        expect(screen.getByText('projects.items.mayleo-email-gateway.demo.form.title')).toBeInTheDocument();
    });

    it('updates form fields on change', () => {
        render(<MayleoDemo />);
        const emailInput = screen.getByLabelText('projects.items.mayleo-email-gateway.demo.form.label-email') as HTMLInputElement;
        const messageInput = screen.getByLabelText('projects.items.mayleo-email-gateway.demo.form.label-message') as HTMLTextAreaElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'toEmail' } });
        fireEvent.change(messageInput, { target: { value: 'Hello test', name: 'message' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(messageInput.value).toBe('Hello test');
    });

    it('submits the form successfully', async () => {
        vi.mocked(sendEmail).mockResolvedValueOnce({});
        render(<MayleoDemo />);

        const emailInput = screen.getByLabelText('projects.items.mayleo-email-gateway.demo.form.label-email');
        const messageInput = screen.getByLabelText('projects.items.mayleo-email-gateway.demo.form.label-message');
        const submitButton = screen.getByRole('button', { name: 'projects.items.mayleo-email-gateway.demo.form.btn-send' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'toEmail' } });
        fireEvent.change(messageInput, { target: { value: 'Test message', name: 'message' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
                toEmail: 'test@example.com',
                message: 'Test message'
            }));
        });

        expect(screen.getByText('projects.items.mayleo-email-gateway.demo.form.success')).toBeInTheDocument();
    });

    it('handles submission error', async () => {
        vi.mocked(sendEmail).mockRejectedValueOnce(new Error('MAYLEO_SERVICE_UNAVAILABLE'));
        render(<MayleoDemo />);

        const emailInput = screen.getByLabelText('projects.items.mayleo-email-gateway.demo.form.label-email');
        const messageInput = screen.getByLabelText('projects.items.mayleo-email-gateway.demo.form.label-message');
        const submitButton = screen.getByRole('button', { name: 'projects.items.mayleo-email-gateway.demo.form.btn-send' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'toEmail' } });
        fireEvent.change(messageInput, { target: { value: 'Test message', name: 'message' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_SERVICE_UNAVAILABLE')).toBeInTheDocument();
        });
    });
});
