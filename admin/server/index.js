const express = require('express');
require('./connect')
const app = express();
const port = 4000;
const cors = require("cors")
const adminRoutes = require('./routes/adminRoutes')
const blogRoute = require('./routes/blogRoutes')
const mailRoutes = require('./routes/mailRoutes')
const {join} = require('path')



// middle ware

app.use(express.json())

app.use(cors());
app.use(express.urlencoded({extended:false}))

app.use('/api/admin',adminRoutes)
app.use('/api/blog',blogRoute)
app.use(mailRoutes)
app.use(express.static('./uploads'))

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
});
