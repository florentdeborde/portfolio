import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
    test('should navigate from Home to Projects and back', async ({ page }) => {
        // 1. Navigate to Home
        await page.goto('/');
        await expect(page).toHaveTitle(/Portfolio/i);

        // 2. Check for "Projects" link in Header/Navigation and click it
        // The accessible name might be "Projets" or "Projects" depending on default language
        const projectsLink = page.getByRole('link', { name: /Projets|Projects/i }).first();
        await expect(projectsLink).toBeVisible();
        await projectsLink.click();

        // 3. Verify URL is /projects
        await expect(page).toHaveURL(/.*\/projects/);

        // Explicitly wait for project content
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // 4. Click on the Mayleo project card
        // We target the link containing the specific project path
        const projectCard = page.locator('a[href*="/projects/mayleo"]').first();
        await expect(projectCard).toBeVisible();
        await projectCard.click();

        // 5. Verify the URL includes /projects/mayleo
        await expect(page).toHaveURL(/.*\/projects\/mayleo/);

        // 6. Click "Home" link via Logo
        const homeLink = page.getByRole('link', { name: /Portfolio Logo/i }).first();
        await homeLink.click();

        // 7. Verify return to Home
        await expect(page).toHaveURL('/');
    });
});
