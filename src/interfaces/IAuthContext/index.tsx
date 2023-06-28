import { ICurrentUser } from "@/interfaces/IUser";

interface IAuthContext {
  user?: ICurrentUser;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export default IAuthContext;
