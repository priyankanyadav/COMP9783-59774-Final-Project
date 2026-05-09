import { generateUUID } from "./UUIDUtilsES6.js";

// in-memory database
let items = [];

// CREATE
function createItem(item) {
  item.id = generateUUID(4);
  items.push(item);
  return item;
}

// READ
function readItems(id = "") {
  if (!id) return items;

  const result = items.filter((i) => i.id === id);
  return result.length === 1 ? result[0] : {};
}

// UPDATE
function updateItem(id, data) {
  let item = items.find((i) => i.id === id);

  if (item) {
    Object.keys(data).forEach((key) => {
      item[key] = data[key];
    });
    return item;
  }

  return createItem(data);
}

// DELETE
function deleteItem(id) {
  items = items.filter((i) => i.id !== id);
  return {};
}

export { createItem, readItems, updateItem, deleteItem };
