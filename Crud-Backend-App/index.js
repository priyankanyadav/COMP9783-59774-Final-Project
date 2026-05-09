import express from "express";
import cors from "cors";
import "dotenv/config";

import { createItem, readItems, updateItem, deleteItem } from "./lib/Crud.js";

const app = express();

const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// CREATE
app.post("/create", (req, res) => {
  res.send(createItem(req.body));
});

// READ ALL
app.get("/read", (req, res) => {
  res.send(readItems());
});

// READ ONE
app.get("/read/:id", (req, res) => {
  res.send(readItems(req.params.id));
});

// UPDATE
app.put("/update/:id", (req, res) => {
  res.send(updateItem(req.params.id, req.body));
});

// DELETE
app.delete("/delete/:id", (req, res) => {
  res.send(deleteItem(req.params.id));
});

// fallback
app.use((req, res) => {
  res.status(404).send({
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
