import { useTranslation } from 'react-i18next';
import { Leaf, Zap, Mail, Shield } from 'lucide-react';
import { BentoProjectCard, Project } from '@/components/bento/BentoProjectCard';
import { parameters } from '@/config/parameters';
import { PageLayout } from '@/components/common/PageLayout';
import { Grid } from '@/components/common/Grid';

const projects: Project[] = [
  {
    id: 'mayleo-email-gateway',
    icon: Mail,
    color: 'blob-orange',
    size: 'full',
    category: 'microservice',
    tech: ['spring_boot', 'mysql'],
    githubBackend: parameters.githubProjects.mayleoEmailGateway.backend,
    internalLink: parameters.githubProjects.mayleoEmailGateway.internalLink,
    demoLink: parameters.githubProjects.mayleoEmailGateway.demoLink,
    status: parameters.githubProjects.mayleoEmailGateway.status
  },
  {
    id: 'energeticienne',
    icon: Leaf,
    color: 'blob-purple',
    size: 'wide',
    category: 'wellness_blog',
    tech: ['react', 'vite'],
    githubFrontend: parameters.githubProjects.energeticienne.frontend,
    internalLink: parameters.githubProjects.energeticienne.internalLink,
    external: parameters.githubProjects.energeticienne.url,
    status: parameters.githubProjects.energeticienne.status
  },
  {
    id: 'fertenergie',
    icon: Zap,
    color: 'blob-green',
    size: 'wide',
    category: 'citizen_blog',
    tech: ['react', 'vite'],
    githubFrontend: parameters.githubProjects.fertenergie.frontend,
    internalLink: parameters.githubProjects.fertenergie.internalLink,
    external: parameters.githubProjects.fertenergie.url,
    status: parameters.githubProjects.fertenergie.status
  },
  {
    id: 'saas-app',
    icon: Shield,
    color: 'blob-blue',
    size: 'large-full',
    category: 'full_stack_app',
    tech: ['spring_boot', 'postgresql', 'react', 'vite'],
    githubFrontend: parameters.githubProjects.saasApp.frontend,
    githubBackend: parameters.githubProjects.saasApp.backend,
    status: parameters.githubProjects.saasApp.status
  }
];

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('projects.header.title')}
      subtitle={t('projects.header.subtitle')}
    >
      <Grid variant="standard">
        {projects.map(project => (
          <BentoProjectCard key={project.id} project={project} />
        ))}
      </Grid>
    </PageLayout>
  );
};
