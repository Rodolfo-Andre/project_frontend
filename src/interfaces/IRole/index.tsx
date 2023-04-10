interface IRolePrincipal {
  roleName: string;
}

interface IRoleGet extends IRolePrincipal {
  id: number;
}

export type { IRolePrincipal, IRoleGet };
