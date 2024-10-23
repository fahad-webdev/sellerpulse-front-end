import React from 'react'
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
const TotalOrder = () => {
    const data = [
        {
          name: "Page A",
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: "Page B",
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: "Page C",
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: "Page D",
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: "Page E",
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: "Page F",
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: "Page G",
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 7,
        right: 30,
        left: 20,
        bottom: 3,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="pv"
        fill=" #0c1a3c"
        activeBar={<Rectangle fill="#b1b0b0cd" stroke="#0c1a3c" />}
      />
      <Bar
        dataKey="uv"
        fill="#b1b0b0cd"
        activeBar={<Rectangle fill="#0c1a3c" stroke="#b1b0b0cd" />}
      />
    </BarChart>
  </ResponsiveContainer>
    </>
  )
}

export default TotalOrder
