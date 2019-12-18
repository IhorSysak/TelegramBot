
// access to mongo schemes
const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        unique: false,
    }
}));

// validation function 
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        date: Joi.date().required().date()
    };
    return Joi.validate(user, schema);
}
 
// export function and user-model 
exports.User = User;
exports.validate = validateUser;