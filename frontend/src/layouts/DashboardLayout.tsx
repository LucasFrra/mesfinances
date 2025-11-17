import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import { Header } from "@/components/common/Header";

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

type MeResponse = {
  me: {
    id: string;
    email: string;
  };
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { data, loading, error } = useQuery<MeResponse>(ME_QUERY, {
    skip: !isAuthenticated,
  });

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );

  const user = data?.me;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <section className="bg-muted min-h-screen w-screen flex flex-col">
      <Header email={user.email} />
      <main className="flex flex-col grow p-6">{children}</main>
    </section>
  );
}
