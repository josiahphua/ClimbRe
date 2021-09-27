const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    id: String,
    colour: String,
    difficulty: Number,
    description: String
});

module.exports = mongoose.model("Route", routeSchema);