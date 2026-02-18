import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MessageForm } from './MessageForm';
import styles from './MessageForm.module.css';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('MessageForm', () => {
    const mockFormData = {
        toEmail: 'test@example.com',
        message: 'Hello',
        langCode: 'en',
    };

    it('renders form fields with correct styles', () => {
        const { container } = render(<MessageForm formData={mockFormData} handleChange={() => { }} onSubmit={() => { }} isSubmitting={false} />);

        expect(screen.getByPlaceholderText('projects.items.mayleo-email-gateway.demo.form.placeholder-email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('projects.items.mayleo-email-gateway.demo.form.placeholder-message')).toBeInTheDocument();

        // Verify CSS module classes
        expect(container.querySelector(`.${styles.messageForm}`)).toBeInTheDocument();
        expect(container.querySelector(`.${styles.messageFormInputField}`)).toBeInTheDocument();
        expect(container.querySelector(`.${styles.messageFormTextareaField}`)).toBeInTheDocument();

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls onSubmit when button is clicked', () => {
        const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
        render(<MessageForm formData={mockFormData} handleChange={() => { }} onSubmit={onSubmit} isSubmitting={false} />);

        fireEvent.click(screen.getByRole('button'));
        expect(onSubmit).toHaveBeenCalled();
    });
});
