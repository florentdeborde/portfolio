import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { GithubIcon, ExternalLinkIcon } from '@/components/common/BrandIcons';
import { PageLayout } from '@/components/common/PageLayout';
import { parameters } from '@/config/parameters';
import { GithubReadme } from '@/components/projects/GithubReadme';
import { Tabs } from '@/components/common/Tabs';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { ProjectLinkButton } from '@/components/projects/ProjectLinkButton';
import { GlassPanel } from '@/components/common/GlassPanel';
import overviewStyles from '@/components/projects/ProjectOverview.module.css';

export const Energeticienne = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const queryTab = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(queryTab || location.state?.activeTab || 'overview');

    useEffect(() => {
        if (queryTab) {
            setActiveTab(queryTab);
        }
    }, [queryTab]);

    const tabItems = [
        {
            id: 'overview',
            label: t('tabs.overview'),
            content: Overview(t)
        },
        {
            id: 'github',
            label: 'GitHub',
            icon: <GithubIcon size={16} />,
            content: <GithubReadme
                repoRawUrl={parameters.githubProjects.energeticienne.rawReadme}
                loadingText={t('projects.github-readme.loading')}
                errorText={t('projects.github-readme.error')}
            />
        }
    ];

    return (
        <PageLayout
            title={t('projects.items.energeticienne.title-short')}
            subtitle={t('projects.items.energeticienne.description')}
            backTo="/projects"
            seo={{ title: t('projects.items.energeticienne.title') }}
        >
            <Tabs
                items={tabItems}
                activeId={activeTab}
                onChange={setActiveTab}
            />
        </PageLayout>
    );
};

export default Energeticienne;

function Overview(t: TFunction) {
    return <div className={overviewStyles.overviewGrid} data-testid="project-overview-grid">
        <GlassPanel>
            <h3 className="card-title">{t('projects.items.energeticienne.overview.architecture.title')}</h3>
            <ProjectStatus
                status={parameters.githubProjects.energeticienne.status}
                label="projects.items.energeticienne.overview.architecture.siteStatus.label"
            />
            <p className={overviewStyles.cardDesc}>
                {t('projects.items.energeticienne.overview.architecture.content')}
            </p>
        </GlassPanel>

        <GlassPanel>
            <h3 className="card-title">{t('projects.items.energeticienne.overview.features.title')}</h3>
            <ul className={overviewStyles.overviewList} style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                {Array.isArray(t('projects.items.energeticienne.overview.features.list', { returnObjects: true })) &&
                    (t('projects.items.energeticienne.overview.features.list', { returnObjects: true }) as string[]).map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: '0' }} />
                            <span>{item}</span>
                        </li>
                    ))}
            </ul>
        </GlassPanel>

        <GlassPanel>
            <h3 className="card-title">{t('projects.items.energeticienne.overview.techStack.title')}</h3>
            <p className={overviewStyles.cardDesc}>
                {t('projects.items.energeticienne.overview.techStack.content')}
            </p>
            <ul className={overviewStyles.overviewList} style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                {Array.isArray(t('projects.items.energeticienne.overview.techStack.list', { returnObjects: true })) &&
                    (t('projects.items.energeticienne.overview.techStack.list', { returnObjects: true }) as string[]).map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: '0' }} />
                            <span>{item}</span>
                        </li>
                    ))}
            </ul>
        </GlassPanel>

        <GlassPanel>
            <h3 className="card-title">{t('projects.items.energeticienne.overview.links.title')}</h3>
            <div className="links-list" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {parameters.githubProjects.energeticienne.frontend && (
                    <ProjectLinkButton href={parameters.githubProjects.energeticienne.frontend}>
                        <GithubIcon size={18} />
                        <span>{t('projects.links.github')}</span>
                    </ProjectLinkButton>
                )}
                {parameters.githubProjects.energeticienne.url && (
                    <ProjectLinkButton href={parameters.githubProjects.energeticienne.url}>
                        <ExternalLinkIcon size={18} />
                        <span>{t('projects.links.external')}</span>
                    </ProjectLinkButton>
                )}
            </div>
        </GlassPanel>
    </div>;
}
