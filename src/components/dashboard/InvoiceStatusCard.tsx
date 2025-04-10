
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Sample data
const currentMonthData = [
  { name: "Received", value: 65, color: "#6E59A5" },
  { name: "Yet to Come", value: 35, color: "#E5DEFF" },
];

const previousMonthData = [
  { name: "Received", value: 70, color: "#6E59A5" },
  { name: "Yet to Come", value: 30, color: "#E5DEFF" },
];

const InvoiceStatusCard = () => {
  const [showCurrentMonth, setShowCurrentMonth] = useState(true);
  const data = showCurrentMonth ? currentMonthData : previousMonthData;
  
  return (
    <div className="card-stats">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">Invoice Status</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowCurrentMonth(!showCurrentMonth)}
        >
          {showCurrentMonth ? "Previous Month" : "Current Month"}
        </Button>
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
                <span className="text-sm text-gray-700">{item.name}</span>
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
