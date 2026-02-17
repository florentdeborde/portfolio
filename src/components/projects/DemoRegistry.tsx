import { ReactNode } from 'react';
import { MayleoDemo } from './mayleo/MayleoDemo';

export const DemoRegistry: Record<string, ReactNode> = {
    'mayleo': <MayleoDemo />,
};

export const getDemoComponent = (demoId?: string): ReactNode => {
    if (!demoId) return null;
    return DemoRegistry[demoId] || null;
};
