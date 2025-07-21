function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
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
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No expenses found for this category.
              </td>
            </tr>
          ) : (
            expenses.map((exp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exp.name}</td>
                <td>${exp.amount}</td>
                <td>
                  <button onClick={() => onEdit(index)}>
                    <i className="fa-solid fa-pencil" style={{ marginRight: "5px" }}></i>
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i className="fa-solid fa-trash" style={{ marginRight: "5px" }}></i>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
