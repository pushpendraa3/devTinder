const express = require("express")
const requestRouter = express.Router()

const { userAuth } = require("../middlewares/userAuth");
const ConnectionModel = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    const fromUserId = req.user._id;

    const toUserId = req.params.toUserId
    const status = req.params.status

    const connectionRequest = new ConnectionModel({
        fromUserId,
        toUserId,
        status
    })

    const data = await connectionRequest.save() 

    res.json({
        message: "success",
        data,
    })


    console.log("sending connection request...")

    res.send(user.firstName + "sent the connection request")
})