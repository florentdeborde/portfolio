/**
 * Estimates reading time for a given text.
 * Assumes an average reading speed of 200 words per minute.
 * 
 * @param content - The text content to measure
 * @returns The estimated reading time in minutes (minimum 1)
 */
export const getReadingTime = (content: string): number => {
    if (!content) return 0;

    // Strip HTML/Markdown tags roughly if needed, but for estimation raw text is usually okay-ish.
    // For more precision on markdown, specific regex can be used.

    // Removes markdown headings, links, images, etc. to get closer to word count
    const cleanText = content
        .replace(/#+\s/g, '') // Headings
        .replace(/!\[.*?\]\(.*?\)/g, '') // Images
        .replace(/\[.*?\]\(.*?\)/g, '$1') // Links
        .replace(/`{1,3}.*?`{1,3}/g, '') // Code blocks
        .replace(/\*\*/g, '') // Bold
        .replace(/\*/g, '') // Italic
        .trim();

    const words = cleanText.split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);

    return Math.max(1, minutes);
};
