import { useContext, useEffect, ComponentType } from "react";
import { AuthContext } from "@/contexts/Auth";
import { UserRoles } from "@/interfaces";
import { LoadingBackdrop } from "@/components";
import Router from "next/router";

interface IProtectedRouteForAuthenticated {
  Component: ComponentType;
  roles?: UserRoles[];
}

const ProtectedRouteForAuthenticated = <P extends Object>({
  Component,
  roles,
}: IProtectedRouteForAuthenticated) => {
  const ComponentProtected = (props: P) => {
    const { user } = useContext(AuthContext);
    const role = user?.role.roleName as UserRoles;

    useEffect(() => {
      if (!user) {
        Router.replace("/login");
        return;
      }

      if (roles && !roles.includes(role)) {
        Router.push("403");
      }
    }, [user, role]);

    return user && (!roles || roles.includes(role)) ? (
      <Component {...props} />
    ) : (
      <LoadingBackdrop />
    );
  };

  return ComponentProtected;
};

export default ProtectedRouteForAuthenticated;
