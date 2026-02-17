import { describe, it, expect, vi } from 'vitest';
import { getDemoComponent, DemoRegistry } from './DemoRegistry';

vi.mock('./mayleo/MayleoDemo', () => ({
    MayleoDemo: () => <div data-testid="mayleo-demo" />,
}));

describe('DemoRegistry', () => {
    describe('getDemoComponent', () => {
        it('returns null if no demoId is provided', () => {
            expect(getDemoComponent()).toBeNull();
            expect(getDemoComponent(undefined)).toBeNull();
        });

        it('returns null if demoId is not in registry', () => {
            expect(getDemoComponent('non-existent')).toBeNull();
        });

        it('returns the correct component for a valid demoId (mayleo)', () => {
            const component = getDemoComponent('mayleo');
            expect(component).not.toBeNull();
            // Since it's a React element in the registry, we just check it exists
            expect(DemoRegistry['mayleo']).toBeDefined();
        });
    });
});
