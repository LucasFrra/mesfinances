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

  type Income {
    id: ID!
    title: String!
    amount: Float!
    date: String!
    notes: String
    isRecurring: Boolean!
    showInStats: Boolean!
    category: Category!
  }

  type CategoryStat {
    categoryId: Int!
    categoryName: String!
    total: Float!
  }

  type MonthlySummary {
    month: Int!
    totalIncome: Float!
    totalExpense: Float!
    balance: Float!
  }

  type DashboardStats {
    totalIncome: Float!
    totalExpense: Float!
    balance: Float!
    incomeByCategory: [CategoryStat!]!
    expenseByCategory: [CategoryStat!]!
  }

  extend type Query {
    getMonthlyStats(month: Int!, year: Int!): DashboardStats!
    getYearlyStats(year: Int!): [MonthlySummary!]!
    compareMonths(monthA: Int!, monthB: Int!, year: Int!): [DashboardStats]
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
  }

  type Mutation {
    register(email: String!, password: String!): AuthResponse
    login(email: String!, password: String!): AuthResponse
  }

  # Expenses
  extend type Query {
    getExpenses: [Expense!]!
  }

  extend type Mutation {
    addExpense(
      title: String!,
      amount: Float!,
      categoryId: Int!,
      notes: String,
      isRecurring: Boolean,
      showInStats: Boolean
    ): Expense!
    updateExpense(
      id: Int!, 
      title: String, 
      amount: Float, 
      categoryId: Int, 
      notes: String, 
      isRecurring: Boolean, 
      showInStats: Boolean
    ): Expense!
    deleteExpense(id: Int!): Boolean!
  }

  # Incomes
  extend type Query {
    getIncomes: [Income!]!
  }

  extend type Mutation {
    addIncome(
      title: String!,
      amount: Float!,
      categoryId: Int!,
      notes: String,
      isRecurring: Boolean,
      showInStats: Boolean
    ): Income!
    updateIncome(
      id: Int!, 
      title: String, 
      amount: Float, 
      categoryId: Int, 
      notes: String, 
      isRecurring: Boolean, 
      showInStats: Boolean
    ): Income!
    deleteIncome(id: Int!): Boolean!
  }

  # Categories
  extend type Query {
    getCategories: [Category!]!
  }

  extend type Mutation {
    createCategory(name: String!, color: String, icon: String, type: String!): Category!
    updateCategory(id: Int!, name: String, color: String, icon: String): Category!
    deleteCategory(id: Int!): Boolean!
  }
`;
