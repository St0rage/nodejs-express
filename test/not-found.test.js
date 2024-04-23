import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

test("Test Response", async () => {
  // test send request and return response
  const response = await request(app).get("/");

  // test response validation
  expect(response.text).toBe("Hello Response");
});

test("Test Response Not Found", async () => {
  const response = await request(app).get("/halaman-tidak-ada");

  expect(response.status).toBe(404);
  expect(response.text).toBe("404 Not Found");
});
