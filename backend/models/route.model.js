const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    id: String,
    colour: String,
    difficulty: Number,
    description: {
        required: false,
        type: String,
    },
    zoneLocation: [{
        type: Schema.Types.ObjectId,
        ref: "Gym"
    }]
});

module.exports = mongoose.model("Route", routeSchema);