import { createContext, useContext, useState, useEffect } from "react";
import { authAPI, tokenUtils } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedToken = tokenUtils.getToken();
    const storedUser = tokenUtils.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const register = async (formData) => {
    try {
      const data = await authAPI.register(formData);

      if (data.error) {
        return { error: data.error };
      }

      tokenUtils.setToken(data.token);
      tokenUtils.setUser(data.user);
      setToken(data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (err) {
      return { error: "Registration failed. Please try again." };
    }
  };

  const login = async (formData) => {
    try {
      const data = await authAPI.login(formData);

      if (data.error) {
        return { error: data.error };
      }

      tokenUtils.setToken(data.token);
      tokenUtils.setUser(data.user);
      setToken(data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (err) {
      return { error: "Login failed. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setToken(null);
      setUser(null);
      return { success: true };
    } catch (err) {
      return { error: "Logout failed" };
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
