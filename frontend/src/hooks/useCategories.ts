import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
      color
      icon
    }
  }
`;

export type Category = {
  id: string;
  name: string;
  color?: string;
  icon?: string;
};

type CategoriesResponse = {
  getCategories: Category[];
};

export function useCategories() {
  const { data, loading, error, refetch } =
    useQuery<CategoriesResponse>(GET_CATEGORIES);

  return {
    categories: data?.getCategories ?? [],
    loading,
    error,
    refetch,
  };
}
