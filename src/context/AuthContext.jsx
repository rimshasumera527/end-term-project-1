import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, logoutUser, registerUser, subscribeToAuthChanges } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authNotice, setAuthNotice] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuthAction = useCallback(async (action) => {
    setAuthError("");
    setAuthNotice("");
    try {
      const result = await action();
      if (result?.notice) {
        setAuthNotice(result.notice);
      }
      if (result?.user) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      setAuthError(error.message || "Something went wrong.");
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      authError,
      authNotice,
      signup: (payload) => handleAuthAction(() => registerUser(payload)),
      signin: (payload) => handleAuthAction(() => loginUser(payload)),
      signout: async () => {
        setAuthError("");
        setAuthNotice("");
        await logoutUser();
        setUser(null);
      },
      clearAuthError: () => setAuthError(""),
      clearAuthNotice: () => setAuthNotice(""),
    }),
    [user, loading, authError, authNotice, handleAuthAction]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
