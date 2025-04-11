
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { format } from "date-fns";

// Define type for year keys
type YearKey = "2023" | "2024" | "2025";

// Define the type for invoice data
interface InvoiceData {
  name: string;
  value: number;
  amount: string;
  color: string; // Adding color property
}

// Sample data with monthly invoices for different years
const invoiceData: Record<YearKey, InvoiceData[]> = {
  "2023": [
    { name: "Jan", value: 45, amount: "₹12,500", color: "#8884d8" },
    { name: "Feb", value: 52, amount: "₹14,200", color: "#82ca9d" },
    { name: "Mar", value: 48, amount: "₹13,100", color: "#ffc658" },
    { name: "Apr", value: 61, amount: "₹16,800", color: "#8dd1e1" },
    { name: "May", value: 55, amount: "₹15,200", color: "#a4de6c" },
    { name: "Jun", value: 67, amount: "₹18,500", color: "#d0ed57" },
    { name: "Jul", value: 70, amount: "₹19,300", color: "#8884d8" },
    { name: "Aug", value: 75, amount: "₹20,700", color: "#82ca9d" },
    { name: "Sep", value: 68, amount: "₹18,800", color: "#ffc658" },
    { name: "Oct", value: 82, amount: "₹22,600", color: "#8dd1e1" },
    { name: "Nov", value: 78, amount: "₹21,500", color: "#a4de6c" },
    { name: "Dec", value: 91, amount: "₹25,100", color: "#d0ed57" },
  ],
  "2024": [
    { name: "Jan", value: 65, amount: "₹17,900", color: "#8884d8" },
    { name: "Feb", value: 59, amount: "₹16,200", color: "#82ca9d" },
    { name: "Mar", value: 80, amount: "₹22,000", color: "#ffc658" },
    { name: "Apr", value: 71, amount: "₹19,500", color: "#8dd1e1" },
    { name: "May", value: 56, amount: "₹15,400", color: "#a4de6c" },
    { name: "Jun", value: 55, amount: "₹15,100", color: "#d0ed57" },
    { name: "Jul", value: 40, amount: "₹11,000", color: "#8884d8" },
    { name: "Aug", value: 45, amount: "₹12,400", color: "#82ca9d" },
    { name: "Sep", value: 48, amount: "₹13,200", color: "#ffc658" },
    { name: "Oct", value: 51, amount: "₹14,000", color: "#8dd1e1" },
    { name: "Nov", value: 65, amount: "₹17,900", color: "#a4de6c" },
    { name: "Dec", value: 78, amount: "₹21,500", color: "#d0ed57" },
  ],
  "2025": [
    { name: "Jan", value: 85, amount: "₹23,400", color: "#8884d8" },
    { name: "Feb", value: 79, amount: "₹21,700", color: "#82ca9d" },
    { name: "Mar", value: 92, amount: "₹25,300", color: "#ffc658" },
    { name: "Apr", value: 86, amount: "₹23,700", color: "#8dd1e1" },
    { name: "May", value: 99, amount: "₹27,300", color: "#a4de6c" },
    { name: "Jun", value: 88, amount: "₹24,200", color: "#d0ed57" },
    { name: "Jul", value: 90, amount: "₹24,800", color: "#8884d8" },
    { name: "Aug", value: 85, amount: "₹23,400", color: "#82ca9d" },
    { name: "Sep", value: 72, amount: "₹19,800", color: "#ffc658" },
    { name: "Oct", value: 71, amount: "₹19,500", color: "#8dd1e1" },
    { name: "Nov", value: 80, amount: "₹22,000", color: "#a4de6c" },
    { name: "Dec", value: 100, amount: "₹27,500", color: "#d0ed57" },
  ],
};

// Custom tooltip component for the chart
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as InvoiceData;
    
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.value}% completed
        </p>
        <p className="text-sm font-medium">{data.amount}</p>
      </div>
    );
  }

  return null;
};

export default function InvoiceStatusCard() {
  const currentYear = new Date().getFullYear().toString() as YearKey;
  const [year, setYear] = useState<YearKey>(currentYear);
  const [chartHeight, setChartHeight] = useState(300);

  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle>Invoice Status</CardTitle>
        <CardDescription>
          Monthly completion percentage and payments.
        </CardDescription>
        <Tabs defaultValue={year} className="w-full" onValueChange={(value) => setYear(value as YearKey)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="2023">2023</TabsTrigger>
            <TabsTrigger value="2024">2024</TabsTrigger>
            <TabsTrigger value="2025">2025</TabsTrigger>
          </TabsList>
          {Object.keys(invoiceData).map((yearKey) => (
            <TabsContent key={yearKey} value={yearKey} className="space-y-4">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={invoiceData[yearKey as YearKey]}
                    margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => `${value}%`}
                      domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {invoiceData[yearKey as YearKey].map((entry, index) => (
                      <Bar
                        key={`bar-${index}`}
                        dataKey="value"
                        fill={entry.color}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-xl font-bold">62%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Pending</p>
          <p className="text-xl font-bold">38%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Value</p>
          <p className="text-xl font-bold">₹208,720</p>
        </div>
      </CardContent>
    </Card>
  );
}
