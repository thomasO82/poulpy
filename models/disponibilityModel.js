const mongoose = require("mongoose");

const dispoSchema = new mongoose.Schema({

    day: {
        type: Number,
        required: true,
        
    },
    startHour: {
        type: String,
        required: true
    },
    endHour: {
        type: String,
        required: true
    }

})

const dispoModel = mongoose.model("disponibilities", dispoSchema)
module.exports = dispoModel





