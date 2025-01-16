import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type RequireAuthProps = {
  children: React.ReactNode;
  requireGuest?: boolean;
  redirectToIfAuth?: string;
  redirectToIfNotAuth?: string;
};

const RequireAuth = ({
  children,
  requireGuest,
  redirectToIfAuth,
  redirectToIfNotAuth,
}: RequireAuthProps) => {
  const { loading, me } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (me && requireGuest) {
    return <Navigate to={redirectToIfAuth ?? "/"} replace />;
  }

  if (!me && redirectToIfNotAuth) {
    return (
      <Navigate to={redirectToIfNotAuth} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
