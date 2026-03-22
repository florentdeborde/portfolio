import { ReactNode } from 'react';
import { MayleoDemo } from './mayleo/MayleoDemo';
import { AltairDemo } from './altair/AltairDemo';

export const DemoRegistry: Record<string, ReactNode> = {
    'mayleo': <MayleoDemo />,
    'altair': <AltairDemo />
};

export const getDemoComponent = (demoId?: string): ReactNode => {
    if (!demoId) return null;
    return DemoRegistry[demoId] || null;
};
