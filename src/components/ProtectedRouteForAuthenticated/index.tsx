import Router from "next/router";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import UserRoles from "@/interfaces/UserRoles";
import { AuthContext } from "@/contexts/Auth";
import { useContext, useEffect, ComponentType } from "react";

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
        Router.replace("/403");
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
