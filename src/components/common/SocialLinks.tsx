import { Mail } from 'lucide-react';
import { parameters } from '@/config/parameters';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
    className?: string;
}

export const SocialLinks = ({ className = '' }: SocialLinksProps) => {
    return (
        <div className={`${styles.socialLinksContainer} ${className}`}>
            <a
                href={parameters.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.githubEmail}`}
                aria-label="GitHub"
            >
                <GithubIcon size={20} />
            </a>
            <a
                href={parameters.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.linkedin}`}
                aria-label="LinkedIn"
            >
                <LinkedinIcon size={20} />
            </a>
            <a
                href={`mailto:${parameters.email}`}
                className={`${styles.socialBtn} ${styles.githubEmail}`}
                aria-label="Email"
            >
                <Mail size={20} />
            </a>
        </div>
    );
};
