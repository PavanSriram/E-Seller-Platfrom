const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    _id : {
        type : String,
    },
    cart : {
        type : Array,
        required: true,
    },
});

module.exports = cartSchema;