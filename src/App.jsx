import { useEffect, useState } from "react";
import Header from "./components/Header";
import BudgetSummary from "./components/BudgetSummary";
import CategoryFilter from "./components/CategoryFilter";
import ExpenseCharts from "./components/ExpenseChart";
import ExpenseTable from "./components/ExpenseTable";
import ExpensePopup from "./components/ExpensePopup";
import BudgetPopup from "./components/BudgetPopup";
import DeleteConfirm from "./components/DeleteConfirm";
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

  const handleExpenseChange = (e) =>
    setExpense({ ...expense, [e.target.name]: e.target.value });

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    let updatedList = [...expensesList];
    if (isEditing) {
      updatedList[editIndex] = expense;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedList.push(expense);
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

  const handleBudgetChange = (e) => setBudgetAmount(e.target.value);

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

  const handleCategoryClick = (category) => setSelectedCategory(category);

  const filteredExpenses = expensesList.filter((exp) => {
    const matchesCategory =
      selectedCategory === "All" || exp.category === selectedCategory;
    const matchesSearch =
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const chartData = filteredExpenses.reduce((acc, curr) => {
    const found = acc.find((item) => item.name === curr.category);
    if (found) {
      found.value += parseFloat(curr.amount);
    } else {
      acc.push({ name: curr.category, value: parseFloat(curr.amount) });
    }
    return acc;
  }, []);

  return (
    <>
      <Header />
      <div className="name">
        <h1>Hello, Vijay Mhaske</h1>
      </div>
      <BudgetSummary
        totalBudget={totalBudget}
        totalExpense={totalExpense}
        remainingBudget={remainingBudget}
      />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddBudget={() => setShowBudgetPopup(true)}
        onAddExpense={() => setShowExpensePopup(true)}
      />
      {chartData.length > 0 && <ExpenseCharts chartData={chartData} />}
      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      {showExpensePopup && (
        <ExpensePopup
          expense={expense}
          onChange={handleExpenseChange}
          onSubmit={handleExpenseSubmit}
          onClose={() => setShowExpensePopup(false)}
          isEditing={isEditing}
        />
      )}
      {showBudgetPopup && (
        <BudgetPopup
          budget={{ amount: budgetAmount }}
          onChange={handleBudgetChange}
          onSubmit={handleBudgetSubmit}
          onClose={() => setShowBudgetPopup(false)}
        />
      )}
      {showDeleteConfirm && (
        <DeleteConfirm
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          itemName={expensesList[deleteIndex]?.name}
        />
      )}
    </>
  );
}

export default App;
