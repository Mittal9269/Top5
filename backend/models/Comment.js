const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const crypto = require("crypto");

const CommentSchema = new mongoose.Schema({
    BookId:{
        type: String,
        trim:true,
        required:true
     },  
     UserId:{
        type: ObjectId, 
        ref: "user"

      },
     Rating:{
        type: Number,
        min : 1,
        max : 5,
        required : true
     },
     Review:{
         type: String,
         trim:true,
         required:true
     },
});


const comment = mongoose.model("comment",CommentSchema);
module.exports = comment;