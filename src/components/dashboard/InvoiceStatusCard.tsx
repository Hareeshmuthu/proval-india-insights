
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Payload } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Define strongly typed years for type safety
type YearKey = "2023" | "2024" | "2025";

// Add color property to data items
type InvoiceData = {
  name: string;
  value: number;
  amount: string;
  color: string;
};

// Sample data with added color property
const yearData: Record<YearKey, Record<string, InvoiceData[]>> = {
  "2023": {
    Jan: [{ name: "Received", value: 65, amount: "₹32,500", color: "#6E59A5" }, { name: "Yet to Come", value: 35, amount: "₹17,500", color: "#E5DEFF" }],
    Feb: [{ name: "Received", value: 70, amount: "₹35,000", color: "#6E59A5" }, { name: "Yet to Come", value: 30, amount: "₹15,000", color: "#E5DEFF" }],
    Mar: [{ name: "Received", value: 75, amount: "₹37,500", color: "#6E59A5" }, { name: "Yet to Come", value: 25, amount: "₹12,500", color: "#E5DEFF" }],
    Apr: [{ name: "Received", value: 60, amount: "₹30,000", color: "#6E59A5" }, { name: "Yet to Come", value: 40, amount: "₹20,000", color: "#E5DEFF" }],
    May: [{ name: "Received", value: 55, amount: "₹27,500", color: "#6E59A5" }, { name: "Yet to Come", value: 45, amount: "₹22,500", color: "#E5DEFF" }],
    Jun: [{ name: "Received", value: 80, amount: "₹40,000", color: "#6E59A5" }, { name: "Yet to Come", value: 20, amount: "₹10,000", color: "#E5DEFF" }],
    Jul: [{ name: "Received", value: 85, amount: "₹42,500", color: "#6E59A5" }, { name: "Yet to Come", value: 15, amount: "₹7,500", color: "#E5DEFF" }],
    Aug: [{ name: "Received", value: 90, amount: "₹45,000", color: "#6E59A5" }, { name: "Yet to Come", value: 10, amount: "₹5,000", color: "#E5DEFF" }],
    Sep: [{ name: "Received", value: 75, amount: "₹37,500", color: "#6E59A5" }, { name: "Yet to Come", value: 25, amount: "₹12,500", color: "#E5DEFF" }],
    Oct: [{ name: "Received", value: 65, amount: "₹32,500", color: "#6E59A5" }, { name: "Yet to Come", value: 35, amount: "₹17,500", color: "#E5DEFF" }],
    Nov: [{ name: "Received", value: 60, amount: "₹30,000", color: "#6E59A5" }, { name: "Yet to Come", value: 40, amount: "₹20,000", color: "#E5DEFF" }],
    Dec: [{ name: "Received", value: 70, amount: "₹35,000", color: "#6E59A5" }, { name: "Yet to Come", value: 30, amount: "₹15,000", color: "#E5DEFF" }]
  },
  "2024": {
    Jan: [{ name: "Received", value: 70, amount: "₹35,000", color: "#6E59A5" }, { name: "Yet to Come", value: 30, amount: "₹15,000", color: "#E5DEFF" }],
    Feb: [{ name: "Received", value: 75, amount: "₹37,500", color: "#6E59A5" }, { name: "Yet to Come", value: 25, amount: "₹12,500", color: "#E5DEFF" }],
    Mar: [{ name: "Received", value: 80, amount: "₹40,000", color: "#6E59A5" }, { name: "Yet to Come", value: 20, amount: "₹10,000", color: "#E5DEFF" }],
    Apr: [{ name: "Received", value: 85, amount: "₹42,500", color: "#6E59A5" }, { name: "Yet to Come", value: 15, amount: "₹7,500", color: "#E5DEFF" }],
    May: [{ name: "Received", value: 90, amount: "₹45,000", color: "#6E59A5" }, { name: "Yet to Come", value: 10, amount: "₹5,000", color: "#E5DEFF" }],
    Jun: [{ name: "Received", value: 80, amount: "₹40,000", color: "#6E59A5" }, { name: "Yet to Come", value: 20, amount: "₹10,000", color: "#E5DEFF" }],
    Jul: [{ name: "Received", value: 75, amount: "₹37,500", color: "#6E59A5" }, { name: "Yet to Come", value: 25, amount: "₹12,500", color: "#E5DEFF" }],
    Aug: [{ name: "Received", value: 85, amount: "₹42,500", color: "#6E59A5" }, { name: "Yet to Come", value: 15, amount: "₹7,500", color: "#E5DEFF" }],
    Sep: [{ name: "Received", value: 80, amount: "₹40,000", color: "#6E59A5" }, { name: "Yet to Come", value: 20, amount: "₹10,000", color: "#E5DEFF" }],
    Oct: [{ name: "Received", value: 75, amount: "₹37,500", color: "#6E59A5" }, { name: "Yet to Come", value: 25, amount: "₹12,500", color: "#E5DEFF" }],
    Nov: [{ name: "Received", value: 70, amount: "₹35,000", color: "#6E59A5" }, { name: "Yet to Come", value: 30, amount: "₹15,000", color: "#E5DEFF" }],
    Dec: [{ name: "Received", value: 80, amount: "₹40,000", color: "#6E59A5" }, { name: "Yet to Come", value: 20, amount: "₹10,000", color: "#E5DEFF" }]
  },
  "2025": {
    Jan: [{ name: "Received", value: 90, amount: "₹45,000", color: "#6E59A5" }, { name: "Yet to Come", value: 10, amount: "₹5,000", color: "#E5DEFF" }],
    Feb: [{ name: "Received", value: 85, amount: "₹42,500", color: "#6E59A5" }, { name: "Yet to Come", value: 15, amount: "₹7,500", color: "#E5DEFF" }],
    Mar: [{ name: "Received", value: 80, amount: "₹40,000", color: "#6E59A5" }, { name: "Yet to Come", value: 20, amount: "₹10,000", color: "#E5DEFF" }],
    Apr: [{ name: "Received", value: 75, amount: "₹37,500", color: "#6E59A5" }, { name: "Yet to Come", value: 25, amount: "₹12,500", color: "#E5DEFF" }],
    May: [{ name: "Received", value: 70, amount: "₹35,000", color: "#6E59A5" }, { name: "Yet to Come", value: 30, amount: "₹15,000", color: "#E5DEFF" }],
    Jun: [{ name: "Received", value: 65, amount: "₹32,500", color: "#6E59A5" }, { name: "Yet to Come", value: 35, amount: "₹17,500", color: "#E5DEFF" }],
    Jul: [{ name: "Received", value: 60, amount: "₹30,000", color: "#6E59A5" }, { name: "Yet to Come", value: 40, amount: "₹20,000", color: "#E5DEFF" }],
    Aug: [{ name: "Received", value: 65, amount: "₹32,500", color: "#6E59A5" }, { name: "Yet to Come", value: 35, amount: "₹17,500", color: "#E5DEFF" }],
    Sep: [{ name: "Received", value: 70, amount: "₹35,000", color: "#6E59A5" }, { name: "Yet to Come", value: 30, amount: "₹15,000", color: "#E5DEFF" }],
    Oct: [{ name: "Received", value: 75, amount: "₹37,500", color: "#6E59A5" }, { name: "Yet to Come", value: 25, amount: "₹12,500", color: "#E5DEFF" }],
    Nov: [{ name: "Received", value: 80, amount: "₹40,000", color: "#6E59A5" }, { name: "Yet to Come", value: 20, amount: "₹10,000", color: "#E5DEFF" }],
    Dec: [{ name: "Received", value: 85, amount: "₹42,500", color: "#6E59A5" }, { name: "Yet to Come", value: 15, amount: "₹7,500", color: "#E5DEFF" }]
  }
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const InvoiceStatusCard = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  
  const [selectedYear, setSelectedYear] = useState<YearKey>("2025"); // Set default with correct type
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const yearOptions = Object.keys(yearData) as YearKey[];
  const data = yearData[selectedYear][selectedMonth as keyof (typeof yearData)[YearKey]];
  
  const handleDateSelect = (selected: Date | undefined) => {
    if (selected) {
      setDate(selected);
      const year = selected.getFullYear().toString();
      
      // Type check before assignment
      if (yearOptions.includes(year as YearKey)) {
        setSelectedYear(year as YearKey);
        setSelectedMonth(format(selected, 'MMM'));
      }
    }
  };
  
  return (
    <div className="card-stats">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Invoice Status</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Date:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[180px] justify-start text-left font-normal")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center h-64">
        <div className="w-full md:w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }} 
                formatter={(value, name, props) => {
                  // Safely access index with proper type casting
                  if (props && typeof props.payload === 'object' && props.payload) {
                    const entry = props.payload as unknown as InvoiceData;
                    return [`${value}% (${entry.amount})`, entry.name];
                  }
                  return [value, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col space-y-3 mt-4 md:mt-0">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">{item.value}%</span>
                <span className="text-xs text-gray-500">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceStatusCard;
