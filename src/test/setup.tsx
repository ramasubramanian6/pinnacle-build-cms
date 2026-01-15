import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Global Lucide React Mock
// This proxies all icon imports to return a simple span with the icon name
vi.mock('lucide-react', () => {
    return new Proxy({}, {
        get: (target, prop) => {
            // If asking for a specific export (like 'Check', 'Plus', etc.)
            // return a component that renders the name.
            // Special case for ES modules 'default' or '__esModule' if necessary, 
            // but usually for named imports this is sufficient.
            return ({ ...props }: any) => <span data-testid={`icon-${String(prop).toLowerCase()}`} {...props}>{String(prop)}</span>;
        }
    });
});

// Global ResizeObserver mock
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Global Framer Motion mock
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
        section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
