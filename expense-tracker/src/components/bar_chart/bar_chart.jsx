import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AnimatedHorizontalBarChart({
  expenses,
  categoryMap,
}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let tempObj = { ...categoryMap };
    // console.log(tempObj);
    expenses.forEach(({ category, price }) => {
      if (tempObj.hasOwnProperty(category)) {
        tempObj[category] += Number(price);
      }
    });
    // console.log(tempObj);
    const dataArray = Object.entries(tempObj).map(([name, value]) => ({
      name,
      value,
    }));
    // console.log(dataArray)
    setChartData(dataArray);
  }, [expenses, categoryMap]);

  return (
    <div
      style={{
        width: "100%",
        height: "386.9px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ left: 80, right: 20, top: 20, bottom: 20 }}
          barGap={20}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 16 }}
          />
          <Bar
            dataKey="value"
            barSize={20}
            radius={[0, 20, 20, 0]}
            fill="#8884d8"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#8884d8" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
