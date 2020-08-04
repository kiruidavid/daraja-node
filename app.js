const express = require('express') 
 
require('dotenv').config()

const app = express() 
app.use(express.json()) 

app.use('/payments', require('./routes/paymentsRoutes')) 

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("server is running on port 5000"))