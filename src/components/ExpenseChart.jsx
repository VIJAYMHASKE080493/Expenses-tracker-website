import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6666"];

function ExpenseCharts({ chartData }) {
  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
      {/* Pie Chart */}
      <div style={{ flex: 1, height: 300 }}>
        <h3 style={{ textAlign: "center" }}>Expense Distribution by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={{ flex: 1, height: 300 }}>
        <h3 style={{ textAlign: "center" }}>Expense Amount by Category (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height="100%">
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
    </div>
  );
}

export default ExpenseCharts;
