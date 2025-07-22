import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  loggedInUser: string | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<string | null>>;
  userRole: string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  const logout = async () => {
    setLoggedInUser(null);
    setUserRole(null);
    setUserRole(null);
    setJwt(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        userRole,
        setUserRole,
        logout,
        jwt,
        setJwt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
