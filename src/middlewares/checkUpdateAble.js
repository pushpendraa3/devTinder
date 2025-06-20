const checkUpdateAble = async (req, res, next) => {
    const allowedEdit = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"]
    const isEditAllowed = Object.keys(req.body).every(field => allowedEdit.includes(field))
    
    if(!isEditAllowed) res.send("cannot edit the field")
    
    next()
}
module.exports = checkUpdateAble