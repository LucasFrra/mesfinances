import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type MonthNavigatorProps = {
  month: number;
  year: number;
  onChange: (newMonth: number, newYear: number) => void;
};

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export function MonthNavigator({ month, year, onChange }: MonthNavigatorProps) {
  const goPrev = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    onChange(newMonth, newYear);
  };

  const goNext = () => {
    const now = new Date();
    const isCurrentMonth =
      month === now.getMonth() + 1 && year === now.getFullYear();
    if (isCurrentMonth) return;

    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    onChange(newMonth, newYear);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <Button
        variant="outline"
        size="icon"
        onClick={goPrev}
        className="rounded-full"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <h2 className="text-xl font-semibold capitalize">
        {MONTHS[month - 1]} {year}
      </h2>

      <Button
        variant="outline"
        size="icon"
        onClick={goNext}
        className="rounded-full"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
