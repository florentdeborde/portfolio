import { ROUTES } from './routes';

export const parameters = {
    github: "https://github.com/florentdeborde",
    linkedin: "https://www.linkedin.com/in/florent-deborde-32ba9812a/",
    email: "florentdeborde.projects@gmail.com",

    githubProjects: {
        saasApp: {
            frontend: "https://github.com/florentdeborde/lunakit",
            backend: "https://github.com/florentdeborde/altair",
            status: "coming-soon" as const
        },
        mayleoEmailGateway: {
            backend: "https://github.com/florentdeborde/mayleo-email-gateway",
            rawReadme: "https://raw.githubusercontent.com/florentdeborde/mayleo-email-gateway/main/README.md",
            internalLink: ROUTES.PROJECTS.MAYLEO,
            demoLink: `${ROUTES.PROJECTS.MAYLEO}?tab=demo`,
            status: "operational" as const
        },
        fertenergie: {
            frontend: "https://github.com/florentdeborde/fertenergie",
            rawReadme: "https://raw.githubusercontent.com/florentdeborde/fertenergie/main/README.md",
            url: "https://fertenergie.fr",
            internalLink: ROUTES.PROJECTS.FERTENERGIE,
            status: "online" as const
        },
        energeticienne: {
            frontend: "https://github.com/florentdeborde/energeticienne",
            rawReadme: "https://raw.githubusercontent.com/florentdeborde/energeticienne/main/README.md",
            url: "https://www.isabelle-deborde-energeticienne.fr/",
            internalLink: ROUTES.PROJECTS.ENERGETICIENNE,
            status: "online" as const
        }
    }
};
