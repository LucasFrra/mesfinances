import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";

type HeaderProps = {
  email: string;
};

export function Header({ email }: HeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="bg-background border-b border-muted py-3 px-6 flex justify-between items-center shadow-sm">
      <h1 className="text-lg font-semibold text-foreground">
        MesFinances<span className="text-primary">.</span>
      </h1>
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground truncate max-w-[150px]">
          {email}
        </p>
        <Button onClick={logout} variant="destructive" className="text-white">
          Logout
        </Button>
      </div>
    </header>
  );
}
