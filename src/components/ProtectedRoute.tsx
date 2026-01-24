import { memo, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePageAccess } from "@/hooks/usePageAccess";

interface ProtectedRouteProps {
  pageId: string;
  children: ReactNode;
}

const ProtectedRoute = memo(function ProtectedRoute({ pageId, children }: ProtectedRouteProps) {
  const { canAccess, shouldRedirectToNotFound } = usePageAccess(pageId);

  if (shouldRedirectToNotFound) {
    return <Navigate to="/404" replace />;
  }

  if (!canAccess) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;
