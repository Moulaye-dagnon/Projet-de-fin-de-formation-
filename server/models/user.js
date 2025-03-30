const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    nom: {
        type: String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "collaborateur",
        require: true
    },
    projets: [{
        projet: {
            type: String
        }
    }],
    authTokens: [
        {
            authToken: {
                type: String
            }
        }
    ]
})

const User = mongoose.model("User", userSchema)
module.exports = User