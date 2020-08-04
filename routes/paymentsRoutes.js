const express = require('express') 
const request = require('request')

const router = express.Router() 

const access = require('../middleware/access') 
const { SHORTCODE, MSISDN} = require('../config/myConfig')



router.get('/', (req, res) => {
    res.send('welcome to mode refactor')
}) 
router.get('/access_token',access, (req, res) => {
    res.status(200).json({access_token: req.access_token})
}) 
router.get('/register', access, (req, res) => {
    url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    auth = "Bearer " + req.access_token;
  
    request(
      {
        method: 'POST',
        url : url,
        headers : {
          "Authorization" : auth
        },
        json : {
          "ShortCode": SHORTCODE,
          "ResponseType": "Complete",
          "ConfirmationURL": "https://whispering-brook-52781.herokuapp.com/payments/confirmation",
          "ValidationURL": "https://whispering-brook-52781.herokuapp.com/payments/validation"
        }
      },
      function (error, response, body) {
        if(error){
            console.log(error)
        } else {
            res.status(200).json(body)
        }
        
      }
    )
  
}) 
router.get('/simulate', access, (req, res) => {
    url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
    auth = "Bearer " + req.access_token;
  
    request(
      {
        method: 'POST',
        url : url,
        headers : {
          "Authorization" : auth
        },
        json : {
          
          "ShortCode": SHORTCODE,
          "CommandID":"CustomerPayBillOnline",
          "Amount":"3",
          "Msisdn":MSISDN,
          "BillRefNumber":"TestAPI"
        }
      },
      function (error, response, body) {
        if(error){
        console.log(error) 
        }else{ 
            res.status(200).json(body)

        }
      }
    )
})
router.post('/confirmation', (req, res) => {
    console.log('.....confirmation......') 
    console.log(req.body)
}) 
router.post('/validation', (req, res) => {
    console.log('.....validation......') 
    console.log(req.body)
}) 




module.exports = router