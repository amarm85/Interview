var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// create schema 
var userSchema = new mongoose.Schema({
    
        name: {
            type: String,
            required: true
        }
    }, { timestamps: true });
    
    userSchema.plugin(passportLocalMongoose);

    // create model out of schema and export
    module.exports = mongoose.model('Users', userSchema);
    
