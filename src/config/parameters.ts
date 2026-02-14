import { ROUTES } from './routes';
import { Mail, Shield, UserRoundSearch, Leaf, Zap } from 'lucide-react';
import { Project } from '@/types/project';

export const parameters = {
    github: "https://github.com/florentdeborde",
    linkedin: "https://www.linkedin.com/in/florent-deborde-32ba9812a/",
    email: "florentdeborde.projects@gmail.com",
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
        },
        {
            id: 'saas-app',
            icon: Shield,
            color: 'blob-blue',
            size: 'full',
            category: 'full_stack_app',
            tech: ['spring_boot', 'java', 'postgresql', 'react', 'vite', 'javascript'],
            githubFrontend: "https://github.com/florentdeborde/lunakit",
            githubBackend: "https://github.com/florentdeborde/altair",
            internalLink: "/projects/saas-app",
            status: "coming-soon",
            isClickable: false
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

