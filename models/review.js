const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports =  mongoose.model("Review", reviewSchema)




// wen are goin to connect this to campground one to many