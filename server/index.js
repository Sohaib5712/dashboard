/* This is a Node.js server code using the Express framework. It creates an instance of the Express
application, sets up middleware, defines routes using the adminRoutes and mailRoutes modules, and
starts the server listening on port 4000. The `cors` middleware is used to enable Cross-Origin
Resource Sharing. The `express.json()` middleware is used to parse incoming JSON requests. */
const express = require('express');
require('./connect')
const app = express();
const port = 4000;
const cors = require("cors")
const adminRoutes = require('./routes/adminRoutes')
const mailRoutes = require('./routes/mailRoutes')




// middle ware

app.use(express.json())

app.use(cors());

app.use('/api/admin',adminRoutes)
app.use(mailRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
});
