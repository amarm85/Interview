const invoiceRouter = require('express').Router(),
    mongoose = require('mongoose'),
    invoiceModel = require('../models/invoice');

// get all the invoices
invoiceRouter.get('/', function (req, res, next) {

    invoiceModel.find({}).exec(function (err, invoices) {

        if (err) return next(err);

        //if no cient found then return not found

        if (invoices) res.status(200).json(invoices);
        else next({ 'message': 'Something wrong happend' })


    });
});

invoiceRouter.get('/:id', function (req, res, next) {
    invoiceModel.findById(mongoose.Types.ObjectId(req.params.id))
        .exec(function (err, invoice) {

            if (err) return next(err);

            if (invoice) {
                res.status(200).json(invoice);

            } else {
                res.status(404).json({ "message": "No invoice found with id " + req.params.id });
            }
        });
});

invoiceRouter.post('/', function (req, res, next) {

    newinvoice = new invoiceModel(req.body);

    newinvoice.save(function (err) {
        if (err) return next(err);

        res.status(201).json(newinvoice);

    });
});


invoiceRouter.put('/:id', function (req, res, next) {

    invoiceModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
        { $set: req.body }, { new: true }, function (err, invoice) {
            if (err) return next(err);

            res.status(200).json(invoice);
        });
});

invoiceRouter.delete('/:id', function (req, res, next) {

    invoiceModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
        function (err, invoice) {
            if (err) return next(err);

            if (invoice) res.status(202).json(invoice);
            else res.status(404).json({ "message": "No invoice found with id " + req.params.id });

        });
});

module.exports = invoiceRouter;