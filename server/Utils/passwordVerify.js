const bcrypt = require("bcryptjs")

const passwordHash = async (password)=>{
    const hashedPassword = await bcrypt.hash(password,8).then(hashed=>{
        return hashed
    })
    return hashedPassword
}

const passwordVerify = (password, password_check)=>{

}

module.exports = passwordHash