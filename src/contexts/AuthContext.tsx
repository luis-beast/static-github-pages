import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import type { UserRole } from "@/config/accessConfig";

export interface User {
  id: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isSubscriber: boolean;
  userRole: UserRole | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setMockUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";
  const isModerator = user?.role === "moderator" || isAdmin;
  const isSubscriber = user?.role === "subscriber" || isModerator;
  const userRole = user?.role ?? null;

  const login = useCallback(async () => {
    console.log("Login not yet implemented - requires backend integration");
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
  }, []);

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

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
