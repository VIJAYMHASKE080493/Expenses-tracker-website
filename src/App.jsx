import { useState } from "react";
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

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedList = [...expensesList];
      updatedList[editIndex] = expense;
      setExpensesList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setExpensesList([...expensesList, expense]);
    }

    setShowExpensePopup(false);
    setExpense({
      name: "",
      date: "",
      category: "",
      amount: "",
    });
  };

  const handleEdit = (index) => {
    const selected = expensesList[index];
    setExpense(selected);
    setEditIndex(index);
    setIsEditing(true);
    setShowExpensePopup(true);
  };

  const handleDelete = (index) => {
    const updated = expensesList.filter((_, i) => i !== index);
    setExpensesList(updated);
  };

  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");

  const handleBudgetChange = (e) => {
    setBudgetAmount(e.target.value);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    console.log("Budget Added:", budgetAmount);
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

      <div className="ExpensesName">
        <div className="T-Budge">
          <p>Total Budget</p>
          <h2>$20,000</h2>
        </div>
        <div className="T-Expense">
          <p>Total Expense</p>
          <h2>$12,205</h2>
        </div>
        <div className="Remaninig-B">
          <p>Remaining Budget</p>
          <h2>$7,795</h2>
        </div>
      </div>

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
                value={expense.category}
                onChange={handleExpenseChange}
                required
              />

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
                    <button
                      style={{ marginRight: "8px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
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