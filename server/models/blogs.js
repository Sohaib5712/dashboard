const mongoose = require("mongoose");
 
const Userblogs = new mongoose.Schema({
	title:{type:String,required:true,trim:true},
    smallDesc:{type:String,required:true},
    fullDesc:{type:String,required:true},
    writerName:{type:String,required:true,trim:true},
    design:{type:String,required:true},
    image:{type:String,required:true},
    createdAt: { type: Date, default: Date.now },

	
});

module.exports = mongoose.model("Blog", Userblogs);
