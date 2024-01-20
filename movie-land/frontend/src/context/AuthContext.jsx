import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticatedWithGoogle, setAuthenticatedWithGoogle] = useState(
    () => {
      // Initialize from local storage or set default value
      return (
        localStorage.getItem("isAuthenticatedWithGoogle") === "true" || false
      );
    }
  );

  useEffect(() => {
    // Update local storage when the state changes
    localStorage.setItem(
      "isAuthenticatedWithGoogle",
      isAuthenticatedWithGoogle
    );
  }, [isAuthenticatedWithGoogle]);

  const value = {
    isAuthenticatedWithGoogle,
    setAuthenticatedWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
