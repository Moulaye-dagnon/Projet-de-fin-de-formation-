const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authentification = async (req,res,next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            res.status(500).json("Veuillez vous authentifier!!1")
        }else{
            const decode = jwt.verify(token,process.env.PASSWORD_SECRET_TOKEN)
            const user = await User.findOne({email: decode.email})
            if(user){
                req.user = user
                next()
            }else{
                res.status(400).json("Vous n'etes pas autorisé!");
            }
        }
    }else{
        res.status(500).json("Veuillez vous authentifier!!2")
    }
}

module.exports = authentification