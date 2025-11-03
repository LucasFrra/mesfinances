import { gql } from "@apollo/client";
import { useAuth } from "@/providers/AuthContext";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client/react";
import { Navigate } from "react-router-dom";

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

export default function Dashboard() {
  const { logout, isAuthenticated } = useAuth();
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

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
      <p className="text-muted-foreground">Logged in as {data?.me.email}</p>

      <Button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white mt-4"
      >
        Logout
      </Button>
    </section>
  );
}
