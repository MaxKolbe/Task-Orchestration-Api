import express  from "express"
import todoRouter from "./modules/todo/todo.route.js"

const app = express() 

app.use(express.json()) //For parsing JSON bodies (application/json)
app.use(express.urlencoded({extended: true})) //For parsing URL-encoded form data (x-www-form-urlencoded)
app.use(express.static('public'))
app.set('views', 'views') 

app.use("/v1/todo", todoRouter)

export default app
 
