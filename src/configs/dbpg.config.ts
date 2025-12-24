import { Pool } from "pg"

const pool = new Pool({
    host: "localhost",
    user: "postgres", 
    database: "testdb", 
    password: "12345678", 
    port: 5432
})

pool.on("connect", () => {
    console.log("Connected to the database Pool successfully")
})

pool.on("error", () => {
    console.log("Error Connecting to the database Pool")
})

export default pool