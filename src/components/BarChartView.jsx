import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function BarChartView({ chartData }) {
  return (
    <div style={{ width: "100%", height: 300, marginTop: "40px" }}>
      <h3 style={{ textAlign: "center" }}>Expense Amount by Category (Bar Chart)</h3>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="10%"
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" name="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartView;
