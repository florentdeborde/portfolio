import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Button } from './Button';

describe('Button', () => {
    it('renders as a button element by default', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as a link when "to" prop is provided', () => {
        render(
            <MemoryRouter>
                <Button to="/somewhere">Go somewhere</Button>
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /go somewhere/i });
        expect(link).toHaveAttribute('href', '/somewhere');
    });

    it('renders as an anchor when "href" prop is provided', () => {
        render(<Button href="https://example.com">External Link</Button>);

        const anchor = screen.getByRole('link', { name: /external link/i });
        expect(anchor).toHaveAttribute('href', 'https://example.com');
        expect(anchor).toHaveAttribute('target', '_blank');
        expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders with an icon', () => {
        const Icon = () => <span data-testid="test-icon">icon</span>;
        render(<Button icon={<Icon />}>With Icon</Button>);

        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        expect(screen.getByText(/with icon/i)).toBeInTheDocument();
    });
    it('applies type attribute correctly', () => {
        render(<Button type="submit">Submit</Button>);
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('applies disabled attribute correctly', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button', { name: /disabled/i });
        expect(button).toBeDisabled();
    });

    it('applies custom style', () => {
        render(<Button style={{ marginTop: '10px' }}>Styled</Button>);
        const button = screen.getByRole('button', { name: /styled/i });
        expect(button).toHaveStyle({ marginTop: '10px' });
    });
});
