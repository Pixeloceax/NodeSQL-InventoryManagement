import { sequelize } from "./db";

export default async function listTables() {
  try {
    const queryResult = await sequelize.query("SHOW TABLES;");
    const tables = queryResult[0].map(
      (row: any) => row[`Tables_in_${sequelize.config.database}`]
    );
    console.log("Liste des tables crées :");
    tables.forEach((tableName) => {
      console.log(tableName);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des tables :", error);
  }
}
