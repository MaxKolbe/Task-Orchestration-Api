import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv"
dotenv.config()

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    host: "localhost", 
    database: "testdb",
    password: "12345678", 
    user: "postgres",
    port: 5432,
    ssl: false
  },
})
