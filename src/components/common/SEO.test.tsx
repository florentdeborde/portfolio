
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Unmock to test real metadata generation
vi.unmock('react-helmet-async');

import { SEO } from './SEO';
import { HelmetProvider } from 'react-helmet-async';

// Mock translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('SEO Component', () => {
    const renderSEO = (props: Partial<React.ComponentProps<typeof SEO>> = {}) => {
        return render(
            <HelmetProvider>
                <SEO {...props} />
            </HelmetProvider>
        );
    };

    const siteTitle = 'Florent Deborde - Full-Stack Developer';
    const siteUrl = '';

    it('renders default title and description', async () => {
        renderSEO();

        await waitFor(() => {
            expect(document.title).toBe(siteTitle);
            const metaDescription = document.querySelector('meta[name="description"]');
            expect(metaDescription).toHaveAttribute('content', 'home.hero.subtitle');
        });
    });

    it('renders custom title and description', async () => {
        const props = {
            title: 'Custom Title',
            description: 'Custom Description'
        };
        renderSEO(props);

        await waitFor(() => {
            expect(document.title).toBe(`Custom Title | ${siteTitle}`);
            const metaDescription = document.querySelector('meta[name="description"]');
            expect(metaDescription).toHaveAttribute('content', 'Custom Description');
        });
    });

    it('renders Open Graph tags correctly', async () => {
        const props = {
            title: 'OG Title',
            description: 'OG Description',
            image: '/test-image.jpg',
            url: 'https://test.com',
            type: 'article'
        };
        renderSEO(props);

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute('content', `OG Title | ${siteTitle}`);
            expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute('content', 'OG Description');
            expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute('content', `${siteUrl}/test-image.jpg`);
            expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute('content', 'https://test.com');
            expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'article');
        });
    });

    it('renders Twitter Card tags correctly', async () => {
        const props = {
            title: 'Twitter Title',
            description: 'Twitter Description',
            image: '/twitter-image.jpg'
        };
        renderSEO(props);

        await waitFor(() => {
            expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
            expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute('content', `Twitter Title | ${siteTitle}`);
            expect(document.querySelector('meta[name="twitter:description"]')).toHaveAttribute('content', 'Twitter Description');
            expect(document.querySelector('meta[name="twitter:image"]')).toHaveAttribute('content', `${siteUrl}/twitter-image.jpg`);
        });
    });
});
