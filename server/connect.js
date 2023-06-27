const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/skils-admin",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then( () =>{
    console.log("Connectednn");
}).catch( (err) =>{
    console.log(err)
})