const mongoose = require('mongoose') 
const C2bPaymentsSchema = new mongoose.Schema({
    TransID: { 
        type: String, 
        maxlength: 12, 
        null: true, 
        required: false

    }, 
    TransAmount: { 
        type: String, 
        maxlength: 12, 
        null: true, 
        required: false

    }, 
    BusinessShortCode: { 
        type: String, 
        maxlength: 6, 
        null: true, 
        required: false

    }, 
    MSISDN: { 
        type: String, 
        maxlength: 12, 
        null: true, 
        required: false

    }, 
    FirstName: { 
        type: String, 
        maxlength: 20, 
        null: true, 
        required: false

    }, 
    MiddleName: { 
        type: String, 
        maxlength: 20, 
        null: true, 
        required: false

    }, 
    LastName: { 
        type: String, 
        maxlength: 20, 
        null: true, 
        required: false

    }

}) 
module.exports = mongoose.model('C2bPayments', C2bPaymentsSchema)