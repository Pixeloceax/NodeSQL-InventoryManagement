import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("inventory_db", "axel", "axel", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export async function dbConnect() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connexion à la base de données réussie.");
    })
    .catch((error: any) => {
      console.error("Impossible de se connecter à la base de données :", error);
    });
}
