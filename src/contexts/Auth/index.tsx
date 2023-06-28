import LoadingBackdrop from "@/components/LoadingBackdrop";
import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import IAuthContext from "@/interfaces/IAuthContext";
import { getUser } from "@/lib/User";
import { showWelcomeMessage } from "@/lib/Messages";
import { url } from "gravatar";
import { ICurrentUser } from "@/interfaces/IUser";

const AuthContext = createContext<IAuthContext>({
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ICurrentUser | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    await authenticateUser();
    setIsLoading(false);
  };

  const authenticateUser = async () => {
    const currenUser = (await getUser()) as ICurrentUser;

    if (currenUser) {
      const avatar_url = url(currenUser.user.email, { d: "identicon" }, true);
      currenUser.img = avatar_url;
    }

    setUser(currenUser);
  };

  const refreshUser = useCallback(async () => {
    await authenticateUser();
  }, []);

  const login = useCallback(async (accessToken: string) => {
    localStorage.setItem("access_token", accessToken);
    await authenticateUser();
    showWelcomeMessage();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    setUser(undefined);
  }, []);

  const contextValue = useMemo(() => {
    return {
      user,
      login,
      logout,
      refreshUser,
    };
  }, [user, login, logout, refreshUser]);

  if (isLoading) return <LoadingBackdrop />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
