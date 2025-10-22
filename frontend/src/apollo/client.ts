// frontend/src/apollo/client.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

// HTTP link
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// Auth link (headers dynamiques)
const authLink = new SetContextLink((prevContext /*, operation */) => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Chaîne de links (pas de `from` importé, on passe par ApolloLink.from)
const link = ApolloLink.from([authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
