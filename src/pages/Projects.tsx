import { useTranslation } from 'react-i18next';
import { BentoProjectCard } from '@/components/bento/BentoProjectCard';
import { parameters } from '@/config/parameters';
import { PageLayout } from '@/components/common/PageLayout';
import { Grid } from '@/components/common/Grid';

export const Projects = () => {
  const { t } = useTranslation();
  const projects = parameters.projects;

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
