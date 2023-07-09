/* This code is connecting to a MongoDB database using the Mongoose library in Node.js. It first
imports the Mongoose library using `require('mongoose')`, then connects to the database at
`mongodb://127.0.0.1:27017/skils-admin` using the `connect()` method. The options `useNewUrlParser`
and `useUnifiedTopology` are passed as options to the `connect()` method. If the connection is
successful, it logs "Connectednn" to the console. If there is an error, it logs the error to the
console. */
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/skils-admin",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then( () =>{
    console.log("Connectednn");
}).catch( (err) =>{
    console.log(err)
})