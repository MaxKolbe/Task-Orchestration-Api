import { Pool } from "pg"
import dotenv from "dotenv"
dotenv.config()

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER, 
    database: process.env.PG_DATABASE, 
    password: process.env.PG_PASSWORD, 
    port: Number(process.env.PG_PORT)  
})

pool.on("connect", () => {
    console.log("Connected to the database Pool successfully")
})

pool.on("error", () => {
    console.log("Error Connecting to the database Pool")
})

export default pool