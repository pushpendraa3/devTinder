const express = require("express")
const connectDB = require("./src/config/database")
const cookieParser = require("cookie-parser")
const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const requestRouter = require("./src/routes/connectionRequest") 

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/request", requestRouter)

connectDB()
    .then(() => {
        console.log("DB Connected!")
        app.listen(7000, () => console.log("yayy!! Server started at port 7000"))
    })
    .catch((err) => {
        console.error("DB Connection Failed!! ", err.message)
    })