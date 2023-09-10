import apiClient from "@/lib/apiClient";
import { findUser } from "@/pages/api/functions/user";
import React, { useContext, createContext, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

interface Auth {
  user: null | { id: number; email: string; username: string };
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<Auth>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<{ id: number; email: string; username: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      try {
        const getLoginUser = async () => {
          const foundUser = await findUser();
          setUser(foundUser.user);
        };
        getLoginUser();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
      const getLoginUser = async () => {
        const foundUser = await findUser();
        setUser(foundUser.user);
      };
      getLoginUser();
    } catch (err) {
      console.log(err);
    }
  };
  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
