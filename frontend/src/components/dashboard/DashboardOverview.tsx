import type { MonthlyStats } from "@/hooks/useMonthlyStats";

type DashboardOverviewProps = {
  stats?: MonthlyStats;
};

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  return (
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
  );
}
