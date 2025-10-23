import { AppProvider } from "@/providers/AppProvider";
import Register from "@/pages/Register";
import "./index.css";

export function App() {
  return (
    <AppProvider>
      <Register />
    </AppProvider>
  );
}
