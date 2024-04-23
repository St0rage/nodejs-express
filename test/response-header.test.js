import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "DMD",
    "X-Author": "Dani",
  });

  res.send(`Hello Response`);
});

test("Test Response Header", async () => {
  // test send request and return response
  const response = await request(app).get("/");

  // test response validation
  expect(response.text).toBe("Hello Response");
  expect(response.get("X-Powered-By")).toBe("DMD");
  expect(response.get("X-Author")).toBe("Dani");
});
