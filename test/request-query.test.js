import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

test("Test Query Parameter", async () => {
  // test send request and return response
  const response = await request(app)
    .get("/")
    .query({ firstName: "Dani", lastName: "Yudistira" });

  // test response validation
  expect(response.text).toBe("Hello Dani Yudistira");
});
