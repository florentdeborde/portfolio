import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import { GithubIcon } from '@/components/common/BrandIcons';
import { PageLayout } from '@/components/common/PageLayout';

import { PhotoPicker } from '@/components/projects/mayleo/PhotoPicker';
import { MessageForm } from '@/components/projects/mayleo/MessageForm';
import { Toast, ToastContainer } from '@/components/common/Toast';
import { sendEmail } from '@/services/EmailService';
import { parameters } from '@/config/parameters';
import { GithubReadme } from '@/components/projects/GithubReadme';
import { Tabs } from '@/components/common/Tabs';

import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { ProjectLinkButton } from '@/components/projects/ProjectLinkButton';
import { GlassPanel } from '@/components/common/GlassPanel';
import { Grid } from '@/components/common/Grid';
import overviewStyles from '@/components/projects/ProjectOverview.module.css';

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
    url: new URL(`../../assets/postcards/${name}`, import.meta.url).href,
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

export const Mayleo = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [searchParams] = useSearchParams();
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

    const queryTab = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(queryTab || location.state?.activeTab || 'overview');

    useEffect(() => {
        if (queryTab) {
            setActiveTab(queryTab);
        }
    }, [queryTab]);

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


    const tabItems = [
        {
            id: 'overview',
            label: t('tabs.overview'),
            content: Overview(t, setActiveTab)
        },
        {
            id: 'github',
            label: 'GitHub',
            icon: <GithubIcon size={16} />,
            content: <GithubReadme repoRawUrl={parameters.githubProjects.mayleoEmailGateway.rawReadme} loadingText={t('projects.github-readme.loading')} errorText={t('projects.github-readme.error')} />
        },
        {
            id: 'demo',
            label: t('tabs.demo'),
            content: Demo(t, photos, selectedPhoto, handlePhotoSelect, formData, handleChange, handleSubmit, isSubmitting)
        }
    ];

    return (
        <PageLayout
            title={t('projects.items.mayleo-email-gateway.title-short')}
            subtitle={t('projects.items.mayleo-email-gateway.description')}
            backTo="/projects"
            seo={{
                title: t('projects.items.mayleo-email-gateway.title'),
                description: t('projects.items.mayleo-email-gateway.description')
            }}
        >
            <Tabs
                items={tabItems}
                activeId={activeTab}
                onChange={setActiveTab}
            />

            {toast && (
                <ToastContainer>
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                </ToastContainer>
            )}
        </PageLayout>
    );
};

export default Mayleo;

function Demo(
    t: TFunction,
    photos: Photo[],
    selectedPhoto: Photo,
    handlePhotoSelect: (photo: Photo) => void,
    formData: DemoFormData,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleSubmit: (e: React.FormEvent) => void,
    isSubmitting: boolean
) {
    return <Grid variant="auto" style={{ marginTop: '2rem' }}>
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
    </Grid>;
}

function Overview(t: TFunction, setActiveTab: (id: string) => void) {
    return <div className={overviewStyles.overviewGrid}>
        <GlassPanel>
            <h3 className="card-title">{t('projects.items.mayleo-email-gateway.overview.architecture.title')}</h3>
            <ProjectStatus
                status={parameters.githubProjects.mayleoEmailGateway.status}
                label="projects.items.mayleo-email-gateway.overview.architecture.apiStatus.label"
            />
            <p className={overviewStyles.cardDesc}>
                {t('projects.items.mayleo-email-gateway.overview.architecture.content')}
            </p>
        </GlassPanel>


        <GlassPanel>
            <h3 className="card-title">{t('projects.items.mayleo-email-gateway.overview.features.title')}</h3>
            <ul className={overviewStyles.overviewList} style={{ marginTop: '1rem', listStyle: 'none' }}>
                {Array.isArray(t('projects.items.mayleo-email-gateway.overview.features.list', { returnObjects: true })) &&
                    (t('projects.items.mayleo-email-gateway.overview.features.list', { returnObjects: true }) as string[]).map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: '0' }} />
                            {item}
                        </li>
                    ))}
            </ul>
        </GlassPanel>

        <GlassPanel>
            <h3 className="card-title">{t('projects.items.mayleo-email-gateway.overview.techStack.title')}</h3>
            <p className={overviewStyles.cardDesc}>
                {t('projects.items.mayleo-email-gateway.overview.techStack.content')}
            </p>
            <ul className={overviewStyles.overviewList} style={{ marginTop: '1rem', listStyle: 'none' }}>
                {Array.isArray(t('projects.items.mayleo-email-gateway.overview.techStack.list', { returnObjects: true })) &&
                    (t('projects.items.mayleo-email-gateway.overview.techStack.list', { returnObjects: true }) as string[]).map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: '0' }} />
                            {item}
                        </li>
                    ))}
            </ul>
        </GlassPanel>

        <GlassPanel>
            <h3 className="card-title">{t('projects.items.mayleo-email-gateway.overview.links.title')}</h3>
            <div className="links-list" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {parameters.githubProjects.mayleoEmailGateway.backend && (
                    <ProjectLinkButton href={parameters.githubProjects.mayleoEmailGateway.backend}>
                        <GithubIcon size={18} />
                        <span>{t('projects.links.github')}</span>
                    </ProjectLinkButton>
                )}
                <ProjectLinkButton
                    onClick={() => {
                        setActiveTab('demo');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    variant="primary"
                >
                    <Play size={18} fill="currentColor" />
                    <span>{t('tabs.demo')}</span>
                </ProjectLinkButton>
            </div>
        </GlassPanel>
    </div>;
}
