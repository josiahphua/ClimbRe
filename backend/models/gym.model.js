const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gymSchema = new Schema({
    id: Number,
    name: String,
    grading: String,
    location : String,
    zones:[{
        type: Schema.Types.ObjectId,
        ref: "Zone"
    }],
});

module.exports = mongoose.model("Gym", gymSchema);