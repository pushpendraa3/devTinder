requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    const fromUserId = req.userData._id;

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
})