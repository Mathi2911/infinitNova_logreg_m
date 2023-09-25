import React from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip as PieChartTooltip,
} from 'recharts';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as LineChartTooltip,
  Legend,
  BarChart,
  Bar, 
  Tooltip,
} from 'recharts'; 

function formatPopulation(population) {
  return `${population.toFixed(1)} crores`;
}

function ChartComponent({ data }) {
  const pieData = data.map((item) => ({
    state: item.city_name,
    population: parseFloat(item.population),
  }));

  const lineChartData = data.map((item) => ({
    state: item.city_name,
    population: parseFloat(item.population),
  }));

  const barChartData = data.map((item) => ({
    state: item.city_name,
    population: parseFloat(item.population),
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length > 0) {
      const entry = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>State: {entry.state}</p>
          <p>Population: {formatPopulation(entry.population)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>Population Distribution by State (Pie Chart)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="population"
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <PieChartTooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <h2>Population Distribution by State (Line Chart)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={lineChartData}>
          <XAxis dataKey="state" />
          <YAxis />
          <LineChartTooltip />
          <Legend />
          <Line type="monotone" dataKey="population" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Population Distribution by State (Bar Chart)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barChartData}>
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="population" fill={COLORS[0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartComponent;
