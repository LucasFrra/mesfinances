import { AppProvider } from "@/providers/AppProvider";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./index.css";

const PING_QUERY = gql`
  query {
    ping
  }
`;

function PingTest() {
  const { data, loading, error } = useQuery<{ ping: string }>(PING_QUERY);
  if (loading) return <p>⏳ Loading...</p>;
  if (error) return <p>❌ Error: {error.message}</p>;
  return <p>✅ Backend response: {data?.ping}</p>;
}

export function App() {
  return (
    <AppProvider>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Apollo Connected</h1>
        <PingTest />
      </div>
    </AppProvider>
  );
}
