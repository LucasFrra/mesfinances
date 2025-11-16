import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useMonthlyStats } from "@/hooks/useMonthlyStats";
import { useCategories } from "@/hooks/useCategories";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardCategories } from "@/components/dashboard/DashboardCategories";
import { DashboardChart } from "@/components/dashboard/DashboardChart";

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
        <div className="flex h-full w-full items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
        </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <p className="text-red-500">Error fetching stats: {error.message}</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-12">
        {/* Titre / mois / année */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {now.toLocaleString("default", { month: "long" })}{" "}
            {now.getFullYear()}
          </h2>
          <p className="text-muted-foreground text-sm">
            Your financial summary at a glance
          </p>
        </div>

        {/* Overview bloc */}
        <DashboardOverview stats={stats} />

        {/* Chart bloc */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Monthly balance trend</h3>
          <DashboardChart />
        </div>

        {/* Catégories */}
        <div>
          <h3 className="font-semibold text-lg mb-3">By Category</h3>
          <DashboardCategories categories={categories} />
        </div>
      </div>
    </DashboardLayout>
  );
}
