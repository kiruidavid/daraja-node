const mongoose = require('mongoose') 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useCreateIndex: true, 
            useUnifiedTopology: true
        }) 
        console.log('MongoDB connected succesfully')
    } catch {
        console.log('An error has occured') 
        process.exit(1)
    } 
} 
module.exports = connectDB