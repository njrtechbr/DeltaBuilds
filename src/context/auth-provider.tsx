"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';
import type { User as AppUser } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';

type AuthContextType = {
  user: AppUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // In a real app, you'd fetch the user from Supabase.
  // For now, we'll mock it but use a state to simulate login/logout.
  const [session, setSession] = useState<Session | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const isAuthenticated = !!appUser;
  
  // NOTE: This is a mock implementation for demonstration purposes.
  // In a real Supabase integration, you would use supabase.auth.onAuthStateChange
  // to listen for authentication events and update the user state accordingly.
  
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
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
