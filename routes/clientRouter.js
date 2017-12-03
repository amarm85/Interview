const clientRouter = require('express').Router(),
    mongoose = require('mongoose'),
    clientModel = require('../models/client');

// get all the clients
clientRouter.get('/', function (req, res, next) {

    clientModel.find({}).exec(function (err, clients) {

        if (err) return next(err);

        //if no cient found then return not found

        if (clients) res.status(200).json(clients);
        else next({ 'message': 'Something wrong happend' })


    });
});

clientRouter.get('/:id', function (req, res, next) {
    clientModel.findById(mongoose.Types.ObjectId(req.params.id))
        .exec(function (err, client) {
           
            if (err) return next(err);

            if (client) {
                res.status(200).json(client);

            } else {
                res.status(404).json({ "message": "No client found with id " + req.params.id });
            }
        });
});

clientRouter.post('/', function (req, res, next) {

    newClient = new clientModel(req.body);

    newClient.save(function (err) {
        if (err) return next(err);

        res.status(201).json(newClient);

    });
});


clientRouter.put('/:id', function (req, res, next) {

    clientModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
        { $set: req.body }, { new: true }, function (err, client) {
            if(err) return next(err);

            res.status(200).json(client);
         });
});

clientRouter.delete('/:id', function (req, res, next) {

    clientModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    function(err,cleint){
        if(err) return next(err);

        if(cleint) res.status(202).json(cleint);
        else res.status(404).json({ "message": "No client found with id " + req.params.id });
        
    });
 });

module.exports = clientRouter;