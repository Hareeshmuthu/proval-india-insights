
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";

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

const years = ["2022", "2023", "2024", "2025"];

interface ProjectsChartProps {
  projects?: any[];
}

const ProjectsChart = ({ projects }: ProjectsChartProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [chartData, setChartData] = useState(currentYearData);
  
  // Process actual projects data if available
  const processProjectsData = (year: string) => {
    if (!projects || projects.length === 0) {
      return selectedYear === "2025" ? currentYearData : previousYearData;
    }
    
    // Create an array with all months initialized to 0
    const monthlyData = [
      { name: "Jan", projects: 0 },
      { name: "Feb", projects: 0 },
      { name: "Mar", projects: 0 },
      { name: "Apr", projects: 0 },
      { name: "May", projects: 0 },
      { name: "Jun", projects: 0 },
      { name: "Jul", projects: 0 },
      { name: "Aug", projects: 0 },
      { name: "Sep", projects: 0 },
      { name: "Oct", projects: 0 },
      { name: "Nov", projects: 0 },
      { name: "Dec", projects: 0 },
    ];
    
    // Count projects for each month in the selected year
    projects.forEach(project => {
      const createdDate = new Date(project.createdAt);
      const projectYear = createdDate.getFullYear().toString();
      
      if (projectYear === year) {
        const month = createdDate.getMonth(); // 0-based index (0 = January)
        monthlyData[month].projects += 1;
      }
    });
    
    return monthlyData;
  };
  
  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    setChartData(processProjectsData(value));
  };
  
  return (
    <div className="card-stats">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Projects Overview</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Year:</span>
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
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
