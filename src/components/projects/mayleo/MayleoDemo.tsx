import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PhotoPicker } from '@/components/projects/mayleo/PhotoPicker';
import { MessageForm } from '@/components/projects/mayleo/MessageForm';
import { Toast, ToastContainer } from '@/components/common/Toast';
import { sendEmail } from '@/services/EmailService';
import { GlassPanel } from '@/components/common/GlassPanel';
import { Grid } from '@/components/common/Grid';

const PHOTO_NAMES = [
    'postcard-0.jpg',
    'postcard-1.jpg',
    'postcard-2.jpg',
    'postcard-3.jpg',
    'postcard-4.jpg',
    'postcard-5.jpg'
];

type PostcardKey =
    | "projects.items.mayleo-email-gateway.demo.photo.postcards.postcard-0"
    | "projects.items.mayleo-email-gateway.demo.photo.postcards.postcard-1"
    | "projects.items.mayleo-email-gateway.demo.photo.postcards.postcard-2"
    | "projects.items.mayleo-email-gateway.demo.photo.postcards.postcard-3"
    | "projects.items.mayleo-email-gateway.demo.photo.postcards.postcard-4"
    | "projects.items.mayleo-email-gateway.demo.photo.postcards.postcard-5";

const PHOTOS = PHOTO_NAMES.map((name, index) => ({
    id: index + 1,
    url: new URL(`../../../assets/postcards/${name}`, import.meta.url).href,
    path: `postcards/${name}`,
    altKey: `projects.items.mayleo-email-gateway.demo.photo.postcards.postcard-${index}` as PostcardKey
}));

interface Photo {
    id: number;
    url: string;
    path: string;
    altKey: string;
    alt: string;
}

interface DemoFormData {
    toEmail: string;
    message: string;
    subject: string;
    langCode: string;
    [key: string]: string;
}

export const MayleoDemo = () => {
    const { t } = useTranslation();
    const photos = PHOTOS.map(p => ({ ...p, alt: t(p.altKey) }));

    const [selectedPhoto, setSelectedPhoto] = useState<Photo>(photos[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [formData, setFormData] = useState<DemoFormData>({
        toEmail: "",
        message: "",
        subject: t('projects.items.mayleo-email-gateway.demo.form.default-subject'),
        langCode: "en",
    });

    const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoSelect = (photo: Photo) => {
        setSelectedPhoto(photo);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await sendEmail({
                ...formData,
                imagePath: selectedPhoto.path
            });
            showToast(t('projects.items.mayleo-email-gateway.demo.form.success'), 'success');
            setFormData(prev => ({ ...prev, toEmail: "", message: "" }));
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error(error);
            }
            const errorCode = (error as Error).message;

            type MayleoErrorKey =
                | "projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_DISABLED"
                | "projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_MISSING_CONFIG"
                | "projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_INVALID_REQUEST"
                | "projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_SERVICE_UNAVAILABLE"
                | "projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_UNKNOWN_ERROR";

            const errorMap: Record<string, MayleoErrorKey> = {
                'MAYLEO_DISABLED': 'projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_DISABLED',
                'MAYLEO_MISSING_CONFIG': 'projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_MISSING_CONFIG',
                'MAYLEO_INVALID_REQUEST': 'projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_INVALID_REQUEST',
                'MAYLEO_SERVICE_UNAVAILABLE': 'projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_SERVICE_UNAVAILABLE',
                'MAYLEO_UNKNOWN_ERROR': 'projects.items.mayleo-email-gateway.demo.form.errors.MAYLEO_UNKNOWN_ERROR'
            };

            const translationKey = errorMap[errorCode];
            const errorMessage = translationKey ? t(translationKey) : t('projects.items.mayleo-email-gateway.demo.form.error');

            showToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Grid variant="auto" style={{ marginTop: '2rem' }}>
                <GlassPanel>
                    <h3 className="card-title" style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
                        {t('projects.items.mayleo-email-gateway.demo.photo.title')}
                    </h3>
                    <PhotoPicker
                        photos={photos}
                        selectedId={selectedPhoto.id}
                        onSelect={handlePhotoSelect} />
                </GlassPanel>

                <GlassPanel>
                    <h3 className="card-title" style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
                        {t('projects.items.mayleo-email-gateway.demo.form.title')}
                    </h3>
                    <MessageForm
                        formData={formData}
                        handleChange={handleChange}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting} />
                </GlassPanel>
            </Grid>

            {toast && (
                <ToastContainer>
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                </ToastContainer>
            )}
        </>
    );
};
