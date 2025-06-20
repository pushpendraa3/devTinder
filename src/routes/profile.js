const express = require("express")
const userAuth = require("../middlewares/userAuth")
const checkUpdateAble = require("../middlewares/checkUpdateAble")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt")

const profileRouter = express.Router()

profileRouter.get("/user", userAuth, async (req, res) => {
    try {
        const userData = req.userData

        if(!userData) throw new Error("user does not exists")
        res.send({msg: "user data", data: userData})

    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

profileRouter.patch("/profile/edit", userAuth, checkUpdateAble, async (req, res) => {
    try {
        const loggedInUser = req.userData
        
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
        await loggedInUser.save()
        res.send("user updated")

    } catch (error) {
        res.status(500).send("ERROR: ", error)
    }
})
profileRouter.patch("/forgotpassword", async  (req, res) => {
    // const userData = await UserModel.findOne({emailId: req.body.emailId})

    let {password} = req.body
        const hash = await bcrypt.hash(password, 10)
        password = hash

    const userData = await UserModel.findOneAndUpdate({emailId: req.body.emailId}, {password: password}, {runValidators: true, context: 'query'})
    console.log(userData)

    if(!userData) res.send("email does not exists")

        // let {password} = req.body
        // const hash = await bcrypt.hash(password, 10)
        // password = hash
        // userData.password = password
        // await userData.save()

        res.send("password update success")
})

module.exports = profileRouter
