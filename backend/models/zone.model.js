const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zoneSchema = new Schema({
    id: String,
    desc: {type: String, required: true},
    routes: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }]
});

module.exports = mongoose.model("Zone", zoneSchema);