const jwt = require("jsonwebtoken")
// var {UserModel} = require("./src/models/UserModel.js")
const { UserModel } = require("../models/UserModel");

const userAuth = async (req, res, next) => {
    console.log("userAuth")
  try {
      const { token } = req.cookies
    if (!token) throw new Error("invalid token")

    const decodedMsg = await jwt.verify(token, "jwt-secret-key-for-server-from-.env")

    console.log(decodedMsg)
    const userData = await UserModel.findById(decodedMsg._id)

    if (!userData) throw new Error("user does not exists")
        
    req.userData = userData
    next()  

  } catch (error) {
    res.status(404).send("ERROR: ", error)
  }
}
module.exports = userAuth