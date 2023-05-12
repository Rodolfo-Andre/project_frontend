import LoadingBackdrop from "@/components/LoadingBackdrop";
import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { getUser } from "@/lib/User";
import { showWelcomeMessage } from "@/lib/Messages";
import { url } from "gravatar";
import { ICurrentUser, IAuthContext } from "@/interfaces";

const AuthContext = createContext<IAuthContext>({
  login: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ICurrentUser | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkUser = useCallback(async () => {
    await authenticateUser();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const authenticateUser = async () => {
    const currenUser = (await getUser()) as ICurrentUser;

    if (currenUser) {
      const avatar_url = url(currenUser.user.email, { d: "identicon" }, true);
      currenUser.img = avatar_url;
    }

    setUser(currenUser);
  };

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
    };
  }, [user, login, logout]);

  if (isLoading) return <LoadingBackdrop />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
