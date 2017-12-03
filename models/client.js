// require mongoose module
const mongoose = require('mongoose');
//invoiceSchema = require('./invoice').invoiceSchema;

// create schema for invoice

var clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    rfc: {
        type: String
    }
   // invoices:[invoiceSchema]

}, { timestamps: true });

// create model out of schema and export
module.exports = mongoose.model('Clients', clientSchema);
