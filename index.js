import express from "express";
const app = express();
import { config } from "dotenv";
config();

import { createOrder, retrieveOrder } from "./klarna.js";

console.log(process.env.PUBLIC_KEY);

const products = [
  { id: "1", name: "Chair", price: 57 },
  { id: "2", name: "Table", price: 12 },
  { id: "3", name: "House", price: 89 },
];

app.get("/", (req, res) => {
  res.send(
    products
      .map((product) => `<a href="/p/${product.id}">${product.name}</a>`)
      .join("")
  );
});

app.get("/p/:id", async (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  const data = await createOrder(product);
  res.send(data.html_snippet);
});

app.get("/confirmation", async (req, res) => {
  const data = await retrieveOrder(req.query.order_id);
  res.send(data.html_snippet);
});

app.listen(process.env.PORT || 3000);
