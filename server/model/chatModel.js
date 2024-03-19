const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    message : {
        text : {
            type: String,
            required: true
        },
    },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
    },

    {
        timestamps: true
    }
)

const chat = mongoose.model("chatSchema",chatSchema);

module.exports = chat