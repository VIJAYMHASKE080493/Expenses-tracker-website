function CategoryFilter({
  selectedCategory,
  onCategoryClick,
  searchTerm,
  onSearchChange,
  onAddBudget,
  onAddExpense,
}) {
  return (
    <div className="Categaries">
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <button
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => onCategoryClick("All")}
      >
        <i className="fas fa-list"></i> All Expenses
      </button>
      <button
        className={selectedCategory === "Food Drinks" ? "active" : ""}
        onClick={() => onCategoryClick("Food Drinks")}
      >
        <i className="fa-solid fa-pizza-slice"></i> Food Drinks
      </button>
      <button
        className={selectedCategory === "Groceries" ? "active" : ""}
        onClick={() => onCategoryClick("Groceries")}
      >
        <i className="fa-solid fa-bag-shopping"></i> Groceries
      </button>
      <button
        className={selectedCategory === "Travel" ? "active" : ""}
        onClick={() => onCategoryClick("Travel")}
      >
        <i className="fa-solid fa-suitcase-rolling"></i> Travel
      </button>
      <button
        className={selectedCategory === "Health" ? "active" : ""}
        onClick={() => onCategoryClick("Health")}
      >
        <i className="fas fa-heartbeat"></i> Health
      </button>

      <button className="add-budget" onClick={onAddBudget}>
        <i className="fas fa-plus"></i> Add Budget
      </button>

      <button className="Add-Expenses" onClick={onAddExpense}>
        <i className="fas fa-plus"></i> Add Expenses
      </button>
    </div>
  );
}

export default CategoryFilter;
