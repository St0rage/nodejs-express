import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

test("Test Response", async () => {
  // test send request and return response
  const response = await request(app).get("/");

  // test response validation
  expect(response.text).toBe("Hello Response");
});
