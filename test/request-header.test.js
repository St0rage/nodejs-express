import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  const type = req.get("accept");
  res.send(`Hello ${type}`);
});

test("Test Request Header", async () => {
  // test send request and return response
  const response = await request(app).get("/").set("Accept", "text/plain");

  // test response validation
  expect(response.text).toBe("Hello text/plain");
});
