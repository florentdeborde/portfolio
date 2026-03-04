import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { Button } from '@/components/common/Button';
import styles from './MessageForm.module.css';

interface FormData {
    toEmail: string;
    message: string;
}

interface MessageFormProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

export const MessageForm = ({ formData, handleChange, onSubmit, isSubmitting }: MessageFormProps) => {
    const { t } = useTranslation();

    return (
        <form onSubmit={onSubmit} className={styles.messageForm}>
            <div className={styles.messageFormInputGroup}>
                <label htmlFor="toEmail" className={styles.label}>{t('projects.items.mayleo-email-gateway.demo.form.label-email')}</label>
                <input
                    id="toEmail"
                    type="email"
                    name="toEmail"
                    value={formData.toEmail}
                    onChange={handleChange}
                    className={styles.messageFormInputField}
                    placeholder={t('projects.items.mayleo-email-gateway.demo.form.placeholder-email')}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className={styles.messageFormInputGroup}>
                <label htmlFor="message" className={styles.label}>{t('projects.items.mayleo-email-gateway.demo.form.label-message')}</label>
                <article>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.messageFormTextareaField}
                        required
                        disabled={isSubmitting}
                        readOnly
                    />
                </article>
            </div>

            <Button
                type="submit"
                style={{ opacity: isSubmitting ? 0.7 : 1, border: 'none' }}
                fullWidth
                disabled={isSubmitting}
                icon={<Send size={20} className={`${styles.buttonIcon} ${isSubmitting ? 'animate-pulse' : ''}`} />}
            >
                {isSubmitting ? t('projects.items.mayleo-email-gateway.demo.form.btn-sending') : t('projects.items.mayleo-email-gateway.demo.form.btn-send')}
            </Button>

            <div className={styles.messageFormFooterNote}>
                {t('projects.items.mayleo-email-gateway.demo.form.footer-note')}
            </div>
        </form>
    );
};

export default MessageForm;
