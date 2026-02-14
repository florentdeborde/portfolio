import { useParams, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { GithubIcon, ExternalLinkIcon } from '@/components/common/BrandIcons';
import { PageLayout } from '@/components/common/PageLayout';
import { parameters } from '@/config/parameters';
import { Tabs } from '@/components/common/Tabs';
import { GithubReadme } from '@/components/projects/GithubReadme';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { ProjectLinkButton } from '@/components/projects/ProjectLinkButton';
import { GlassPanel } from '@/components/common/GlassPanel';
import overviewStyles from '@/components/projects/ProjectOverview.module.css';
import { Project } from '@/types/project';

import { MayleoDemo } from '@/components/projects/mayleo/MayleoDemo';

export const ProjectDetails = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { t } = useTranslation();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const project = parameters.projects.find(p => p.id === projectId || p.internalLink === `/projects/${projectId}`);

    const activeTab = searchParams.get('tab') || (location.state as { activeTab?: string })?.activeTab || 'overview';

    const handleTabChange = (id: string) => {
        setSearchParams({ tab: id }, { replace: true });
    };

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    // Special case for Mayleo which has a complex demo and logic
    // We can either keep Mayleo.tsx as is but use it as a sub-component, 
    // or refactor it into the generic structure.
    // For now, let's use the generic structure for everything except the 'demo' tab content.

    const tabItems = [
        {
            id: 'overview',
            label: t('tabs.overview'),
            content: <Overview t={t} project={project} setActiveTab={handleTabChange} />
        }
    ];

    if (project.rawReadme) {
        tabItems.push({
            id: 'github',
            label: 'GitHub',
            content: <GithubReadme
                repoRawUrl={project.rawReadme}
                loadingText={t('projects.github-readme.loading')}
                errorText={t('projects.github-readme.error')}
            />
        });
    }

    // Dynamic Demo Injection
    if (project.hasDemo) {
        tabItems.push({
            id: 'demo',
            label: t('tabs.demo'),
            content: project.id === 'mayleo-email-gateway' ? <MayleoDemo /> : <div>Demo coming soon...</div>
        });
    }

    return (
        <PageLayout
            title={t(`projects.items.${project.id}.title-short`, { defaultValue: t(`projects.items.${project.id}.title`) })}
            subtitle={t(`projects.items.${project.id}.description`)}
            backTo="/projects"
            seo={{
                title: t(`projects.items.${project.id}.title`),
                description: t(`projects.items.${project.id}.description`)
            }}
        >
            <Tabs
                items={tabItems}
                activeId={activeTab}
                onChange={handleTabChange}
            />
        </PageLayout>
    );
};

interface OverviewProps {
    t: TFunction;
    project: Project;
    setActiveTab: (id: string) => void;
}

const Overview = ({ t, project, setActiveTab }: OverviewProps) => {
    const featuresList = t(`projects.items.${project.id}.overview.features.list`, { returnObjects: true });
    const techStackList = t(`projects.items.${project.id}.overview.techStack.list`, { returnObjects: true });

    return (
        <div className={overviewStyles.overviewGrid} data-testid="project-overview-grid">
            <GlassPanel>
                <h3 className="card-title">{t(`projects.items.${project.id}.overview.architecture.title`)}</h3>
                <ProjectStatus
                    status={project.status}
                    label={`projects.items.${project.id}.overview.architecture.${project.id === 'mayleo-email-gateway' ? 'apiStatus' : 'siteStatus'}.label`}
                />
                <p className={overviewStyles.cardDesc}>
                    {t(`projects.items.${project.id}.overview.architecture.content`)}
                </p>
            </GlassPanel>

            <GlassPanel>
                <h3 className="card-title">{t(`projects.items.${project.id}.overview.features.title`)}</h3>
                <ul className={overviewStyles.overviewList} style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                    {Array.isArray(featuresList) && featuresList.map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: '0' }} />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </GlassPanel>

            <GlassPanel>
                <h3 className="card-title">{t(`projects.items.${project.id}.overview.techStack.title`)}</h3>
                <p className={overviewStyles.cardDesc}>
                    {t(`projects.items.${project.id}.overview.techStack.content`)}
                </p>
                <ul className={overviewStyles.overviewList} style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                    {Array.isArray(techStackList) && techStackList.map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: '0' }} />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </GlassPanel>

            <GlassPanel>
                <h3 className="card-title">{t(`projects.items.${project.id}.overview.links.title`)}</h3>
                <div className="links-list" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {project.github && (
                        <ProjectLinkButton href={project.github}>
                            <GithubIcon size={18} />
                            <span>{t('projects.links.github')}</span>
                        </ProjectLinkButton>
                    )}
                    {project.githubBackend && (
                        <ProjectLinkButton href={project.githubBackend}>
                            <GithubIcon size={18} />
                            <span>{t('projects.links.githubBackend')}</span>
                        </ProjectLinkButton>
                    )}
                    {project.githubFrontend && (
                        <ProjectLinkButton href={project.githubFrontend}>
                            <GithubIcon size={18} />
                            <span>{t('projects.links.githubFrontend')}</span>
                        </ProjectLinkButton>
                    )}
                    {project.external && (
                        <ProjectLinkButton href={project.external}>
                            <ExternalLinkIcon size={18} />
                            <span>{t('projects.links.external')}</span>
                        </ProjectLinkButton>
                    )}
                    {project.hasDemo && (
                        <ProjectLinkButton
                            onClick={() => {
                                setActiveTab('demo');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            variant="primary"
                        >
                            <span>{t('tabs.demo')}</span>
                        </ProjectLinkButton>
                    )}
                </div>
            </GlassPanel>
        </div>
    );
};

export default ProjectDetails;
