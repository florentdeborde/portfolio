import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
    GithubIcon,
    LinkedinIcon,
    ExternalLinkIcon
} from './BrandIcons';

describe('BrandIcons', () => {
    // Testing the Github SVG rendering
    it('GithubIcon renders without crashing', () => {
        const { container } = render(<GithubIcon />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    /**
     * Testing the LinkedIn SVG.
     * Ensure the import name matches the 'export const' exactly.
     */
    it('LinkedinIcon renders without crashing', () => {
        const { container } = render(<LinkedinIcon />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    // Testing the External Link SVG rendering
    it('ExternalLinkIcon renders without crashing', () => {
        const { container } = render(<ExternalLinkIcon />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});