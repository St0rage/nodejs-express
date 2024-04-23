import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
  console.info(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set("X-Powered-By", "Warung Rahmat Gas");
  next();
};

const apiKey = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();

app.use(logger);
app.use(apiKey);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

app.get("/dani", (req, res) => {
  res.send(`Hello Dani`);
});

app.get("/time", (req, res) => {
  res.send(`Hello, today is ${req.requestTime}`);
});

test("Test Response Middleware", async () => {
  // test send request and return response
  const response = await request(app).get("/").query({ apiKey: "123" });

  // test response validation
  expect(response.get("X-Powered-By")).toBe("Warung Rahmat Gas");
  expect(response.text).toBe("Hello Response");
});

test("Test Response Middleware 2", async () => {
  // test send request and return response
  const response = await request(app).get("/dani").query({ apiKey: "123" });

  // test response validation
  expect(response.get("X-Powered-By")).toBe("Warung Rahmat Gas");
  expect(response.text).toBe("Hello Dani");
});

test("Test Response Middleware Unauthorized", async () => {
  // test send request and return response
  const response = await request(app).get("/dani");
  // test response validation
  expect(response.status).toBe(401);
});

test("Test Response Middleware Time", async () => {
  // test send request and return response
  const response = await request(app).get("/time").query({ apiKey: "123" });

  // test response validation
  expect(response.get("X-Powered-By")).toBe("Warung Rahmat Gas");
  expect(response.text).toContain("Hello, today is");
});
