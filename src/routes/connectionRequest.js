const express = require("express")
const requestRouter = express.Router()

const  userAuth  = require("../middlewares/userAuth");
const ConnectionModel = require("../models/connectionRequest");

// requestRouter.get("/", async (req, res) => { res.json({ msg: "routes/connectionRequest:7 success" }) })

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
    const fromUserId = req.userData._id;

    const toUserId = req.params.toUserId
    const status = req.params.status

    console.log( "routes/connectionRequest:15 ", fromUserId, toUserId, status)

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
})

module.exports = requestRouter