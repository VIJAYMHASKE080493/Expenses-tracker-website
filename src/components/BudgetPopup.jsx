function BudgetPopup({ budgetAmount, onChange, onSubmit, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="icon-cotainer">
          <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
        </div>
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
