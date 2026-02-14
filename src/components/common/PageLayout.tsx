import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO, SEOProps } from './SEO';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
    title?: string;
    subtitle?: string;
    backTo?: string;
    seo?: SEOProps;
    children: React.ReactNode;
}

export const PageLayout = ({ title, subtitle, backTo, seo, children }: PageLayoutProps) => {
    const { t } = useTranslation();

    const seoTitle = seo?.title || title;
    const seoDescription = seo?.description || subtitle;

    return (
        <div className="container">
            <SEO
                title={seoTitle}
                description={seoDescription}
                image={seo?.image}
                url={seo?.url}
                type={seo?.type}
            />
            {backTo && (
                <Link to={backTo} className={styles.backLink}>
                    <ArrowLeft size={20} />
                    {t('nav.projects')}
                </Link>
            )}
            <header>
                {title && <h1>{title}</h1>}
                {subtitle && <div className="subtitle">{subtitle}</div>}
            </header>
            {children}
        </div>
    );
};

export default PageLayout;
