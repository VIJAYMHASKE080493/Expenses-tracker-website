import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [expense, setExpense] = useState({
    name: "",
    date: "",
    category: "",
    amount: "",
  });

  const [expensesList, setExpensesList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const budget = parseFloat(localStorage.getItem("budget")) || 0;
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const totalExp = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    setTotalBudget(budget);
    setExpensesList(expenses);
    setTotalExpense(totalExp);
    setRemainingBudget(budget - totalExp);
  }, []);

  // Recalculate totals when expenses change
  useEffect(() => {
    const totalExp = expensesList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    setTotalExpense(totalExp);
    setRemainingBudget(totalBudget - totalExp);
    localStorage.setItem("expenses", JSON.stringify(expensesList)); // Save on update
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
    setShowExpensePopup(false);
    setExpense({ name: "", date: "", category: "", amount: "" });
  };

  const handleEdit = (index) => {
    const selected = expensesList[index];
    setExpense(selected);
    setEditIndex(index);
    setIsEditing(true);
    setShowExpensePopup(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updated = expensesList.filter((_, i) => i !== deleteIndex);
    setExpensesList(updated);
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
    localStorage.setItem("budget", budgetAmount); // Save to localStorage
    setTotalBudget(parseFloat(budgetAmount));
    setRemainingBudget(parseFloat(budgetAmount) - totalExpense);
    setShowBudgetPopup(false);
    setBudgetAmount("");
  };

  return (
    <>
      <div className="header">
        <header>
          <h3>Expense Tracker</h3>
        </header>
      </div>

      <div className="name">
        <h1>Hello, Vijay Mhaske</h1>
      </div>

      {/* Budget Summary */}
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

      {/* Categories + Add Buttons */}
      <div className="Categaries">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search" />
        </div>

        <button className="active">
          <i className="fas fa-list"></i> All Expenses
        </button>
        <button>
          <i className="fa-solid fa-pizza-slice"></i> Food Drinks
        </button>
        <button>
          <i className="fa-solid fa-bag-shopping"></i> Groceries
        </button>
        <button>
          <i className="fa-solid fa-suitcase-rolling"></i> Travel
        </button>
        <button>
          <i className="fas fa-heartbeat"></i> Health
        </button>

        <button className="add-budget" onClick={() => setShowBudgetPopup(true)}>
          <i className="fas fa-plus"></i> Add Budget
        </button>

        <button className="Add-Expenses" onClick={() => setShowExpensePopup(true)}>
          <i className="fas fa-plus"></i> Add Expenses
        </button>
      </div>

      {/* Add/Edit Expense Popup */}
      {showExpensePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-title">{isEditing ? "Edit Expense" : "Add New Expense"}</h3>
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
                <option value="Shopping" />
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
                <button type="submit">{isEditing ? "Update Expense" : "Add Expense"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Budget Popup */}
      {showBudgetPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
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

      {/* Delete Confirmation Popup */}
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
              <h3 className="popup-title" style={{ color: "#721c24", marginBottom: "10px" }}>
                Are you sure?
              </h3>
              <p>
                Do you really want to delete this expense:{" "}
                <strong>{expensesList[deleteIndex]?.name}</strong>?
              </p>
              <div
                className="buttons"
                style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}
              >
                <button
                  onClick={cancelDelete}
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            {expensesList.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No expenses added yet.
                </td>
              </tr>
            ) : (
              expensesList.map((exp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{exp.name}</td>
                  <td>${exp.amount}</td>
                  <td>
                    <button style={{ marginRight: "8px" }} onClick={() => handleEdit(index)}>
                      <i className="fa-solid fa-pencil"></i> Edit
                    </button>
                    <button onClick={() => handleDeleteClick(index)}>
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
