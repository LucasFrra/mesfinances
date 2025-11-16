import { useState } from "react";
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
  "#0EA5E9",
  "#22C55E",
  "#F97316",
  "#E11D48",
  "#A855F7",
  "#FACC15",
  "#14B8A6",
  "#6366F1",
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
  const [mode, setMode] = useState<"expenses" | "income">("expenses");

  const categoryStats =
    mode === "expenses"
      ? stats?.expenseByCategory ?? []
      : stats?.incomeByCategory ?? [];

  const data: PieDatum[] = categoryStats
    .filter((item) => item.total > 0)
    .map((item, index) => {
      const cat = categories.find((c) => c.name === item.categoryName);
      return {
        name: item.categoryName,
        value: item.total,
        color: (cat?.color ??
          FALLBACK_COLORS[index % FALLBACK_COLORS.length]) as string,
        icon: cat?.icon,
      };
    });

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-xl bg-background border border-muted p-6 shadow-sm flex flex-col gap-4">
      {/* Toggle ALWAYS visible */}
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={() => setMode("expenses")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            mode === "expenses"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Dépenses
        </button>
        <button
          onClick={() => setMode("income")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            mode === "income"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Revenus
        </button>
      </div>

      {/* If no data */}
      {!data.length ? (
        <div className="rounded-xl bg-background border border-muted p-6 shadow-sm flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Aucune donnée pour ce mois.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
          {/* Donut */}
          <div className="relative h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    index,
                  }) => {
                    if (
                      midAngle === undefined ||
                      cx === undefined ||
                      cy === undefined ||
                      innerRadius === undefined ||
                      outerRadius === undefined
                    )
                      return null;

                    const item = data[index];
                    if (!item) return null;

                    // SEUIL : si < 5% du total => pas d'icône
                    const slicePercentage = (item.value / total) * 100;
                    if (slicePercentage < 5) return null;

                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.55;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return item.icon ? (
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={16}
                      >
                        {item.icon}
                      </text>
                    ) : null;
                  }}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs uppercase text-muted-foreground mb-1">
                Total {mode === "expenses" ? "dépensé" : "reçu"}
              </p>
              <p className="text-xl font-semibold">{formatCurrency(total)}</p>
            </div>
          </div>

          {/* Legend list */}
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
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {percentage}% du total
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
      )}
    </div>
  );
}
