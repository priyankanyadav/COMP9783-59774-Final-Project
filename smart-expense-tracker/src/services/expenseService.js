const URL = "http://localhost:3001";

// READ ALL
export async function getExpenses() {
  const res = await fetch(`${URL}/read`);
  return res.json();
}

// CREATE
export async function createExpense(data) {
  const res = await fetch(`${URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// UPDATE
export async function updateExpense(id, data) {
  const res = await fetch(`${URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// DELETE
export async function deleteExpense(id) {
  await fetch(`${URL}/delete/${id}`, {
    method: "DELETE",
  });
}
