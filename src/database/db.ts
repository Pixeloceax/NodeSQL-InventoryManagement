import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASSWORD as string,
  {
    host: DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

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
