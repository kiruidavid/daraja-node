const express = require('express') 
const request = require('request')

const router = express.Router() 

const access = require('../middleware/access') 
const { SHORTCODE } = require('../config/myConfig')



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
          "ValidationURL": "https://whispering-brook-52781.herokuapp.com/payments/validation_url"
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

module.exports = router