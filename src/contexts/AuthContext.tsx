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
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
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
      let token = localStorage.getItem('token');
      // Defensive fix for corrupted local storage
      if (token === "[object Object]") {
        console.warn("Detected corrupted token in localStorage, clearing.");
        localStorage.removeItem('token');
        token = null;
      }

      if (!token) {
        setLoading(false);
        return;
      }

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
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true); // Maybe not global loading, but for now
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);

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
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { email, password, fullName });
      // Depending on flow, maybe auto-login? For now just register.
      // Or if token return, login immediately
      localStorage.setItem('token', data.token);
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
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Signed out successfully');
  };

  const updateProfile = async (data: any) => {
    // Placeholder implementation
    console.log('Update profile not implemented in rudimentary AuthContext yet', data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
