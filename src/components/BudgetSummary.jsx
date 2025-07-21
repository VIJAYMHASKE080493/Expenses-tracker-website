function BudgetSummary({ totalBudget, totalExpense, remainingBudget }) {
  return (
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
  );
}

export default BudgetSummary;
