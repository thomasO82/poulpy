const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    discord_id: {
        type: String,
        required: [true, "discord id requis"],
    },
    discord_username: {
        type: String,
        required: [true, "nom requis"],
    },
    discord_globalName: {
        type: String,
        required: [true, "nom requis"],
    },
    disponibility: {
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "disponibilities"
        }]
    }
  
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel





