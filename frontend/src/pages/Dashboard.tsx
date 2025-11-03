import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useMonthlyStats } from "@/hooks/useMonthlyStats";
import { useCategories } from "@/hooks/useCategories";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardCategories } from "@/components/dashboard/DashboardCategories";

export default function Dashboard() {
  const now = new Date();
  const { stats, loading, error } = useMonthlyStats(
    now.getMonth() + 1,
    now.getFullYear()
  );
  const { categories } = useCategories();

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
        </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <p className="text-red-500 text-center">
          Error fetching stats: {error.message}
        </p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Overview — {now.toLocaleString("default", { month: "long" })}{" "}
            {now.getFullYear()}
          </h2>
        </div>

        <DashboardOverview stats={stats} />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Categories
          </h3>
          <DashboardCategories categories={categories} />
        </div>
      </div>
    </DashboardLayout>
  );
}
