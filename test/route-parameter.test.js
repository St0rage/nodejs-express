import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product: ${idProduct}`);
});

app.get("/categories/:id(\\d+)", (req, res) => {
  const idCategory = req.params.id;
  res.send(`Category: ${idCategory}`);
});

app.get("/seller/:idSeller/products/:idProduct", (req, res) => {
  const idSeller = req.params.idSeller;
  const idProduct = req.params.idProduct;
  res.send(`Seller: ${idSeller} Product: ${idProduct}`);
});

test("Test Route Parameter", async () => {
  let response = await request(app).get("/products/dani");
  expect(response.text).toBe("Product: dani");

  response = await request(app).get("/products/salah");
  expect(response.text).toBe("Product: salah");

  response = await request(app).get("/categories/1234");
  expect(response.text).toBe("Category: 1234");

  response = await request(app).get("/categories/salah");
  expect(response.status).toBe(404);
});
