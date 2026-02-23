import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ReadmeSkeleton } from './ReadmeSkeleton';
import styles from './GithubReadme.module.css';

describe('ReadmeSkeleton', () => {
    it('renders the skeleton container and lines', () => {
        const { container } = render(<ReadmeSkeleton />);

        const skeletonContainer = container.querySelector(`.${styles.skeletonContainer}`);
        expect(skeletonContainer).toBeInTheDocument();

        const lines = container.querySelectorAll(`.${styles.skeletonLine}`);
        // Based on ReadmeSkeleton.tsx, we expect 9 lines (5 for first section, 4 for second)
        expect(lines.length).toBe(9);
    });

    it('applies specific classes for different skeleton elements', () => {
        const { container } = render(<ReadmeSkeleton />);

        expect(container.querySelector(`.${styles.skeletonMeta}`)).toBeInTheDocument();
        expect(container.querySelectorAll(`.${styles.skeletonTitle}`).length).toBe(2);
        expect(container.querySelectorAll(`.${styles.skeletonShort}`).length).toBe(2);
    });
});
