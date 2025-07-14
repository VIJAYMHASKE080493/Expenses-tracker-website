import { useState } from "react";
import "./App.css";

function App() {
  // Expense form state
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [expense, setExpense] = useState({
    name: "",
    date: "",
    category: "",
    amount: "",
  });

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Added:", expense);
    setShowExpensePopup(false);
    setExpense({
      name: "",
      date: "",
      category: "",
      amount: "",
    });
  };

  // Budget popup state
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

        {/* Add Budget */}
        <button className="add-budget" onClick={() => setShowBudgetPopup(true)}>
          <i className="fas fa-plus"></i> Add Budget
        </button>

        {/* Add Expenses */}
        <button className="Add-Expenses" onClick={() => setShowExpensePopup(true)}>
          <i className="fas fa-plus"></i> Add Expenses
        </button>
      </div>

      {/* Add Expense Popup */}
      {showExpensePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-title">Add New Expense</h3>
            <hr className="popup-divider" />
            <form onSubmit={handleExpenseSubmit}>
              <label htmlFor="expenseName" style={{ marginBottom: "-5px", display: "block" }}>
                Expense Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="expenseName"
                name="name"
                placeholder="Expense Name"
                value={expense.name}
                onChange={handleExpenseChange}
                required
              />

              <label htmlFor="expenseDate" style={{ marginBottom: "-5px", display: "block" }}>
                Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                id="expenseDate"
                name="date"
                value={expense.date}
                onChange={handleExpenseChange}
                required
              />

              <label htmlFor="expenseCategory" style={{ marginBottom: "-5px", display: "block" }}>
                Category <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="expenseCategory"
                name="category"
                placeholder="Category"
                value={expense.category}
                onChange={handleExpenseChange}
                required
              />

              <label htmlFor="expenseAmount" style={{ marginBottom: "-5px", display: "block" }}>
                Amount <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="expenseAmount"
                name="amount"
                placeholder="Amount"
                value={expense.amount}
                onChange={handleExpenseChange}
                required
              />

              <div className="buttons">
                <button type="submit">Add Expense</button>
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
              <label htmlFor="budgetAmount" style={{ marginBottom: "-5px", display: "block" }}>
                Amount <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="budgetAmount"
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
    </>
  );
}

export default App;
