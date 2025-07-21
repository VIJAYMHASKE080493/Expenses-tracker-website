function ExpensePopup({ expense, onChange, onSubmit, onClose, isEditing }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
        <h3 className="popup-title">
          {isEditing ? "Edit Expense" : "Add New Expense"}
        </h3>
        <hr className="popup-divider" />
        <form onSubmit={onSubmit}>
          <label>Expense Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Expense Name"
            value={expense.name}
            onChange={onChange}
            required
          />
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={onChange}
            required
          />
          <label>Category *</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            list="category-options"
            value={expense.category}
            onChange={onChange}
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
            onChange={onChange}
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
  );
}

export default ExpensePopup;
