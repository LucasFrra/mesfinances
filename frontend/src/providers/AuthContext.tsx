import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
  loading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
