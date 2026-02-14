import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { parameters } from '@/config/parameters';

export interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export const SEO = ({ title, description, image, url, type = 'website' }: SEOProps) => {
    const { t } = useTranslation();

    const siteTitle = parameters.defaultSeo.title;
    const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || t('home.hero.subtitle') || parameters.defaultSeo.description;

    // OG images MUST be absolute URLs
    const imagePath = image || '/og-image.png';
    const baseUrl = (parameters.siteUrl || '').replace(/\/$/, '');
    const metaImage = imagePath.startsWith('http')
        ? imagePath
        : `${baseUrl}${imagePath}`;

    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />

            {/* Open Graph tags (Facebook, LinkedIn) */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:type" content={type} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};
