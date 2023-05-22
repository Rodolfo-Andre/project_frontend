import { ICurrentUser } from "@/interfaces/IUser";

interface IAuthContext {
  user?: ICurrentUser;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
}

export default IAuthContext;
