// require mongoose module
const mongoose = require('mongoose');

// create schema for Invoice to product relationship
var invoiceProductSchema = new mongoose.Schema({

    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    invoiceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoices'
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }
}, { timestamps: true });

invoiceProductSchema.index({invoiceID:1,productID:1},{unique:true});
// create model out of schema and export
module.exports = mongoose.model('InvoiceProducts', invoiceProductSchema);
