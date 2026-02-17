import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { GithubIcon, ExternalLinkIcon } from '@/components/common/BrandIcons';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { BentoCard } from './BentoCard';
import styles from './BentoProjectCard.module.css';

import { Project } from '@/types/project';

interface BentoProjectCardProps {
    project: Project;
}

export const BentoProjectCard = ({ project }: BentoProjectCardProps) => {
    const { t } = useTranslation();
    const Icon = project.icon;

    const content = (
        <>
            <div className={`card-blob ${project.color}`} />

            <div className="flex flex-col h-full">
                {project.status && (
                    <ProjectStatus
                        status={project.status}
                        variant="absolute"
                    />
                )}

                <div className={styles.bentoProjectCardFooter}>
                    <div className={styles.bentoProjectCardTags}>
                        {project.tech.map(tag => (
                            <span key={tag} className={styles.bentoProjectCardTag}>
                                {t(`projects.tech.${tag}`)}
                            </span>
                        ))}
                    </div>

                    <div className={styles.bentoProjectCardLinks} onClick={(e) => e.stopPropagation()} role="presentation">
                        {project.github && !project.githubFrontend && !project.githubBackend && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.bentoProjectCardLink}
                                title={t('projects.links.github')}
                                aria-label={`${t('projects.links.github')} - ${project.id}`}
                            >
                                <GithubIcon size={18} aria-hidden="true" />
                            </a>
                        )}
                        {project.githubBackend && (
                            <a
                                href={project.githubBackend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.bentoProjectCardLink}
                                title={t('projects.links.githubBackend')}
                                aria-label={`${t('projects.links.githubBackend')} - ${project.id}`}
                            >
                                <div className={styles.bentoProjectCardLinkIconStack} aria-hidden="true">
                                    <GithubIcon size={18} />
                                    <span className={styles.bentoProjectCardLinkLabel}>BE</span>
                                </div>
                            </a>
                        )}
                        {project.githubFrontend && (
                            <a
                                href={project.githubFrontend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.bentoProjectCardLink}
                                title={t('projects.links.githubFrontend')}
                                aria-label={`${t('projects.links.githubFrontend')} - ${project.id}`}
                            >
                                <div className={styles.bentoProjectCardLinkIconStack} aria-hidden="true">
                                    <GithubIcon size={18} />
                                    <span className={styles.bentoProjectCardLinkLabel}>FE</span>
                                </div>
                            </a>
                        )}
                        {project.external && (
                            <a
                                href={project.external}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.bentoProjectCardLink}
                                title={t('projects.links.external')}
                                aria-label={`${t('projects.links.external')} - ${project.id}`}
                            >
                                <ExternalLinkIcon size={18} aria-hidden="true" />
                            </a>
                        )}
                        {project.demoLink && (
                            <Link
                                to={project.demoLink}
                                state={{ activeTab: 'demo' }}
                                className={styles.bentoProjectCardLink}
                                title={t('projects.links.tryIt')}
                                aria-label={`${t('projects.links.tryIt')} - ${project.id}`}
                                style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', background: 'rgba(59, 130, 246, 0.1)' }}
                            >
                                <Play size={18} fill="currentColor" aria-hidden="true" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    const isClickable = project.isClickable !== false;

    return (
        <BentoCard
            size={project.size}
            to={isClickable ? project.internalLink : undefined}
            className={`block text-left ${!isClickable ? styles.disabledCard : ''}`} // Ensure text alignment for project cards
            headerIcon={Icon}
            headerTitle={t(`projects.items.${project.id}.title`)}
            headerSubtitle={t(`projects.categories.${project.category}`)}
            description={t(`projects.items.${project.id}.description`)}
        >
            <div className={!isClickable ? 'pointer-events-none opacity-80' : ''}>
                {content}
            </div>
        </BentoCard>
    );
};
