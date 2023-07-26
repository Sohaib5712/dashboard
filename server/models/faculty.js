const mongoose = require("mongoose");
 
const TeacherFaculty = new mongoose.Schema({
	name:{type:String,required:true,trim:true},
    mobile:{type:String,required:true},
    qualification:{type:String,required:true},
    description:{type:String,required:true,trim:true},
    design:{type:String,required:true},
    image:{type:String,required:true},
	
});

module.exports = mongoose.model("Faculty", TeacherFaculty);
