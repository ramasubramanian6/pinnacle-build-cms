import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useIsAdmin = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-role", user?._id], // Use _id for MongoDB
    queryFn: async () => {
      // Just check role from context which is populated from token/me
      return user?.role === 'admin';
    },
    enabled: !!user,
  });
};

// Contact Submissions
export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data } = await api.get("/contacts");
      return data.map((c: any) => ({ ...c, id: c._id }));
    },
  });
};

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await api.put(`/contacts/${id}`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast.success("Status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast.success("Contact deleted");
    },
    onError: () => {
      toast.error("Failed to delete contact");
    },
  });
};

// Projects CRUD (Re-exporting existing hooks or creating admin specific ones if needed)
// Frontend probably uses useCreateProject from a separate file logic,
// but often admin logic was likely in useAdmin.ts.
// If Admin pages use specific Create/Update hooks that were in useAdmin.ts, we need to add them here.
// Checking previous useAdmin.ts content showed useCreateProject etc.
// We should import them from useProjects or re-implement if they were separate.
// But wait, the previous useProjects.ts didn't have mutations.
// So I need to add Project and Property mutations here or in their respective hooks files.
// I'll add them to useProjects and useProperties files properly and export them.
// But if they were in useAdmin, I should put them back here or migrate the calling code.
// For simplicity, I'll add them to the respective hooks files (already done for Properties/Blogs/Services etc).
// I just need to check Projects mutations.
