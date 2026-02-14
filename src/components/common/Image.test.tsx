import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Image } from './Image';

describe('Image Component', () => {
    it('renders an img tag with correct attributes', () => {
        render(<Image src="test.jpg" alt="Test Image" width={100} height={100} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'test.jpg');
        expect(img).toHaveAttribute('alt', 'Test Image');
        expect(img).toHaveAttribute('width', '100');
        expect(img).toHaveAttribute('height', '100');
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(img).toHaveAttribute('decoding', 'async');
    });

    it('renders a picture tag when sources are provided', () => {
        const sources = [
            { srcSet: 'test.webp', type: 'image/webp' },
            { srcSet: 'test.avif', type: 'image/avif' },
        ];
        const { container } = render(<Image src="test.jpg" alt="Test Image" sources={sources} />);
        const picture = container.querySelector('picture');
        expect(picture).toBeInTheDocument();
        const sourceTags = container.querySelectorAll('source');
        expect(sourceTags).toHaveLength(2);
        expect(sourceTags[0]).toHaveAttribute('srcset', 'test.webp');
        expect(sourceTags[0]).toHaveAttribute('type', 'image/webp');
    });

    it('handles image load event', () => {
        const onLoad = vi.fn();
        render(<Image src="test.jpg" alt="Test Image" onLoad={onLoad} />);
        const img = screen.getByRole('img');
        fireEvent.load(img);
        expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('handles image error event', () => {
        const onError = vi.fn();
        render(<Image src="test.jpg" alt="Test Image" onError={onError} />);
        const img = screen.getByRole('img');
        fireEvent.error(img);
        expect(onError).toHaveBeenCalledTimes(1);
    });

    it('applies loaded class after loading', () => {
        render(<Image src="test.jpg" alt="Test Image" />);
        const img = screen.getByRole('img');
        // Initially should only have base class (and transition styles)
        expect(img.className).toContain('image');

        fireEvent.load(img);
        expect(img.className).toContain('loaded');
    });
});
