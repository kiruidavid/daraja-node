const express = require('express') 
const connectDB = require('./config/db') 
require('dotenv').config()

const app = express() 
app.use(express.json()) 

connectDB()

app.use('/payments', require('./routes/paymentsRoutes')) 

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("server is running on port 5000"))