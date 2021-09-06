const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gymSchema = new Schema({
    id: String,
    name: String,
    grading: String,
    zones: {
        type: String,
        enum: ["Lead", "Boulder", "Top-Rope"]
    },
    routes:[{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }],
    location : String
    
});

module.exports = mongoose.model("Gym", gymSchema);