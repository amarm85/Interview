const productRouter = require('express').Router(),
mongoose = require('mongoose'),
productModel = require('../models/product');

// get all the products
productRouter.get('/', function (req, res, next) {

productModel.find({}).exec(function (err, products) {

    if (err) return next(err);

    //if no cient found then return not found

    if (products) res.status(200).json(products);
    else next({ 'message': 'Something wrong happend' })


});
});

productRouter.get('/:id', function (req, res, next) {
productModel.findById(mongoose.Types.ObjectId(req.params.id))
    .exec(function (err, product) {
       
        if (err) return next(err);

        if (product) {
            res.status(200).json(product);

        } else {
            res.status(404).json({ "message": "No product found with id " + req.params.id });
        }
    });
});

productRouter.post('/', function (req, res, next) {

newproduct = new productModel(req.body);

newproduct.save(function (err) {
    if (err) return next(err);

    res.status(201).json(newproduct);

});
});


productRouter.put('/:id', function (req, res, next) {

productModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    { $set: req.body }, { new: true }, function (err, product) {
        if(err) return next(err);

        res.status(200).json(product);
     });
});

productRouter.delete('/:id', function (req, res, next) {

productModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
function(err,product){
    if(err) return next(err);

    if(product) res.status(202).json(product);
    else res.status(404).json({ "message": "No product found with id " + req.params.id });
    
});
});

module.exports = productRouter;