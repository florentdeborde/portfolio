import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoHeader } from './BentoHeader';

// Mock Icon component
const MockIcon = (props: React.ComponentProps<'svg'>) => <svg data-testid="mock-icon" {...props} />;

describe('BentoHeader', () => {
    it('renders title correctly', () => {
        render(<BentoHeader icon={MockIcon} title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
        render(<BentoHeader icon={MockIcon} title="Test Title" subtitle="Test Subtitle" />);
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders icon correctly', () => {
        render(<BentoHeader icon={MockIcon} title="Test Title" />);
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<BentoHeader icon={MockIcon} title="Test Title" className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
        // CSS Modules class names might be hashed or transformed. 
        // We check if the class list contains the expected module class name part.
        const classList = (container.firstChild as HTMLElement).className;
        expect(classList).toMatch(/bentoHeader/);
    });
});
