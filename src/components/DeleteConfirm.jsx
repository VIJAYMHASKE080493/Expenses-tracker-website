function DeleteConfirm({ onCancel, onConfirm, itemName = "this item" }) {
  return (
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
          <h3 className="popup-title" style={{ color: "#721c24" }}>
            Are you sure?
          </h3>
          <p>
            Do you really want to delete this item:{" "}
            <strong>{itemName}</strong>?
          </p>
          <div
            className="buttons"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <button onClick={onCancel}>Cancel</button>
            <button
              onClick={onConfirm}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
