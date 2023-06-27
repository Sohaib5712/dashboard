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
