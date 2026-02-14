import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Grid, gridStyles } from './Grid';

describe('Grid', () => {
    it('renders children correctly', () => {
        render(
            <Grid>
                <div data-testid="child">Child Content</div>
            </Grid>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('applies standard variant by default', () => {
        const { container } = render(
            <Grid>
                <div>Content</div>
            </Grid>
        );
        const grid = container.firstChild;
        expect(grid).toHaveClass(gridStyles.gridBase);
        expect(grid).toHaveClass(gridStyles.gridStandard);
    });

    it('applies auto variant when specified', () => {
        const { container } = render(
            <Grid variant="auto">
                <div>Content</div>
            </Grid>
        );
        const grid = container.firstChild;
        expect(grid).toHaveClass(gridStyles.gridBase);
        expect(grid).toHaveClass(gridStyles.gridAuto);
    });

    it('applies custom className', () => {
        const { container } = render(
            <Grid className="custom-grid-class">
                <div>Content</div>
            </Grid>
        );
        const grid = container.firstChild;
        expect(grid).toHaveClass('custom-grid-class');
    });

    it('applies custom style', () => {
        const { container } = render(
            <Grid style={{ gap: '50px' }}>
                <div>Content</div>
            </Grid>
        );
        const grid = container.firstChild;
        expect(grid).toHaveStyle({ gap: '50px' });
    });
});
