export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
  }

  type Category {
    id: ID!
    name: String!
    color: String
    icon: String
    type: String!
  }

  type Expense {
    id: ID!
    title: String!
    amount: Float!
    date: String!
    notes: String
    isRecurring: Boolean!
    showInStats: Boolean!
    category: Category!
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
    me: User
    getExpenses: [Expense!]!
  }

  type Mutation {
    register(email: String!, password: String!): AuthResponse
    login(email: String!, password: String!): AuthResponse
    addExpense(
      title: String!,
      amount: Float!,
      categoryId: Int!,
      notes: String,
      isRecurring: Boolean,
      showInStats: Boolean
    ): Expense!
    deleteExpense(id: Int!): Boolean!
  }
`;
