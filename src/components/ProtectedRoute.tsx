/**
 * Protected Route Component
 * 
 * Wraps pages that require access control.
 * Redirects to NotFound for hidden/WIP pages when user lacks access.
 */

import { memo, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePageAccess } from "@/hooks/usePageAccess";

interface ProtectedRouteProps {
  pageId: string;
  children: ReactNode;
}

const ProtectedRoute = memo(function ProtectedRoute({ pageId, children }: ProtectedRouteProps) {
  const { canAccess, shouldRedirectToNotFound } = usePageAccess(pageId);

  // If user can't access and page is hidden/WIP, show 404
  if (shouldRedirectToNotFound) {
    return <Navigate to="/404" replace />;
  }

  // If user can't access for other reasons (authenticated/restricted), 
  // could redirect to login in the future
  if (!canAccess) {
    // FUTURE: Redirect to login page
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;
