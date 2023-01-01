import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Author } from "./../entities/Author";
import { Book } from "./../entities/Book";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "user",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "bookie",
  migrations: ["src/database/migrations/*.{js,ts}"],
  logging: process.env.ORM_LOGGING === "true",
  entities: [Author, Book],
  synchronize: false,
  subscribers: [],
});