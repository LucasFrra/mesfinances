export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
  }

  type Session {
    access_token: String
    refresh_token: String
    expires_in: Int
    token_type: String
  }

  type AuthResponse {
    user: User
    session: Session
  }

  type Query {
    ping: String!
  }

  type Mutation {
    register(email: String!, password: String!): AuthResponse
    login(email: String!, password: String!): AuthResponse
  }
`;
