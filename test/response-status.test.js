import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  if (req.query.name) {
    res.status(200);
    res.send(`Hello ${req.query.name}`);
  } else {
    res.status(400).end();
  }
});

test("Test Response Status", async () => {
  // test send request and return response
  let response = await request(app).get("/").query({ name: "Dani" });

  // test response validation
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello Dani");

  // test send request and return response
  response = await request(app).get("/");

  // test response validation
  expect(response.status).toBe(400);
});
