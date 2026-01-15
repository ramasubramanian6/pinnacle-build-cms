import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminProperties from './AdminProperties';
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
    useCreateProperty: () => ({ mutateAsync: mockMutateAsync }),
    useUpdateProperty: () => ({ mutateAsync: mockMutateAsync }),
    useDeleteProperty: () => ({ mutate: mockDeleteMutate }),
}));

vi.mock('@/hooks/useProperties', () => ({
    useProperties: () => ({
        data: [
            {
                id: '1',
                title: 'Luxury Villa',
                location: 'Beverly Hills',
                property_type: 'Villa',
                status: 'available',
                price: 5000000,
                area_sqft: 4000,
                bedrooms: 5,
                bathrooms: 4,
                description: 'A beautiful villa',
            },
        ],
        isLoading: false,
    }),
    formatPrice: (price: number) => price.toLocaleString('en-IN'),
}));

vi.mock('@/components/admin/AdminLayout', () => ({
    AdminLayout: ({ children }: any) => <div data-testid="admin-layout">{children}</div>,
}));

vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({ toast: vi.fn() }),
}));

describe('AdminProperties', () => {
    it('renders properties list', () => {
        render(
            <BrowserRouter>
                <AdminProperties />
            </BrowserRouter>
        );

        expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
        expect(screen.getByText('Beverly Hills')).toBeInTheDocument();
        expect(screen.getByText('Villa')).toBeInTheDocument();
        expect(screen.getByText('₹5,000,000')).toBeInTheDocument();
    });

    it('allows adding a new property', async () => {
        render(
            <BrowserRouter>
                <AdminProperties />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('add-property-btn'));

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Apartment' } });
        fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Downtown' } });
        fireEvent.change(screen.getByLabelText('Price (₹)'), { target: { value: '2000000' } });
        fireEvent.change(screen.getByLabelText('Area (sq.ft)'), { target: { value: '1200' } });

        fireEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                title: 'New Apartment',
                location: 'Downtown',
                price: 2000000,
                area_sqft: 1200,
            }));
        });
    });

    it('allows editing a property', async () => {
        render(
            <BrowserRouter>
                <AdminProperties />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('edit-property-1'));

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Villa' } });

        fireEvent.click(screen.getByText('Update'));

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                id: '1',
                title: 'Updated Villa',
            }));
        });
    });

    it('allows deleting a property', async () => {
        render(
            <BrowserRouter>
                <AdminProperties />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('delete-property-1'));

        // Check for confirm button
        const confirmBtn = await screen.findByTestId('confirm-delete-btn');
        fireEvent.click(confirmBtn);

        expect(mockDeleteMutate).toHaveBeenCalledWith('1');
    });
});
