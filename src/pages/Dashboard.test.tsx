import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';
import * as AuthContext from '@/contexts/AuthContext';
import * as AdminHook from '@/hooks/useAdmin';

// Mock dependencies
vi.mock('@/contexts/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('@/hooks/useAdmin', () => ({
    useIsAdmin: vi.fn(),
}));

// Mock child components that might cause issues or aren't the focus
vi.mock('@/components/premium/GlassmorphismCard', () => ({
    GlassmorphismCard: ({ children, className }: any) => <div data-testid="glass-card" className={className}>{children}</div>,
    GradientBorderCard: ({ children, className }: any) => <div data-testid="gradient-card" className={className}>{children}</div>,
}));

vi.mock('@/components/premium/ScrollReveal', () => ({
    ScrollReveal: ({ children }: any) => <div>{children}</div>,
    StaggerReveal: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('@/components/premium/AnimatedText', () => ({
    GradientText: ({ children }: any) => <span>{children}</span>,
}));

vi.mock('@/components/premium/ProgressRing', () => ({
    ProgressRing: () => <div data-testid="progress-ring">Ring</div>,
    AnimatedCounter: ({ value }: any) => <span>{value}</span>,
}));

vi.mock('@/components/premium/LuxuryLoader', () => ({
    LuxuryLoader: () => <div data-testid="luxury-loader">Loading...</div>,
}));

// Mock react-helmet-async
vi.mock('react-helmet-async', () => ({
    Helmet: ({ children }: any) => <div data-testid="helmet">{children}</div>,
}));

// Mock Layout
vi.mock('@/components/layout/Layout', () => ({
    Layout: ({ children }: any) => <div data-testid="layout">{children}</div>,
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Dashboard Component', () => {
    const mockSignOut = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state correctly', () => {
        (AuthContext.useAuth as any).mockReturnValue({
            user: null,
            loading: true,
            signOut: mockSignOut,
        });
        (AdminHook.useIsAdmin as any).mockReturnValue({ data: false });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByTestId('luxury-loader')).toBeInTheDocument();
    });

    it('redirects to auth when not authenticated and not loading', () => {
        (AuthContext.useAuth as any).mockReturnValue({
            user: null,
            loading: false,
            signOut: mockSignOut,
        });
        (AdminHook.useIsAdmin as any).mockReturnValue({ data: false });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/auth');
    });

    it('renders dashboard content when authenticated', () => {
        (AuthContext.useAuth as any).mockReturnValue({
            user: {
                id: '123',
                email: 'test@example.com',
                user_metadata: { full_name: 'Test User' },
            },
            loading: false,
            signOut: mockSignOut,
        });
        (AdminHook.useIsAdmin as any).mockReturnValue({ data: false });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
        expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    it('shows admin panel button for admin users', () => {
        (AuthContext.useAuth as any).mockReturnValue({
            user: {
                id: '123',
                email: 'admin@example.com',
                user_metadata: { full_name: 'Admin User' },
            },
            loading: false,
            signOut: mockSignOut,
        });
        (AdminHook.useIsAdmin as any).mockReturnValue({ data: true });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    });
});
