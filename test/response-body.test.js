import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(`<html><body>Hello World</body></html>`);
});

test("Test Response Body", async () => {
  // test send request and return response
  const response = await request(app).get("/");

  // test response validation
  expect(response.get("Content-Type", "text/html"));
  expect(response.text).toBe("<html><body>Hello World</body></html>");
});
