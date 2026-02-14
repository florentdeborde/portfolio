import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs } from './Tabs';

describe('Tabs Component', () => {
    const mockItems = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
        { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
    ];

    it('renders all tab buttons', () => {
        render(<Tabs items={mockItems} />);

        expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('renders the first tab content by default', () => {
        render(<Tabs items={mockItems} />);

        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('renders specific tab content when activeId is provided', () => {
        render(<Tabs items={mockItems} activeId="tab2" />);

        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('switches content when a tab is clicked', () => {
        const handleChange = vi.fn();
        render(<Tabs items={mockItems} onChange={handleChange} />);

        const tab2Button = screen.getByRole('tab', { name: 'Tab 2' });
        fireEvent.click(tab2Button);

        expect(screen.getByText('Content 2')).toBeInTheDocument();
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('updates active tab when activeId prop changes', () => {
        const { rerender } = render(<Tabs items={mockItems} activeId="tab1" />);

        expect(screen.getByText('Content 1')).toBeInTheDocument();

        rerender(<Tabs items={mockItems} activeId="tab3" />);

        expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
});
