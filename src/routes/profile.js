const express = require("express")
const profileRouter = express.Router()
const userAuth = require("../middlewares/userAuth")

profileRouter.get("/user", userAuth, async (req, res) => {
    try {
        const userData = req.userData

        if(!userData) throw new Error("user does not exists")
        res.send({msg: "user data", data: userData})

    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

module.exports = profileRouter