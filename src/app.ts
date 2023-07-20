const express = require("express");
import { dbConnect, sequelize } from "./database/db";
import Products from "./routes/products.route";

dbConnect();

const app = express();
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("La table 'products' a été créée avec succès.");
  })
  .catch((error) => {
    console.error("Erreur lors de la création de la table 'products' :", error);
  });

app.get("/", (req: any, res: any) => {
  res.send("it's alive 🧟‍♂️");
});

app.get("/products", Products);
app.post("/products", Products);

module.exports = app;
