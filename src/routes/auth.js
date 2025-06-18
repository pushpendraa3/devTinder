const express = require("express")
const {UserModel} = require("../models/UserModel")
const bcrypt = require("bcrypt")

const authRouter = express.Router()

authRouter.get("/", async (req, res) => {
    try {
        const allUserModel = await UserModel.find({})
        res.send(allUserModel)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

authRouter.post("/signup", async (req, res) => {
    try {
        const isEmailExists = await UserModel.findOne({emailId: req.body.emailId})

        if (isEmailExists) return res.send("user already exists")
        const {password, ...others} = req.body
        const hash = await bcrypt.hash(password, 10)
        others.password = hash

        const User = new UserModel(others)
        await User.save()
        res.send("User added successfully")
    }
    catch (err) {
        res.status(401).send("error adding User")
    }
})

authRouter.post("/login", async (req, res) => {
    try{
        const user = await UserModel.findOne({emailId: req.body.emailId})
        if(!user) throw new Error("Invalid credentials")

        const isPasswordValid = await user.validatePassword(req.body.password)

        if(!isPasswordValid) return res.send("invalid password")

            const token = await user.getJWT()
            // send jwt in cookie as res
            res.cookie("token", token, { expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)), httpOnly: true })
            res.send("login success")
        
    }
    catch(err){
        res.status(401).send("ERROR: " + err.message)
    }
})

module.exports = authRouter