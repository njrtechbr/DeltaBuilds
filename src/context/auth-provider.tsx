
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { User as AppUser } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';

type AuthContextType = {
  user: AppUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  
  // Use a separate state for loading to prevent hydration issues
  const [loading, setLoading] = useState(true);

  // NOTE: This is a mock implementation for demonstration purposes.
  // In a real Supabase integration, you would use supabase.auth.onAuthStateChange
  // to listen for authentication events and update the user state accordingly.
  
  useEffect(() => {
    // Simulate checking auth state on mount, only on the client
    setLoading(false); 
  }, []);

  const login = () => {
    // This is a mock login function.
    // It sets the first user from the mock data as the logged-in user.
    const userToLogin = mockUsers[0];
    setAppUser(userToLogin);
    // You could also create a mock session object here if needed.
    console.log("Mock login successful for:", userToLogin.name);
  };
  
  const logout = () => {
    // This is a mock logout function.
    setAppUser(null);
    setSession(null);
    console.log("Mock logout successful.");
  };

  const value = {
    user: appUser,
    session,
    isAuthenticated: !!appUser,
    login,
    logout,
  };

  // Render a loading state or null while checking auth to prevent mismatches
  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
