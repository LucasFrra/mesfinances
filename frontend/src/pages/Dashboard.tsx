import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useMonthlyStats } from "@/hooks/useMonthlyStats";
import { useCategories } from "@/hooks/useCategories";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardCategories } from "@/components/dashboard/DashboardCategories";
import { DashboardCategoryPie } from "@/components/dashboard/DashboardCategoryPie";
import { MonthNavigator } from "@/components/navigation/MonthNavigator";

export default function Dashboard() {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const { stats, loading, error } = useMonthlyStats(month, year);
  const { categories } = useCategories();

  const handleChangeMonth = (newMonth: number, newYear: number) => {
    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-12">
        {/* Navigation mois */}
        <MonthNavigator
          month={month}
          year={year}
          onChange={handleChangeMonth}
        />

        {/* Overview */}
        <DashboardOverview stats={stats} />

        {/* Pie Chart */}
        <DashboardCategoryPie stats={stats} categories={categories} />

        {/* Catégories */}
        <DashboardCategories categories={categories} />
      </div>
    </DashboardLayout>
  );
}
