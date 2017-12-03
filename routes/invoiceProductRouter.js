const invoiceProductRouter = require('express').Router(),
mongoose = require('mongoose'),
invoiceProductModel = require('../models/invoiceProduct');

// get all the invoiceProducts
invoiceProductRouter.get('/', function (req, res, next) {

invoiceProductModel.find({}).exec(function (err, invoiceProducts) {

    if (err) return next(err);

    //if no cient found then return not found

    if (invoiceProducts) res.status(200).json(invoiceProducts);
    else next({ 'message': 'Something wrong happend' })


});
});

invoiceProductRouter.get('/:id', function (req, res, next) {
invoiceProductModel.findById(mongoose.Types.ObjectId(req.params.id))
    .exec(function (err, invoiceProduct) {

        if (err) return next(err);

        if (invoiceProduct) {
            res.status(200).json(invoice);

        } else {
            res.status(404).json({ "message": "No invoiceProduct found with id " + req.params.id });
        }
    });
});

invoiceProductRouter.post('/', function (req, res, next) {

newinvoice = new invoiceProductModel(req.body);

newinvoice.save(function (err) {
    if (err) return next(err);

    res.status(201).json(newinvoice);

});
});


invoiceProductRouter.put('/:id', function (req, res, next) {

invoiceProductModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    { $set: req.body }, { new: true }, function (err, invoiceProduct) {
        if (err) return next(err);

        res.status(200).json(invoiceProduct);
    });
});

invoiceProductRouter.delete('/:id', function (req, res, next) {

invoiceProductModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    function (err, invoiceProduct) {
        if (err) return next(err);

        if (invoiceProduct) res.status(202).json(invoiceProduct);
        else res.status(404).json({ "message": "No invoice found with id " + req.params.id });

    });
});

module.exports = invoiceProductRouter;