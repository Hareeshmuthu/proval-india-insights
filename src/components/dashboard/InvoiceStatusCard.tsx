
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const monthsData = {
  Jan: [{ name: "Received", value: 65, color: "#6E59A5" }, { name: "Yet to Come", value: 35, color: "#E5DEFF" }],
  Feb: [{ name: "Received", value: 70, color: "#6E59A5" }, { name: "Yet to Come", value: 30, color: "#E5DEFF" }],
  Mar: [{ name: "Received", value: 75, color: "#6E59A5" }, { name: "Yet to Come", value: 25, color: "#E5DEFF" }],
  Apr: [{ name: "Received", value: 60, color: "#6E59A5" }, { name: "Yet to Come", value: 40, color: "#E5DEFF" }],
  May: [{ name: "Received", value: 55, color: "#6E59A5" }, { name: "Yet to Come", value: 45, color: "#E5DEFF" }],
  Jun: [{ name: "Received", value: 80, color: "#6E59A5" }, { name: "Yet to Come", value: 20, color: "#E5DEFF" }],
  Jul: [{ name: "Received", value: 85, color: "#6E59A5" }, { name: "Yet to Come", value: 15, color: "#E5DEFF" }],
  Aug: [{ name: "Received", value: 90, color: "#6E59A5" }, { name: "Yet to Come", value: 10, color: "#E5DEFF" }],
  Sep: [{ name: "Received", value: 75, color: "#6E59A5" }, { name: "Yet to Come", value: 25, color: "#E5DEFF" }],
  Oct: [{ name: "Received", value: 65, color: "#6E59A5" }, { name: "Yet to Come", value: 35, color: "#E5DEFF" }],
  Nov: [{ name: "Received", value: 60, color: "#6E59A5" }, { name: "Yet to Come", value: 40, color: "#E5DEFF" }],
  Dec: [{ name: "Received", value: 70, color: "#6E59A5" }, { name: "Yet to Come", value: 30, color: "#E5DEFF" }]
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const InvoiceStatusCard = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const data = monthsData[selectedMonth as keyof typeof monthsData];
  
  return (
    <div className="card-stats">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Invoice Status</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Month:</span>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                formatter={(value) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col space-y-3 mt-4 md:mt-0">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceStatusCard;
