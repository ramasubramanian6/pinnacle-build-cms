import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminBlogs from './AdminBlogs';
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
}));

vi.mock('@/hooks/useBlogs', () => ({
    useBlogs: () => ({
        data: [
            {
                id: '1',
                title: 'First Blog Post',
                slug: 'first-blog-post',
                excerpt: 'An interesting read',
                content: 'Full content here',
                author: 'Admin',
                date: '2023-01-01',
                category: 'Tech',
                featured: true,
            },
        ],
        isLoading: false,
    }),
    useCreateBlog: () => ({ mutateAsync: mockMutateAsync }),
    useUpdateBlog: () => ({ mutateAsync: mockMutateAsync }),
    useDeleteBlog: () => ({ mutate: mockDeleteMutate }),
}));

vi.mock('@/components/admin/AdminLayout', () => ({
    AdminLayout: ({ children }: any) => <div data-testid="admin-layout">{children}</div>,
}));

vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({ toast: vi.fn() }),
}));

describe('AdminBlogs', () => {
    it('renders blogs list', () => {
        render(
            <BrowserRouter>
                <AdminBlogs />
            </BrowserRouter>
        );

        expect(screen.getByText('First Blog Post')).toBeInTheDocument();
        expect(screen.getByText('Tech')).toBeInTheDocument();
        expect(screen.getByText('Featured')).toBeInTheDocument();
    });

    it('allows adding a new blog post', async () => {
        render(
            <BrowserRouter>
                <AdminBlogs />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('add-blog-btn'));

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Blog' } });
        // Slug is auto-generated in the component logic usually, but we mock the submit data
        fireEvent.change(screen.getByLabelText('Excerpt'), { target: { value: 'New Excerpt' } });

        // Using getAllByText because buttons close inside the dialog might have same text
        const createBtns = screen.getAllByText('Create');
        fireEvent.click(createBtns[createBtns.length - 1]); // Usually the last one in the modal

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                title: 'New Blog',
                excerpt: 'New Excerpt',
            }));
        });
    });

    it('allows editing a blog post', async () => {
        render(
            <BrowserRouter>
                <AdminBlogs />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('edit-blog-1'));

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Blog' } });

        const updateBtns = screen.getAllByText('Update');
        fireEvent.click(updateBtns[updateBtns.length - 1]);

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                id: '1',
                title: 'Updated Blog',
            }));
        });
    });

    it('allows deleting a blog post', async () => {
        render(
            <BrowserRouter>
                <AdminBlogs />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('delete-blog-1'));

        const confirmBtn = await screen.findByTestId('confirm-delete-btn');
        fireEvent.click(confirmBtn);

        expect(mockDeleteMutate).toHaveBeenCalledWith('1');
    });
});
