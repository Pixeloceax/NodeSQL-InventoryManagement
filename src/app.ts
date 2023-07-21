import express, { Request, Response } from "express";
import { dbConnect } from "./database/db";
import listTables from "./database/tableManager";
import Products from "./routes/products.route";
import login from "./routes/login.route";
import register from "./routes/register.route";
import { authenticateToken } from "./middleware/auth";
import { getUserInfo } from "./controllers/userController";

dbConnect();
listTables();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("it's alive 🧟‍♂️");
});

app.get("/products", Products);
app.post("/products", Products);

app.post("/register", register);
app.post("/login", login);

app.get("/user", authenticateToken, getUserInfo);

app.post;

module.exports = app;
