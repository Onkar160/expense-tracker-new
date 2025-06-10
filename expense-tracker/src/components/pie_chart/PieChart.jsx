import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useState, useEffect, useContext } from "react";
import MyContext from "../../context";
import randomColor from "randomcolor";

const RADIAN = Math.PI / 180;
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const RADIAN = Math.PI / 180;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const generateRandomColor = (count) => {
  const used = new Set();
  const colors = [];
  while (colors.length < count) {
    const color = randomColor();
    if (!used.has(color)) {
      used.add(color);
      colors.push(color);
    }
  }
  return colors;
};

export default function PChart({ expenses }) {
  const { categories } = useContext(MyContext);
  const [chartData, setChartData] = useState([]);
  const [COLORS, setColors] = useState([]);

  useEffect(() => {
    let colors = generateRandomColor(categories.length);
    setColors(colors);
    const categoriesMap = categories.map((category) => ({
      name: category,
      value: 0,
    }));
    setChartData(categoriesMap);
  }, [categories]);

  useEffect(() => {
    const tempData = categories.map((category) => {
      let obj = { name: category, value: 0 };
      let totalAmount = expenses.reduce((acc, expense) => {
        if (expense.category === category) {
          return acc + Number(expense.price);
        }
        return acc;
      }, 0);
      obj.value = totalAmount;
      return obj;
    });
    // console.log(tempData);
    setChartData(tempData);
  }, [expenses, categories]);

  return (
    <div
      style={{
        width: "355.406px",
        height: "250px",
        backgroundColor: "#626262",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx={"50%"}
            cy={"50%"}
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderColor: "#444",
              color: "#fff",
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="square"
            content={({ payload }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "8px", // ⬅ control spacing between items here
                }}
              >
                {payload.map((entry, index) => (
                  <div
                    key={`item-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: entry.color,
                        borderRadius: 2,
                        marginRight: 6, // space between icon and label
                      }}
                    />
                    <span>{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
