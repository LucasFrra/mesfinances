import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { MonthlyStats } from "@/hooks/useMonthlyStats";
import type { Category } from "@/hooks/useCategories";

type DashboardCategoryPieProps = {
  stats?: MonthlyStats;
  categories: Category[];
};

type PieDatum = {
  name: string;
  value: number;
  color: string;
  icon?: string;
};

const FALLBACK_COLORS = [
  "#0EA5E9", // bleu
  "#22C55E", // vert
  "#F97316", // orange
  "#E11D48", // rose
  "#A855F7", // violet
  "#FACC15", // jaune
  "#14B8A6", // teal
  "#6366F1", // indigo
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function DashboardCategoryPie({
  stats,
  categories,
}: DashboardCategoryPieProps) {
  const expenseByCategory = stats?.expenseByCategory ?? [];

  // On construit les datas pour le donut
  const data: PieDatum[] = expenseByCategory
    .filter((item) => item.total > 0)
    .map((item, index) => {
      const cat = categories.find((c) => c.name === item.categoryName);
      return {
        name: item.categoryName,
        value: item.total,
        color: (cat?.color ||
          FALLBACK_COLORS[index % FALLBACK_COLORS.length]) as string,
        icon: cat?.icon,
      };
    });

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (!data.length) {
    return (
      <div className="rounded-xl bg-background border border-muted p-6 shadow-sm flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          No expenses for this month yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 rounded-xl bg-background border border-muted p-6 shadow-sm">
      {/* Donut */}
      <div className="relative h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => label}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Centre du donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs uppercase text-muted-foreground mb-1">
            Total expenses
          </p>
          <p className="text-xl font-semibold">{formatCurrency(total)}</p>
        </div>
      </div>

      {/* Liste des catégories */}
      <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
        {data.map((item) => {
          const percentage =
            total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {percentage}% of expenses
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold">
                {formatCurrency(item.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
