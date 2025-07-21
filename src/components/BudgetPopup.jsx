function BudgetPopup({ budgetAmount, onChange, onSubmit, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <i
          className="fa-solid fa-xmark close-icon"
          onClick={onClose}
        ></i>
        <h3 className="popup-title">Add Budget</h3>
        <hr className="popup-divider" />
        <form onSubmit={onSubmit}>
          <label>Amount *</label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={budgetAmount}
            onChange={onChange}
            required
          />
          <div className="buttons">
            <button type="submit">Add Budget</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BudgetPopup;
