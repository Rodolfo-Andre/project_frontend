import Router from "next/router";
import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { getUser } from "@/lib/User";
import { IEmployeeGet } from "@/interfaces/IEmployee";
import { IAuthContext } from "@/interfaces";
import { LoadingBackdrop } from "@/components";
import { showWelcomeMessage } from "@/lib/Messages";

const AuthContext = createContext<IAuthContext>({
  login: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IEmployeeGet | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const userR = await getUser();
    setUser(userR);
    setIsLoading(false);
  };

  const login = useCallback(async (accessToken: string) => {
    localStorage.setItem("access_token", accessToken);

    const currentUser = await getUser();
    setUser(currentUser);

    showWelcomeMessage();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    setUser(undefined);

    Router.push("login");
  }, []);

  const contextValue = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [user, login, logout]);

  if (isLoading) return <LoadingBackdrop />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
