import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome back 👋
          </h2>
          <p className="text-muted-foreground">
            Here’s an overview of your finances.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl bg-background border border-muted p-5 shadow-sm">
            <h3 className="text-sm text-muted-foreground mb-1">Balance</h3>
            <p className="text-2xl font-bold text-foreground">€0.00</p>
          </div>

          <div className="rounded-xl bg-background border border-muted p-5 shadow-sm">
            <h3 className="text-sm text-muted-foreground mb-1">Expenses</h3>
            <p className="text-2xl font-bold text-destructive">€0.00</p>
          </div>

          <div className="rounded-xl bg-background border border-muted p-5 shadow-sm">
            <h3 className="text-sm text-muted-foreground mb-1">Income</h3>
            <p className="text-2xl font-bold text-green-600">€0.00</p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button disabled className="opacity-70 cursor-not-allowed">
            View Statistics (Coming soon)
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
