import { IRoleGet } from "@/interfaces/IRole";
import { IUserPrincipal } from "@/interfaces/IUser";

interface IEmployeePrincipal {
  firstName: string;
  lastName: string;
  phone: string;
}

interface IEmployeeGet extends IEmployeePrincipal {
  id: number;
  role: IRoleGet;
  user: IUserPrincipal;
  createdAt: string;
}

interface IEmployeePost extends IEmployeePrincipal {
  user: IUserPrincipal;
  roleId?: number;
}

interface IEmployeePut extends IEmployeePrincipal {
  user: IUserPrincipal;
  roleId: number;
}

export type { IEmployeePrincipal, IEmployeeGet, IEmployeePost, IEmployeePut };
