
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Sample data for the chart
const data = [
  {
    name: "Jan",
    pending: 40,
    paid: 60,
  },
  {
    name: "Feb",
    pending: 30,
    paid: 70,
  },
  {
    name: "Mar",
    pending: 20,
    paid: 90,
  },
  {
    name: "Apr",
    pending: 45,
    paid: 55,
  },
  {
    name: "May",
    pending: 25,
    paid: 85,
  },
  {
    name: "Jun",
    pending: 15,
    paid: 95,
  },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-background border p-2 rounded shadow-md">
        <p className="label font-medium">{`${label}`}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} style={{ color: item.color }}>
            {item.name}: ₹{item.value}k
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const InvoiceStatusCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Invoice Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pending" fill="#FF8A65" name="Pending" />
              <Bar dataKey="paid" fill="#81C784" name="Paid" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Pending</p>
            <p className="text-xl font-semibold">₹155k</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Received</p>
            <p className="text-xl font-semibold">₹455k</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceStatusCard;
