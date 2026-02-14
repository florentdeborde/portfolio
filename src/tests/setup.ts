import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Fix "Not implemented: Window's scrollTo()" warnings
window.scrollTo = vi.fn();

// Mock react-helmet-async to avoid wrapping every component in tests
import React from 'react';

// Mock react-helmet-async to avoid wrapping every component in tests
vi.mock('react-helmet-async', () => ({
    HelmetProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    Helmet: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    SEO: () => null,
}));

// Mock matchMedia for App.tsx theme/mouse logic
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})
