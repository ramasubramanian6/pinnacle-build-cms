import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (data: ContactSubmission) => {
      const { error } = await supabase.from("contact_submissions").insert([data]);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    },
  });
};
