import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_MONTHLY_STATS = gql`
  query GetMonthlyStats($month: Int!, $year: Int!) {
    getMonthlyStats(month: $month, year: $year) {
      totalIncome
      totalExpense
      balance
      incomeByCategory {
        categoryName
        total
      }
      expenseByCategory {
        categoryName
        total
      }
    }
  }
`;

export type MonthlyStats = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeByCategory: {
    categoryName: string;
    total: number;
  }[];
  expenseByCategory: {
    categoryName: string;
    total: number;
  }[];
};

type MonthlyStatsResponse = {
  getMonthlyStats: MonthlyStats;
};

export function useMonthlyStats(month: number, year: number) {
  const { data, loading, error, refetch } = useQuery<MonthlyStatsResponse>(
    GET_MONTHLY_STATS,
    {
      variables: { month, year },
    }
  );

  return {
    stats: data?.getMonthlyStats,
    loading,
    error,
    refetch,
  };
}
