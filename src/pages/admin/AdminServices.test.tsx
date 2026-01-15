import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminServices from './AdminServices';
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

vi.mock('@/hooks/useAdmin', () => ({
    useIsAdmin: () => ({ data: true, isLoading: false }),
}));

// Mock hooks to control return values per test if needed
const mockMutateAsync = vi.fn();
const mockDeleteMutate = vi.fn();

vi.mock('@/hooks/useServices', () => ({
    useServices: () => ({
        data: [
            { id: '1', title: 'Service A', description: 'Desc A', icon: 'Building2', features: ['Feat 1'] }
        ],
        isLoading: false
    }),
    useCreateService: () => ({ mutateAsync: mockMutateAsync }),
    useUpdateService: () => ({ mutateAsync: mockMutateAsync }),
    useDeleteService: () => ({ mutate: mockDeleteMutate }),
}));

vi.mock('@/components/admin/AdminLayout', () => ({
    AdminLayout: ({ children }: any) => <div data-testid="admin-layout">{children}</div>,
}));

// Mock toast to avoid errors and check calls
vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({ toast: vi.fn() }),
}));

describe('AdminServices', () => {
    it('renders services list', () => {
        render(
            <BrowserRouter>
                <AdminServices />
            </BrowserRouter>
        );
        expect(screen.getByText('Service A')).toBeInTheDocument();
        expect(screen.getByText('Desc A')).toBeInTheDocument();
    });

    it('allows adding a new service', async () => {
        render(
            <BrowserRouter>
                <AdminServices />
            </BrowserRouter>
        );

        // Click Add Service
        fireEvent.click(screen.getByTestId('add-service-btn'));

        // Fill Form
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Service' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'New Description' } });

        // Submit
        fireEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                title: 'New Service',
                description: 'New Description',
            }));
        });
    });

    it('allows editing a service', async () => {
        render(
            <BrowserRouter>
                <AdminServices />
            </BrowserRouter>
        );

        // Click Edit
        fireEvent.click(screen.getByTestId('edit-service-1'));

        // Update Form
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Service' } });

        // Submit
        fireEvent.click(screen.getByText('Update'));

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                id: '1',
                title: 'Updated Service',
            }));
        });
    });

    it('allows deleting a service', async () => {
        render(
            <BrowserRouter>
                <AdminServices />
            </BrowserRouter>
        );

        // Click Delete
        fireEvent.click(screen.getByTestId('delete-service-1'));

        // Confirm Delete (AlertDialog)
        // Note: Radix UI primitives might render in a portal, but testing-library usually finds them.
        // We added data-testid="confirm-delete-btn" to the action button.
        const confirmBtn = await screen.findByTestId('confirm-delete-btn');
        fireEvent.click(confirmBtn);

        expect(mockDeleteMutate).toHaveBeenCalledWith('1');
    });
});
