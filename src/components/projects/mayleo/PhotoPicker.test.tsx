import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PhotoPicker } from './PhotoPicker';
import styles from './PhotoPicker.module.css';

const mockPhotos = [
    { id: 1, url: 'photo1.jpg', alt: 'Alt 1' },
    { id: 2, url: 'photo2.jpg', alt: 'Alt 2' },
];

describe('PhotoPicker', () => {
    it('renders all photos', () => {
        render(<PhotoPicker photos={mockPhotos} selectedId={1} onSelect={() => { }} />);

        expect(screen.getByRole('button', { name: /Select photo Alt 1/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Select photo Alt 2/i })).toBeInTheDocument();
    });

    it('shows check icon on selected photo', () => {
        const { container } = render(<PhotoPicker photos={mockPhotos} selectedId={2} onSelect={() => { }} />);

        // Find the selected photo container
        const options = screen.getAllByRole('button');
        // The second one should be selected
        expect(options[1]).toHaveClass(styles.selected);

        // Also verify check icon presence using class
        expect(container.querySelector(`.${styles.photoPickerCheckIcon}`)).toBeInTheDocument();
    });

    it('calls onSelect when a photo is clicked', () => {
        const onSelect = vi.fn();
        render(<PhotoPicker photos={mockPhotos} selectedId={1} onSelect={onSelect} />);

        fireEvent.click(screen.getByRole('button', { name: /Select photo Alt 2/i }));
        expect(onSelect).toHaveBeenCalledWith(mockPhotos[1]);
    });
});
