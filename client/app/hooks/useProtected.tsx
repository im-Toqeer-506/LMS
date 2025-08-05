import { redirect } from "next/navigation";
import { ReactNode } from "react";
import useAuth from "./useAuth";

interface ProtectedProps {
  children: ReactNode;
}

const useProtected = ({ children }: ProtectedProps) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : redirect("/");
};

export default useProtected;
