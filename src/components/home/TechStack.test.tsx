import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechStack } from './TechStack';
import styles from './TechStack.module.css';

describe('TechStack', () => {
    it('renders all tech items', () => {
        render(<TechStack />);
        expect(screen.getByText('Java 17')).toBeInTheDocument();
        expect(screen.getByText('Spring Boot 3')).toBeInTheDocument();
        expect(screen.getByText('SQL')).toBeInTheDocument();
        expect(screen.getByText('React 19')).toBeInTheDocument();
        expect(screen.getByText('Vite 7')).toBeInTheDocument();
    });

    it('renders with correct CSS classes', () => {
        const { container } = render(<TechStack />);
        expect(container.querySelector(`.${styles.techGrid}`)).toBeInTheDocument();
        expect(container.querySelectorAll(`.${styles.techItem}`)).toHaveLength(5);
        expect(container.querySelector(`.${styles.techDot}.${styles.java}`)).toBeInTheDocument();
        expect(container.querySelector(`.${styles.techDot}.${styles.react}`)).toBeInTheDocument();
    });
});
