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
      console.log("Successfully connected to the database.");
    })
    .catch((error: any) => {
      console.error("Unable to connect to the database:", error);
    });
}
