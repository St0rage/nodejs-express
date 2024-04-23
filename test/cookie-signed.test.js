import cookieParser from "cookie-parser";
import express from "express";
import request from "supertest";

const app = express();
app.use(cookieParser("CONTOHRAHASIA"));
app.use(express.json());

// mengambil cookie dari client
app.get("/", (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

// membuat cookie dari server ke client
app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set(
      "Cookie",
      "Login=s%3ADani.3tz7OUyhWBqh4P5DoZAChOcQbYyNuqdmKQdKEDXyhtc; Path=/"
    );
  expect(response.text).toBe("Hello Dani");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Dani" });
  console.info(response.get("Set-Cookie").toString());
  expect(response.get("Set-Cookie").toString()).toContain("Dani");
  expect(response.text).toBe("Hello Dani");
});
