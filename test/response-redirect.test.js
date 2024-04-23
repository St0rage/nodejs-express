import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.redirect("/to-next-page");
});

test("Test Response Redirect", async () => {
  // test send request and return response
  const response = await request(app).get("/");

  // test response validation
  expect(response.status).toBe(302);
  expect(response.get("location")).toBe("/to-next-page");
});
