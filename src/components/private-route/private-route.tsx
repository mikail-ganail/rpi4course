import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { AppRoute, AuthorizationStatus } from "../../const";

type AuthorizationStatusEnum =
  (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatusEnum;
};

function PrivateRoute({
  authorizationStatus,
  children,
}: PropsWithChildren<PrivateRouteProps>) {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return children;
  }

  return <Navigate to={AppRoute.Login} />;
}

export { PrivateRoute };
