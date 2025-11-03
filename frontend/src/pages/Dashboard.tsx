import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useMonthlyStats } from "@/hooks/useMonthlyStats";

export default function Dashboard() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const { stats, loading, error } = useMonthlyStats(month, year);

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
      <div className="flex flex-col w-full gap-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Overview — {now.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl bg-background border border-muted p-5 shadow-sm">
            <h3 className="text-sm text-muted-foreground mb-1">Balance</h3>
            <p className="text-2xl font-bold text-foreground">
              {stats?.balance?.toFixed(2) ?? "0.00"} €
            </p>
          </div>

          <div className="rounded-xl bg-background border border-muted p-5 shadow-sm">
            <h3 className="text-sm text-muted-foreground mb-1">Expenses</h3>
            <p className="text-2xl font-bold text-destructive">
              {stats?.totalExpense?.toFixed(2) ?? "0.00"} €
            </p>
          </div>

          <div className="rounded-xl bg-background border border-muted p-5 shadow-sm">
            <h3 className="text-sm text-muted-foreground mb-1">Income</h3>
            <p className="text-2xl font-bold text-green-600">
              {stats?.totalIncome?.toFixed(2) ?? "0.00"} €
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
