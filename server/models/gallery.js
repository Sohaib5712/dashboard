const mongoose = require("mongoose");
 
const GallerySchema = new mongoose.Schema({
    image: { type: String},
    title: {type:String}
});

module.exports = mongoose.model("Gallery", GallerySchema);
