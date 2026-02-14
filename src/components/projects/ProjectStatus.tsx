import { useTranslation } from 'react-i18next';
import styles from './ProjectStatus.module.css';

export type ProjectStatusType = 'operational' | 'online' | 'maintenance' | 'coming-soon' | 'in-progress';

interface ProjectStatusProps {
    status?: ProjectStatusType;
    label?: string;
    className?: string;
    variant?: 'default' | 'absolute';
}

export const ProjectStatus = ({ status = 'operational', label, className = '', variant = 'default' }: ProjectStatusProps) => {
    const { t } = useTranslation();

    // Mapping 'kebab-case' status from props to 'camelCase' module classes and translation keys
    const getStatusConfig = (status: string) => {
        type StatusKey =
            | "projects.status.operational"
            | "projects.status.online"
            | "projects.status.maintenance"
            | "projects.status.comingSoon"
            | "projects.status.inProgress";

        const statusMap: Record<string, { className: string; key: StatusKey }> = {
            'operational': { className: styles.operational, key: 'projects.status.operational' },
            'online': { className: styles.online, key: 'projects.status.online' },
            'maintenance': { className: styles.maintenance, key: 'projects.status.maintenance' },
            'coming-soon': { className: styles.comingSoon, key: 'projects.status.comingSoon' },
            'in-progress': { className: styles.inProgress, key: 'projects.status.inProgress' },
        };

        return statusMap[status] || statusMap['operational'];
    };

    const config = getStatusConfig(status);

    const containerClasses = [
        styles.projectStatusContainer,
        variant === 'absolute' ? styles.absoluteStatusBadge : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            {label && (
                <span className={styles.projectStatusLabel}>
                    {
                        t(label)
                    }:
                </span>
            )}
            <div className={`${styles.projectStatusBadge} ${config.className}`}>
                <span className={styles.statusDot}></span>
                <span>{t(config.key)}</span>
            </div>
        </div>
    );
};
