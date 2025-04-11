
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, TooltipProps
} from 'recharts';
import { 
  NameType, ValueType
} from 'recharts/types/component/DefaultTooltipContent';

// Define the type for year strings
type YearKey = '2023' | '2024' | '2025';

// Define our data structure
interface InvoiceData {
  name: string;
  value: number;
  amount: string;
  color: string; // Add color property
}

interface InvoiceStatusData {
  [key: string]: {
    [key in YearKey]?: InvoiceData[];
  };
}

// Define the component
const InvoiceStatusCard = () => {
  // Sample data with colors added
  const invoiceStatusData: InvoiceStatusData = {
    monthly: {
      '2023': [
        { name: 'Paid', value: 65, amount: '$7,500', color: '#10b981' },
        { name: 'Pending', value: 25, amount: '$3,200', color: '#f59e0b' },
        { name: 'Overdue', value: 10, amount: '$1,800', color: '#ef4444' }
      ],
      '2024': [
        { name: 'Paid', value: 70, amount: '$8,200', color: '#10b981' },
        { name: 'Pending', value: 20, amount: '$2,800', color: '#f59e0b' },
        { name: 'Overdue', value: 10, amount: '$1,600', color: '#ef4444' }
      ],
      '2025': [
        { name: 'Paid', value: 75, amount: '$9,100', color: '#10b981' },
        { name: 'Pending', value: 15, amount: '$2,400', color: '#f59e0b' },
        { name: 'Overdue', value: 10, amount: '$1,400', color: '#ef4444' }
      ]
    },
    yearly: {
      '2023': [
        { name: 'Paid', value: 68, amount: '$78,500', color: '#10b981' },
        { name: 'Pending', value: 22, amount: '$32,000', color: '#f59e0b' },
        { name: 'Overdue', value: 10, amount: '$18,800', color: '#ef4444' }
      ],
      '2024': [
        { name: 'Paid', value: 72, amount: '$86,200', color: '#10b981' },
        { name: 'Pending', value: 18, amount: '$28,800', color: '#f59e0b' },
        { name: 'Overdue', value: 10, amount: '$16,600', color: '#ef4444' }
      ],
      '2025': [
        { name: 'Paid', value: 78, amount: '$94,100', color: '#10b981' },
        { name: 'Pending', value: 12, amount: '$24,400', color: '#f59e0b' },
        { name: 'Overdue', value: 10, amount: '$14,400', color: '#ef4444' }
      ]
    }
  };

  // State for selected period and year
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [year, setYear] = useState<YearKey>('2024');

  // Get data based on selected period and year
  const data = invoiceStatusData[period][year] || [];

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div className="bg-popover border p-2 rounded-md shadow-md">
          <p className="font-medium">{dataItem.name}</p>
          <p className="text-sm">{dataItem.value}% ({dataItem.amount})</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Invoice Status</h3>
        <div className="flex space-x-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'monthly' | 'yearly')}
            className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value as YearKey)}
            className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" name="Percentage" fill="#8884d8" barSize={40}>
              {data.map((entry, index) => (
                <Bar key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-center p-2 rounded-md" style={{ backgroundColor: `${item.color}20` }}>
            <p className="text-sm font-medium" style={{ color: item.color }}>{item.name}</p>
            <p className="text-xl font-bold" style={{ color: item.color }}>{item.value}%</p>
            <p className="text-xs" style={{ color: item.color }}>{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceStatusCard;
