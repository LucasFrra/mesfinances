import type { Category } from "@/hooks/useCategories";

type DashboardCategoriesProps = {
  categories: Category[];
};

export function DashboardCategories({ categories }: DashboardCategoriesProps) {
  if (!categories.length)
    return (
      <p className="text-muted-foreground text-sm">No categories found.</p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="rounded-xl bg-background border border-muted p-4 shadow-sm flex items-center gap-3"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: cat.color || "#D1D5DB" }}
          />
          <span className="text-foreground">{cat.name}</span>
        </div>
      ))}
    </div>
  );
}
