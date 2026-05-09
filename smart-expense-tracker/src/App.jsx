import { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "./services/expenseService";

function App() {
  // =========================
  // STATE
  // =========================
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);

  // =========================
  // LOAD DATA (READ)
  // =========================
  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error loading expenses:", error);
      alert("Failed to load expenses. Check backend.");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // =========================
  // CREATE + UPDATE
  // =========================
  const handleAdd = async () => {
    if (!title || !amount) {
      alert("Fill all fields");
      return;
    }

    try {
      // UPDATE MODE
      if (editId) {
        await fetch(`http://localhost:3001/update/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            amount,
            category: "General",
          }),
        });

        setEditId(null);
      }

      // CREATE MODE
      else {
        await createExpense({
          title,
          amount,
          category: "General",
          date: new Date().toISOString().split("T")[0],
        });
      }

      // reset form
      setTitle("");
      setAmount("");

      // reload data
      loadExpenses();
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save expense. Try again.");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense.");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (expense) => {
    try {
      setTitle(expense.title);
      setAmount(expense.amount);
      setEditId(expense.id);
    } catch (error) {
      console.error("Error editing expense:", error);
      alert("Failed to edit expense.");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>💰 Expense Tracker</h1>

      {/* INPUT SECTION */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <button onClick={handleAdd} style={{ padding: "6px 12px" }}>
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </div>

      <hr />

      {/* LIST */}
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        expenses.map((e) => (
          <div
            key={e.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ddd",
              marginBottom: "8px",
              borderRadius: "8px",
            }}
          >
            {/* LEFT */}
            <div>
              <strong>{e.title}</strong> - ${e.amount}
            </div>

            {/* RIGHT */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleEdit(e)}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(e.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
