import cookieParser from "cookie-parser";
import express from "express";
import request from "supertest";

const app = express();
app.use(cookieParser());
app.use(express.json());

// mengambil cookie dari client
app.get("/", (req, res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

// membuat cookie dari server ke client
app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set("Cookie", "name=Dani;author=Dani Yudistira Maulana");
  expect(response.text).toBe("Hello Dani");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Dani" });

  expect(response.get("Set-Cookie").toString()).toBe("Login=Dani; Path=/");
  expect(response.text).toBe("Hello Dani");
});
