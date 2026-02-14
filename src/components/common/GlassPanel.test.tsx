import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GlassPanel } from './GlassPanel';
import styles from './GlassPanel.module.css';

describe('GlassPanel', () => {
    it('renders children correctly', () => {
        render(
            <GlassPanel>
                <div data-testid="child">Child Content</div>
            </GlassPanel>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('applies default class', () => {
        const { container } = render(
            <GlassPanel>
                <div>Content</div>
            </GlassPanel>
        );
        const panel = container.firstChild;
        expect(panel).toHaveClass(styles.glassPanel);
    });

    it('applies custom className', () => {
        const { container } = render(
            <GlassPanel className="custom-test-class">
                <div>Content</div>
            </GlassPanel>
        );
        const panel = container.firstChild;
        expect(panel).toHaveClass(styles.glassPanel);
        expect(panel).toHaveClass('custom-test-class');
    });

    it('applies custom style', () => {
        const { container } = render(
            <GlassPanel style={{ marginTop: '20px' }}>
                <div>Content</div>
            </GlassPanel>
        );
        const panel = container.firstChild;
        expect(panel).toHaveStyle({ marginTop: '20px' });
    });
});
