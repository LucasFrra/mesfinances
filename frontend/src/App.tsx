import { ApolloProvider, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { client } from "./apollo/client";
import "./index.css";

const PING_QUERY = gql`
  query Ping {
    ping
  }
`;

type PingData = {
  ping: string;
};

function PingTest() {
  const { data, loading, error } = useQuery<PingData>(PING_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>Backend response: {data?.ping}</p>;
}

export function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Apollo Client Test</h1>
        <PingTest />
      </div>
    </ApolloProvider>
  );
}
