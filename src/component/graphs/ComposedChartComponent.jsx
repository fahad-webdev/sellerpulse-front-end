import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Feb',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Mar',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'April',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'May',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'June',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'July',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

const ComposedChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" barSize={20} fill="#0c1a3c" />
        <Line type="monotone" dataKey="uv" stroke="#abababcb" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartComponent;
