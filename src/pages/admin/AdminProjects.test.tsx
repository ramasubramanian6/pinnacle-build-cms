import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminProjects from './AdminProjects';
import { BrowserRouter } from 'react-router-dom';

// Dependency Mocks
vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn(() => ({
        invalidateQueries: vi.fn(),
    })),
}));

vi.mock('@/contexts/AuthContext', () => ({
    useAuth: () => ({ user: { id: 'admin-user' }, loading: false }),
}));

const mockMutateAsync = vi.fn();
const mockDeleteMutate = vi.fn();

vi.mock('@/hooks/useAdmin', () => ({
    useIsAdmin: () => ({ data: true, isLoading: false }),
    useCreateProject: () => ({ mutateAsync: mockMutateAsync }),
    useUpdateProject: () => ({ mutateAsync: mockMutateAsync }),
    useDeleteProject: () => ({ mutate: mockDeleteMutate }),
}));

vi.mock('@/hooks/useProjects', () => ({
    useProjects: () => ({
        data: [
            {
                id: '1',
                title: 'Project Alpha',
                description: 'A test project',
                location: 'Test City',
                category: 'Residential',
                status: 'ongoing',
                progress: 50,
            },
        ],
        isLoading: false,
    }),
}));

vi.mock('@/components/admin/AdminLayout', () => ({
    AdminLayout: ({ children }: any) => <div data-testid="admin-layout">{children}</div>,
}));

vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({ toast: vi.fn() }),
}));


describe('AdminProjects', () => {
    it('renders projects list', () => {
        render(
            <BrowserRouter>
                <AdminProjects />
            </BrowserRouter>
        );

        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    });

    it('allows adding a new project', async () => {
        render(
            <BrowserRouter>
                <AdminProjects />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('add-project-btn'));

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Project' } });
        fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'New Location' } });

        fireEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                title: 'New Project',
                location: 'New Location',
            }));
        });
    });

    it('allows editing a project', async () => {
        render(
            <BrowserRouter>
                <AdminProjects />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('edit-project-1'));

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Project' } });

        fireEvent.click(screen.getByText('Update'));

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                id: '1',
                title: 'Updated Project',
            }));
        });
    });

    it('allows deleting a project', async () => {
        render(
            <BrowserRouter>
                <AdminProjects />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('delete-project-1'));

        const confirmBtn = await screen.findByTestId('confirm-delete-btn');
        fireEvent.click(confirmBtn);

        expect(mockDeleteMutate).toHaveBeenCalledWith('1');
    });
});
