// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useWeb3Context } from "../context/Web3Context";

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) => {
  const { userRole, isAuthenticated } = useWeb3Context();

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(userRole as string)) {
    return <Navigate to="/tasks" />; // Redirect to tasks if role is not allowed
  }

  return children; // Render children if role is allowed
};

export default ProtectedRoute;
