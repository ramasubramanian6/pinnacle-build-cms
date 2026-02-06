import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface User {
  _id: string; // MongoDB ID
  id?: string; // For compatibility
  email: string;
  fullName?: string;
  role: string;
  phone?: string;
  company?: string;
  avatarUrl?: string;
  user_metadata?: { // For compatibility with existing code
    full_name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, otp: string, phone: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>; // Simple placeholder
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => { },
  updateProfile: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      // With cookies, we just try to fetch the profile.
      // We don't check for token in localStorage anymore as primary source.

      try {
        const { data } = await api.get('/auth/me');
        // Adapt data for compatibility if needed
        const adaptedUser = {
          ...data,
          id: data._id, // Map _id to id
          user_metadata: {
            full_name: data.fullName,
            avatar_url: data.avatarUrl
          } // Map for existing components
        };
        setUser(adaptedUser);
      } catch (error) {
        // Not logged in or session expired
        setUser(null);
        // Clean up any stale local storage token if it exists
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    // setLoading(true); // Don't trigger global loading, let component handle it
    try {
      const { data } = await api.post('/auth/login', { email, password });
      console.log('Login API response:', data);

      // We rely on HTTP-Only cookie, but we can optionally keep token in localStorage for other needs if any.
      // For now, let's STOP storing it to force reliance on Cookie.
      // localStorage.setItem('token', data.token);

      const adaptedUser = {
        ...data,
        id: data._id,
        user_metadata: {
          full_name: data.fullName,
          avatar_url: data.avatarUrl
        }
      };

      setUser(adaptedUser);
      return { error: null };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      return { error: { message } };
    } finally {
      // setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, otp: string, phone: string) => {
    // setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { email, password, fullName, otp, phone });
      console.log('Signup success:', data);

      // Cookie is set by backend.
      // localStorage.setItem('token', data.token);

      const adaptedUser = {
        ...data,
        id: data._id,
        user_metadata: {
          full_name: data.fullName,
          avatar_url: data.avatarUrl
        }
      };
      setUser(adaptedUser);

      return { error: null };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      return { error: { message } };
    } finally {
      // setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout error", error);
    }
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Signed out successfully');
  };

  const updateProfile = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.put('/auth/profile', data);
      const updatedUser = {
        ...response.data,
        id: response.data._id,
        user_metadata: {
          full_name: response.data.fullName,
          avatar_url: response.data.avatarUrl
        }
      };
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
