import React, { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { currentUser } = useAuth();

  return currentUser ? (
    <>{children}</>
  ) : (
    <Redirect to="/login" />
  );
}