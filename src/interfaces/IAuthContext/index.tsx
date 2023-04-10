import { IEmployeeGet } from "@/interfaces/IEmployee";

interface IAuthContext {
  user?: IEmployeeGet;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
}

export default IAuthContext;
