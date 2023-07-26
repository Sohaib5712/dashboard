const mongoose = require("mongoose");
 
const Newsmodel = new mongoose.Schema({
	title:{type:String,required:true,trim:true},
    desc:{type:String,required:true},
    design:{type:String},
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, index: { expireAfterSeconds: 0 } }
});

module.exports = mongoose.model("news", Newsmodel);
