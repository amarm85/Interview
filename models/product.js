// require mongoose module
const mongoose = require('mongoose');

// create schema for product
var productSchema = new mongoose.Schema({
    
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }, { timestamps: true });
    
    // create model out of schema and export
    module.exports = mongoose.model('Products', productSchema);
    