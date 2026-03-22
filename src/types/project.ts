import { LucideIcon } from 'lucide-react';
import { ProjectStatusType } from '@/components/projects/ProjectStatus';

export type TechStackKey =
    | 'react'
    | 'spring_boot'
    | 'java'
    | 'mysql'
    | 'postgresql'
    | 'css'
    | 'vite'
    | 'javascript'
    | 'typescript'
    | 'smtp'
    | 'docker'
    | 'framer_motion'
    | 'i18next';

export interface Project {
    id: string;
    icon: LucideIcon;
    color: string;
    size: 'large' | 'wide' | 'full' | 'large-full' | 'normal';
    category: 'microservice' | 'portfolio' | 'wellness_blog' | 'citizen_blog' | 'full_stack_app';
    tech: TechStackKey[];
    status?: ProjectStatusType;
    internalLink: string;
    github?: string;
    githubBackend?: string;
    githubFrontend?: string;
    external?: string;
    demoLink?: string;
    rawReadme?: string;
    rawReadmeFrontend?: string;
    rawReadmeBackend?: string;
    hasDemo?: boolean;
    demoId?: string;
    isClickable?: boolean;
}
