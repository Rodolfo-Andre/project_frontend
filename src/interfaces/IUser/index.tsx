import { IEmployeeGet } from "../IEmployee";

interface IUserPrincipal {
  email: string;
}

interface ICurrentUser extends IEmployeeGet {
  img?: string;
}

export type { IUserPrincipal, ICurrentUser };
