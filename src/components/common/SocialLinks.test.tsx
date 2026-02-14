import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SocialLinks } from './SocialLinks';
import { parameters } from '@/config/parameters';

describe('SocialLinks', () => {
    /**
     * Testing the number of rendered social links.
     * Note: Based on the component, we expect 3 links: GitHub, LinkedIn, and Email.
     */
    it('renders all social links correctly', () => {
        render(<SocialLinks />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(3);
    });

    /**
     * Testing that the URLs are pulled correctly from the configuration file.
     * We use the actual 'parameters' values to ensure the test stays in sync with our config.
     */
    it('ensures links have the correct href values from parameters', () => {
        render(<SocialLinks />);
        const links = screen.getAllByRole('link');
        const hrefs = links.map(link => link.getAttribute('href'));

        expect(hrefs).toContain(parameters.github);
        expect(hrefs).toContain(parameters.linkedin);
        // The email link includes the mailto: prefix
        expect(hrefs).toContain(`mailto:${parameters.email}`);
    });

    /**
     * Security and UX test: External links should open in a new tab 
     * using target="_blank" and rel="noopener noreferrer" for security.
     */
    it('checks that social buttons open in a new tab (excluding mailto)', () => {
        render(<SocialLinks />);

        // Find links by their specific aria-labels
        const githubLink = screen.getByLabelText('GitHub');
        const linkedinLink = screen.getByLabelText('LinkedIn');

        // Verify target="_blank" for external social platforms
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

        expect(linkedinLink).toHaveAttribute('target', '_blank');
        expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
});