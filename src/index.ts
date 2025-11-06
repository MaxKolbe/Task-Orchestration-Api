import express  from "express"
import dotenv from "dotenv"
import router from "./routes/routes.js"

dotenv.config()

const app = express() 
const port = process.env.PORT || 3000 

app.use(express.json()) //For parsing JSON bodies
app.use(express.urlencoded({extended: true})) //For parsing URL-encoded form data
app.use(express.static('public'))
app.set('views', 'views') 

app.use("/", router)

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})