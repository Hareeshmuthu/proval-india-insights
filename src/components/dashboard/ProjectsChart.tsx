
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

// Sample data
const currentYearData = [
  { name: "Jan", projects: 4 },
  { name: "Feb", projects: 6 },
  { name: "Mar", projects: 8 },
  { name: "Apr", projects: 10 },
  { name: "May", projects: 7 },
  { name: "Jun", projects: 9 },
  { name: "Jul", projects: 12 },
  { name: "Aug", projects: 14 },
  { name: "Sep", projects: 11 },
  { name: "Oct", projects: 9 },
  { name: "Nov", projects: 7 },
  { name: "Dec", projects: 10 },
];

const previousYearData = [
  { name: "Jan", projects: 3 },
  { name: "Feb", projects: 5 },
  { name: "Mar", projects: 7 },
  { name: "Apr", projects: 8 },
  { name: "May", projects: 6 },
  { name: "Jun", projects: 5 },
  { name: "Jul", projects: 10 },
  { name: "Aug", projects: 11 },
  { name: "Sep", projects: 9 },
  { name: "Oct", projects: 7 },
  { name: "Nov", projects: 6 },
  { name: "Dec", projects: 8 },
];

const ProjectsChart = () => {
  const [showCurrentYear, setShowCurrentYear] = useState(true);
  const data = showCurrentYear ? currentYearData : previousYearData;
  
  return (
    <div className="card-stats">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">Projects Overview</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowCurrentYear(!showCurrentYear)}
        >
          {showCurrentYear ? "Previous Year" : "Current Year"}
        </Button>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }} 
            />
            <Bar 
              dataKey="projects" 
              fill="#6E59A5" 
              radius={[4, 4, 0, 0]} 
              barSize={30} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectsChart;
