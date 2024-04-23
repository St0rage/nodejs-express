import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
  res.send(req.originalUrl);
});

app.get("/categories/*(\\d).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Test Route Path", async () => {
  // test send request and return response
  let response = await request(app).get("/products/dani.json");

  // test response validation
  expect(response.text).toBe("/products/dani.json");

  // test send request and return response
  response = await request(app).get("/products/salah.json");

  // test response validation
  expect(response.text).toBe("/products/salah.json");

  // test send request and return response
  response = await request(app).get("/categories/1234.json");

  // test response validation
  expect(response.text).toBe("/categories/1234.json");

  // test send request and return response
  response = await request(app).get("/categories/salah.json");

  // test response validation
  expect(response.status).toBe(404);
});
