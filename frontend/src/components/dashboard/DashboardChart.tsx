import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { MonthlyStats } from "@/hooks/useMonthlyStats";

type Props = {
  stats?: MonthlyStats;
};

export function DashboardChart({ stats }: Props) {
  // On transforme les stats en dataset Recharts
  const data = [
    {
      name: "Income",
      value: stats?.totalIncome ?? 0,
    },
    {
      name: "Expenses",
      value: -(stats?.totalExpense ?? 0), // négatif pour visualiser la baisse 💥
    },
  ];

  return (
    <div className="rounded-xl bg-background border border-muted p-6 shadow-sm h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            fill="hsl(var(--primary))"
            fillOpacity={0.4}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
