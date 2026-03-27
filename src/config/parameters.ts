import { ROUTES } from './routes';
import { Mail, Shield, UserRoundSearch, Leaf, Zap } from 'lucide-react';
import { Project } from '@/types/project';

export const parameters = {
    siteUrl: import.meta.env.VITE_SITE_URL,
    github: "https://github.com/florentdeborde",
    linkedin: "https://www.linkedin.com/in/florent-deborde-32ba9812a/",
    email: "florentdeborde.projects@gmail.com",
    defaultSeo: {
        title: "Florent Deborde - Full-Stack Developer",
        description: "Modern portfolio of Florent Deborde, a Full-Stack Developer focused on robust and high-performance applications."
    },
    techStack: {
        backend: [
            { name: 'Java 17', class: 'java' },
            { name: 'Spring Boot 3', class: 'core-spring' },
            { name: 'SQL', class: 'data-infra' },
            { name: 'Docker', class: 'data-infra' },
            { name: 'ShedLock', class: 'utils' },
        ],
        frontend: [
            { name: 'React 19', class: 'core-react' },
            { name: 'Vite 7', class: 'core-react' },
            { name: 'JavaScript', class: 'ts-js' },
            { name: 'TypeScript', class: 'ts-js' },
            { name: 'i18n', class: 'utils' },
        ],
    },

    projects: [
        {
            id: 'mayleo-email-gateway',
            icon: Mail,
            color: 'blob-orange',
            size: 'full',
            category: 'microservice',
            tech: ['spring_boot', 'java', 'mysql'],
            githubBackend: "https://github.com/florentdeborde/mayleo-email-gateway",
            rawReadme: "https://raw.githubusercontent.com/florentdeborde/mayleo-email-gateway/main/README.md",
            internalLink: ROUTES.PROJECTS.MAYLEO,
            demoLink: `${ROUTES.PROJECTS.MAYLEO}?tab=demo`,
            status: "operational",
            hasDemo: true,
            demoId: "mayleo",
        },
        {
            id: 'altair',
            icon: Shield,
            color: 'blob-blue',
            size: 'full',
            category: 'full_stack_app',
            tech: ['spring_boot', 'java', 'postgresql', 'react', 'vite', 'javascript'],
            rawReadmeBackend: "https://gist.githubusercontent.com/florentdeborde/571d762ede136b6348de6a978647cc34/raw/d367aa7afc855914ed8f325ff7df1ea0af64e8a7",
            rawReadmeFrontend: "https://gist.githubusercontent.com/florentdeborde/b08bc42a70e7c06b1bea25089aa7b748/raw/522ae1eadd9b6de7ef19ca04361d325b24a2e668",
            internalLink: ROUTES.PROJECTS.ALTAIR,
            demoLink: `${ROUTES.PROJECTS.ALTAIR}?tab=demo`,
            external: "https://altair.florentdeborde.fr/",
            status: "operational",
            hasDemo: true,
            demoId: "altair",
            isClickable: true
        },
        {
            id: 'portfolio',
            icon: UserRoundSearch,
            color: 'blob-purple',
            size: 'wide',
            category: 'portfolio',
            tech: ['react', 'vite', 'typescript'],
            githubFrontend: "https://github.com/florentdeborde/portfolio",
            rawReadme: "https://raw.githubusercontent.com/florentdeborde/portfolio/main/README.md",
            internalLink: ROUTES.PROJECTS.PORTFOLIO,
            external: "https://florentdeborde-portfolio.vercel.app/",
            status: "online"
        },
        {
            id: 'energeticienne',
            icon: Leaf,
            color: 'blob-purple',
            size: 'wide',
            category: 'wellness_blog',
            tech: ['react', 'vite', 'javascript'],
            githubFrontend: "https://github.com/florentdeborde/energeticienne",
            rawReadme: "https://raw.githubusercontent.com/florentdeborde/energeticienne/main/README.md",
            internalLink: ROUTES.PROJECTS.ENERGETICIENNE,
            external: "https://www.isabelle-deborde-energeticienne.fr/",
            status: "online"
        },
        {
            id: 'fertenergie',
            icon: Zap,
            color: 'blob-green',
            size: 'wide',
            category: 'citizen_blog',
            tech: ['react', 'vite', 'javascript'],
            githubFrontend: "https://github.com/florentdeborde/fertenergie",
            rawReadme: "https://raw.githubusercontent.com/florentdeborde/fertenergie/main/README.md",
            internalLink: ROUTES.PROJECTS.FERTENERGIE,
            external: "https://fertenergie.fr",
            status: "online"
        }
    ] as Project[]
};

