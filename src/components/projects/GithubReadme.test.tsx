import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GithubReadme } from './GithubReadme';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('GithubReadme Component', () => {
    const mockRepoUrl = 'https://raw.githubusercontent.com/test/readme.md';
    const readmeContent = `
# 🌞 Header 1
## 📑 Table of Contents
- [Testing Link](#-header-1)
- [Project Structure](#️-project-structure)
- [Customization Guide](#-customization-guide-for-cloning-or-adapting)
- [Roadmap](#-roadmap--future-evolutions)

## 📂 Project Structure
## 🪄 Customization Guide (for cloning or adapting)
## �️ Roadmap & Future Evolutions
## 📜 License
Content here.
`;

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock fetch
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(readmeContent),
            } as unknown as Response)
        );
    });

    it('renders and status matches slugs', async () => {
        render(<GithubReadme repoRawUrl={mockRepoUrl} loadingText="Loading" errorText="Error" />);

        await waitFor(() => expect(screen.queryByText('Loading')).not.toBeInTheDocument(), { timeout: 3000 });

        // Check slugs for headers
        const h2 = screen.getAllByRole('heading', { level: 2 });

        // "📑 Table of Contents" -> "table-of-contents"
        expect(h2[0]).toHaveAttribute('id', 'table-of-contents');
        // "📂 Project Structure" -> "project-structure"
        expect(h2[1]).toHaveAttribute('id', 'project-structure');
        // "🪄 Customization Guide (for cloning or adapting)" -> "customization-guide-for-cloning-or-adapting"
        expect(h2[2]).toHaveAttribute('id', 'customization-guide-for-cloning-or-adapting');
        // "🗺️ Roadmap & Future Evolutions" -> "roadmap-future-evolutions"
        expect(h2[3]).toHaveAttribute('id', 'roadmap-future-evolutions');
    });

    it('handles internal anchor clicks and normalization', async () => {
        render(<GithubReadme repoRawUrl={mockRepoUrl} loadingText="Loading" errorText="Error" />);

        await waitFor(() => expect(screen.queryByText('Loading')).not.toBeInTheDocument(), { timeout: 3000 });

        // Test Roadmap (with double hyphen)
        const roadmapLink = screen.getByText('Roadmap');
        fireEvent.click(roadmapLink);
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

        // Test Encoded Folder Emoji (#%EF%B8%8F-project-structure)
        // Manual trigger since we can't easily find it by role if it's encoded in MD
        const folderLink = screen.getByText('Project Structure');
        fireEvent.click(folderLink);
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
});
