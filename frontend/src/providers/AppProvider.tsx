import type { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/apollo/client";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
