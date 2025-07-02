const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: "{VALUE} is incorrect status type"
        },
        required: true
    }
},
{ timestamps: true, })

const ConnectionModel = mongoose.model("connectionrequest", connectionSchema)
module.exports = ConnectionModel