import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechStack, TechItem } from './TechStack';
import styles from './TechStack.module.css';

describe('TechStack', () => {
    const mockItems: TechItem[] = [
        { name: 'Java 17', class: 'java' },
        { name: 'Spring Boot 3', class: 'spring' },
        { name: 'React 19', class: 'react' }
    ];

    it('renders all tech items provided via props', () => {
        render(<TechStack items={mockItems} />);

        expect(screen.getByText('Java 17')).toBeInTheDocument();
        expect(screen.getByText('Spring Boot 3')).toBeInTheDocument();
        expect(screen.getByText('React 19')).toBeInTheDocument();
    });

    it('renders with correct CSS classes from CSS Modules', () => {
        const { container } = render(<TechStack items={[mockItems[0]]} />);

        const item = container.querySelector(`.${styles.techItem}`);
        const dot = container.querySelector(`.${styles.techDot}`);

        expect(item).toBeInTheDocument();
        expect(dot).toHaveClass(styles.java);
    });

    it('applies custom className when provided', () => {
        const customClass = 'custom-layout';
        const { container } = render(<TechStack items={mockItems} className={customClass} />);

        const mainDiv = container.firstChild;
        expect(mainDiv).toHaveClass(customClass);
        expect(mainDiv).toHaveClass(styles.techGrid);
    });

    it('renders the correct number of items', () => {
        render(<TechStack items={mockItems} />);
        const items = screen.getAllByText(/Java 17|Spring Boot 3|React 19/);
        expect(items).toHaveLength(3);
    });
});