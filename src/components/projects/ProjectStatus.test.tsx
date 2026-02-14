import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectStatus, ProjectStatusType } from './ProjectStatus';
import styles from './ProjectStatus.module.css';

// Mocking translations to return the key string
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('ProjectStatus', () => {
    it('renders correctly with default props (operational)', () => {
        const { container } = render(<ProjectStatus />);
        expect(screen.getByText('projects.status.operational')).toBeInTheDocument();
        expect(container.firstChild).toHaveClass(styles.projectStatusContainer);
        expect(container.querySelector(`.${styles.projectStatusBadge}.${styles.operational}`)).toBeInTheDocument();
    });

    it('renders "in-progress" status correctly using the camelCase key', () => {
        const { container } = render(<ProjectStatus status="in-progress" />);
        expect(screen.getByText('projects.status.inProgress')).toBeInTheDocument();
        expect(container.querySelector(`.${styles.projectStatusBadge}.${styles.inProgress}`)).toBeInTheDocument();
    });

    it('renders "coming-soon" status correctly using the camelCase key', () => {
        const { container } = render(<ProjectStatus status="coming-soon" />);
        expect(screen.getByText('projects.status.comingSoon')).toBeInTheDocument();
        expect(container.querySelector(`.${styles.projectStatusBadge}.${styles.comingSoon}`)).toBeInTheDocument();
    });

    it('renders "maintenance" status correctly', () => {
        const { container } = render(<ProjectStatus status="maintenance" />);
        expect(screen.getByText('projects.status.maintenance')).toBeInTheDocument();
        expect(container.querySelector(`.${styles.maintenance}`)).toBeInTheDocument();
    });

    it('renders unknown status using the operational fallback', () => {
        const { container } = render(<ProjectStatus status={"unknown-status" as ProjectStatusType} />);
        expect(screen.getByText('projects.status.operational')).toBeInTheDocument();
        expect(container.querySelector(`.${styles.operational}`)).toBeInTheDocument();
    });

    it('applies a custom CSS className to the container', () => {
        const { container } = render(<ProjectStatus className="custom-test-class" />);
        expect(container.firstChild).toHaveClass('custom-test-class');
        expect(container.firstChild).toHaveClass(styles.projectStatusContainer);
    });

    it('handles absolute variant', () => {
        const { container } = render(<ProjectStatus variant="absolute" />);
        expect(container.firstChild).toHaveClass(styles.absoluteStatusBadge);
    });
});