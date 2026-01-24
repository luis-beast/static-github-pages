/**
 * Authentication Context
 * 
 * Config-only placeholder for future Twitch/Discord OAuth implementation.
 * When a backend is connected, this will integrate with the auth provider.
 * 
 * FUTURE FEATURES:
 * - Twitch OAuth (primary)
 * - Discord OAuth (secondary)
 * - Multiple Twitch account linking with primary selection
 * - Auto-detect Twitch subscribers
 * - Manual subscriber assignment
 */

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import type { UserRole } from "@/config/accessConfig";

// ============================================================================
// TYPES
// ============================================================================

export interface User {
  id: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
  // Future: twitchAccounts, discordAccount, subscriptionStatus, groups
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isSubscriber: boolean;
  userRole: UserRole | null;
  
  // Auth actions (will be implemented with Supabase)
  login: () => Promise<void>;
  logout: () => Promise<void>;
  
  // For development/testing purposes
  setMockUser: (user: User | null) => void;
}

// ============================================================================
// CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextValue | null>(null);

// ============================================================================
// PROVIDER
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // FUTURE: Replace with Supabase auth state
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";
  const isModerator = user?.role === "moderator" || isAdmin;
  const isSubscriber = user?.role === "subscriber" || isModerator;
  const userRole = user?.role ?? null;

  const login = useCallback(async () => {
    // FUTURE: Implement Twitch/Discord OAuth
    console.log("Login not yet implemented - requires backend integration");
  }, []);

  const logout = useCallback(async () => {
    // FUTURE: Implement Supabase signOut
    setUser(null);
  }, []);

  // For development/testing - allows simulating different user roles
  const setMockUser = useCallback((mockUser: User | null) => {
    setUser(mockUser);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated,
    isAdmin,
    isModerator,
    isSubscriber,
    userRole,
    login,
    logout,
    setMockUser,
  }), [user, isAuthenticated, isAdmin, isModerator, isSubscriber, userRole, login, logout, setMockUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
