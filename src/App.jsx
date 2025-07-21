import { useEffect, useState } from "react";
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
import "./App.css";

function App() {
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [expense, setExpense] = useState({
    name: "",
    date: "",
    category: "",
    amount: "",
  });

  const [expensesList, setExpensesList] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [totalBudget, setTotalBudget] = useState(() => {
    const storedBudget = localStorage.getItem("budget");
    return storedBudget ? parseFloat(storedBudget) : 0;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");

  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const totalExp = expensesList.reduce(
      (sum, item) => sum + parseFloat(item.amount || 0),
      0
    );
    setTotalExpense(totalExp);
    setRemainingBudget(totalBudget - totalExp);
  }, [expensesList, totalBudget]);

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    let updatedList = [];

    if (isEditing) {
      updatedList = [...expensesList];
      updatedList[editIndex] = expense;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedList = [...expensesList, expense];
    }

    setExpensesList(updatedList);
    localStorage.setItem("expenses", JSON.stringify(updatedList));
    setShowExpensePopup(false);
    setExpense({ name: "", date: "", category: "", amount: "" });
  };

  const handleEdit = (index) => {
    setExpense(expensesList[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowExpensePopup(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updated = expensesList.filter((_, i) => i !== deleteIndex);
    setExpensesList(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const handleBudgetChange = (e) => {
    setBudgetAmount(e.target.value);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();

    const newBudget = parseFloat(budgetAmount);
    if (isNaN(newBudget) || newBudget <= 0) return;

    const updatedBudget = totalBudget + newBudget;
    localStorage.setItem("budget", updatedBudget);
    setTotalBudget(updatedBudget);
    setRemainingBudget(updatedBudget - totalExpense);

    setShowBudgetPopup(false);
    setBudgetAmount("");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredExpenses = expensesList.filter((exp) => {
    const matchesCategory =
      selectedCategory === "All" || exp.category === selectedCategory;
    const matchesSearch =
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ✅ Pie chart data by category
  const chartData = filteredExpenses.reduce((acc, curr) => {
    const found = acc.find((item) => item.name === curr.category);
    if (found) {
      found.value += parseFloat(curr.amount);
    } else {
      acc.push({ name: curr.category, value: parseFloat(curr.amount) });
    }
    return acc;
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6666"];

  return (
    <>
      {/* Header */}
      <div className="header">
        <header>
          <h3>Expense Tracker</h3>
        </header>
      </div>

      <div className="name">
        <h1>Hello, Vijay Mhaske</h1>
      </div>

      {/* Budget Info */}
      <div className="ExpensesName">
        <div className="T-Budge">
          <p>Total Budget</p>
          <h2>${totalBudget.toLocaleString()}</h2>
        </div>
        <div className="T-Expense">
          <p>Total Expense</p>
          <h2>${totalExpense.toLocaleString()}</h2>
        </div>
        <div className="Remaninig-B">
          <p>Remaining Budget</p>
          <h2>${remainingBudget.toLocaleString()}</h2>
        </div>
      </div>

      {/* Category & Search */}
      <div className="Categaries">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => handleCategoryClick("All")}
        >
          <i className="fas fa-list"></i> All Expenses
        </button>
        <button
          className={selectedCategory === "Food Drinks" ? "active" : ""}
          onClick={() => handleCategoryClick("Food Drinks")}
        >
          <i className="fa-solid fa-pizza-slice"></i> Food Drinks
        </button>
        <button
          className={selectedCategory === "Groceries" ? "active" : ""}
          onClick={() => handleCategoryClick("Groceries")}
        >
          <i className="fa-solid fa-bag-shopping"></i> Groceries
        </button>
        <button
          className={selectedCategory === "Travel" ? "active" : ""}
          onClick={() => handleCategoryClick("Travel")}
        >
          <i className="fa-solid fa-suitcase-rolling"></i> Travel
        </button>
        <button
          className={selectedCategory === "Health" ? "active" : ""}
          onClick={() => handleCategoryClick("Health")}
        >
          <i className="fas fa-heartbeat"></i> Health
        </button>

        <button className="add-budget" onClick={() => setShowBudgetPopup(true)}>
          <i className="fas fa-plus"></i> Add Budget
        </button>

        <button
          className="Add-Expenses"
          onClick={() => setShowExpensePopup(true)}
        >
          <i className="fas fa-plus"></i> Add Expenses
        </button>
      </div>

      {/* Expense Table */}
      <div className="expense-table-container">
        <h3>Expenses List</h3>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Expense</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No expenses found for this category.
                </td>
              </tr>
            ) : (
              filteredExpenses.map((exp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{exp.name}</td>
                  <td>${exp.amount}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDeleteClick(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pie Chart Section */}
      {chartData.length > 0 && (
        <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
          <h3 style={{ textAlign: "center" }}>
            Expense Distribution by Category
          </h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
      )}

      {/* ✅ Dynamic Bar Chart Section */}
      {chartData.length > 0 && (
        <div style={{ width: "100%", height: 300, marginTop: "40px" }}>
          <h3 style={{ textAlign: "center" }}>
            Expense Amount by Category (Bar Chart)
          </h3>
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
      )}
      {/* Popup Modals (same as your code, not changed) */}
      {/* Expense Popup */}
      {showExpensePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <i
              className="fa-solid fa-xmark close-icon"
              onClick={() => setShowExpensePopup(false)}
            ></i>
            <h3 className="popup-title">
              {isEditing ? "Edit Expense" : "Add New Expense"}
            </h3>
            <hr className="popup-divider" />
            <form onSubmit={handleExpenseSubmit}>
              <label>Expense Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Expense Name"
                value={expense.name}
                onChange={handleExpenseChange}
                required
              />
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={expense.date}
                onChange={handleExpenseChange}
                required
              />
              <label>Category *</label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                list="category-options"
                value={expense.category}
                onChange={handleExpenseChange}
                required
              />
              <datalist id="category-options">
                <option value="Food Drinks" />
                <option value="Groceries" />
                <option value="Travel" />
                <option value="Health" />
              </datalist>
              <label>Amount *</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expense.amount}
                onChange={handleExpenseChange}
                required
              />
              <div className="buttons">
                <button type="submit">
                  {isEditing ? "Update Expense" : "Add Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Budget Popup */}
      {showBudgetPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <i
              className="fa-solid fa-xmark close-icon"
              onClick={() => setShowBudgetPopup(false)}
            ></i>
            <h3 className="popup-title">Add Budget</h3>
            <hr className="popup-divider" />
            <form onSubmit={handleBudgetSubmit}>
              <label>Amount *</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={budgetAmount}
                onChange={handleBudgetChange}
                required
              />
              <div className="buttons">
                <button type="submit">Add Budget</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Popup */}
      {showDeleteConfirm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "0 auto 10px",
                  borderRadius: "50%",
                  backgroundColor: "#f8d7da",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "#721c24",
                }}
              >
                <i className="fa-solid fa-exclamation"></i>
              </div>
              <h3 className="popup-title" style={{ color: "#721c24" }}>
                Are you sure?
              </h3>
              <p>
                Do you really want to delete this expense:{" "}
                <strong>{expensesList[deleteIndex]?.name}</strong>?
              </p>
              <div
                className="buttons"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <button onClick={cancelDelete}>Cancel</button>
                <button
                  onClick={confirmDelete}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
