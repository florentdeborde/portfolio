import { useTranslation } from 'react-i18next';
import { User, Globe, Heart } from 'lucide-react';
import { PageLayout } from '@/components/common/PageLayout';
import { BentoCard } from '@/components/bento/BentoCard';
import { Grid } from '@/components/common/Grid';

export const About = () => {
    const { t } = useTranslation();

    return (
        <PageLayout
            title={t('about.title')}
            subtitle={t('about.subtitle')}
            seo={{ description: t('about.intro.desc') }}
        >
            <Grid variant="standard">
                {/* Personal Summary - Full Width */}
                <BentoCard
                    size="full"
                    headerIcon={User}
                    headerTitle={t('about.intro.title')}
                    description={t('about.intro.desc')}
                />

                {/* International Profile - Side by Side */}
                <BentoCard
                    size="wide"
                    headerIcon={Globe}
                    headerTitle={t('about.international.title')}
                    description={t('about.international.desc')}
                />

                {/* Values & Community - Side by Side */}
                <BentoCard
                    size="wide"
                    headerIcon={Heart}
                    headerTitle={t('about.values.title')}
                    description={t('about.values.desc')}
                />
            </Grid>
        </PageLayout>
    );
};

