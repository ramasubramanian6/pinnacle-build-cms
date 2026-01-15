import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global ResizeObserver mock
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Global Framer Motion mock
vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: ({ children, ...props }: any) => React.createElement('div', props, children),
            span: ({ children, ...props }: any) => React.createElement('span', props, children),
            section: ({ children, ...props }: any) => React.createElement('section', props, children),
            h1: ({ children, ...props }: any) => React.createElement('h1', props, children),
            h2: ({ children, ...props }: any) => React.createElement('h2', props, children),
            p: ({ children, ...props }: any) => React.createElement('p', props, children),
            // Add other HTML elements as needed
        },
        AnimatePresence: ({ children }: any) => children,
    };
});

// Mock window.matchMedia
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
});

