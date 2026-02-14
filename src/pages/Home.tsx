import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/common/PageLayout';
import { HomeHero } from '@/components/home/HomeHero';
import { BentoHomeCard } from '@/components/bento/BentoHomeCard';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { parameters } from '@/config/parameters';
import { TechStack } from '@/components/home/TechStack';
import { Layout, Server, Code2, User } from 'lucide-react';

import styles from './Home.module.css';

export const Home = () => {
    const { t } = useTranslation();

    return (
        <PageLayout seo={{
            title: t('home.hero.title'),
            description: t('home.hero.subtitle')
        }}>
            <HomeHero />

            <section className={styles.homeGrid}>
                {/* Main Projects Card */}
                <BentoHomeCard
                    icon={Layout}
                    title={t('home.projects.title')}
                    className={styles.colSpan2}
                    gradient="blue"
                    ctaLink="/projects"
                    ctaText={t('home.projects.cta')}
                >
                    <p>{t('home.projects.desc')}</p>
                </BentoHomeCard>

                {/* Tech Stack Card */}
                <BentoHomeCard
                    icon={Code2}
                    title={t('home.techStack.title')}
                    className={styles.colSpan1}
                >
                    <TechStack />
                </BentoHomeCard>

                {/* About Card */}
                <BentoHomeCard
                    icon={User}
                    title={t('home.about.title')}
                    className={styles.colSpan1}
                    ctaLink="/about"
                    ctaText={t('home.about.cta')}
                /* ctaSize="small" */
                >
                    <p>{t('home.about.desc')}</p>
                </BentoHomeCard>

                {/* Latest Project Card (Mayleo) */}
                <BentoHomeCard
                    icon={Server}
                    title={t('home.latestProject.title')}
                    className={styles.colSpan1}
                    gradient="purple"
                    ctaLink="/projects/mayleo"
                    ctaText={t('home.latestProject.cta')}
                    headerExtras={
                        <div className="bento-home-card-badge-container">
                            <ProjectStatus status={parameters.githubProjects.mayleoEmailGateway.status} />
                        </div>
                    }
                >
                    <p>{t('home.latestProject.desc')}</p>
                </BentoHomeCard>
            </section>
        </PageLayout>
    );
};
