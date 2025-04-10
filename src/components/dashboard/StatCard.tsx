
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <div className={cn("card-stats dark:bg-gray-800 dark:border-gray-700", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="p-2 bg-proval-50 dark:bg-proval-950/50 rounded-full">
          <Icon className="w-5 h-5 text-proval-500 dark:text-proval-400" />
        </div>
      </div>
      <p className="text-2xl font-bold mt-2 dark:text-white">{value}</p>
      {trend && (
        <div className="flex items-center mt-2">
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
            )}
          >
            {trend.positive ? "+" : "-"}{trend.value}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
