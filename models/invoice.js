// require mongoose module
const mongoose = require('mongoose');

// create schema for Invoice
var invoiceSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients'
    }
}, { timestamps: true });

// create model out of schema and export
module.exports = mongoose.model('Invoices', invoiceSchema);
//module.exports = invoiceSchema;
