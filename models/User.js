const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //* as same as Line 2

const userSchema = new Schema({

    googleId: String,
    facebookId: String
});

mongoose.model('users', userSchema);