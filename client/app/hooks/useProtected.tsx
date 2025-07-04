import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { userAuth } from "./userAuth";

interface ProtectedProps {
  children: ReactNode;
}

const useProtected = ({ children }: ProtectedProps) => {
  const isAuthenticated = userAuth();
  return isAuthenticated ? children : redirect("/");
};

export default useProtected;
