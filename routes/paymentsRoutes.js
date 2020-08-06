const express = require('express') 
const request = require('request')

const router = express.Router() 
const C2bPayments = require('../models/c2bModels')

const access = require('../middleware/access') 
const { SHORTCODE, MSISDN, SECURTITY_CREDENTIALS, LNM_SHORTCODE, INITIATOR_NAME, PASSWORD, TIMESTAMP} = require('../config/myConfig')



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
          "Amount":"100",
          "Msisdn": MSISDN,
          "BillRefNumber":"testAPI"
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
router.get('/account_balance', access, (req, res) => {
  url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query"
  auth = "Bearer " + req.access_token;

  request(
    {
      method: 'POST',
      url : url,
      headers : {
        "Authorization" : auth
      },
      json : {
        "Initiator": INITIATOR_NAME,
        "SecurityCredential": SECURTITY_CREDENTIALS,
        "CommandID":"AccountBalance",
        "PartyA": SHORTCODE,
        "IdentifierType":"4",
        "Remarks":"REMARKS",
        "QueueTimeOutURL":"https://whispering-brook-52781.herokuapp.com/payments/timeout_url",
        "ResultURL":"https://whispering-brook-52781.herokuapp.com/payments/result_url"
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
router.get('/lnm', access, (req, res) => { 
  url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
  auth = "Bearer " + req.access_token;

  request(
    {
      method: 'POST',
      url : url,
      headers : {
        "Authorization" : auth
      },
    json : {
      "BusinessShortCode": LNM_SHORTCODE,
      "Password": PASSWORD,
      "Timestamp": TIMESTAMP,
      "TransactionType": "CustomerPayBillOnline",
      "Amount": "1",
      "PartyA": "254721949654",
      "PartyB": LNM_SHORTCODE,
      "PhoneNumber": "254721949654",
      "CallBackURL": "https://whispering-brook-52781.herokuapp.com/payments/callback",
      "AccountReference": "123TEST",
      "TransactionDesc": "TEST"
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
router.post('/callback', (req, res) => {
  console.log('....callback....') 
  console.log(req.body)
})
router.post('/timeout_url', (req, res) => {
  console.log('....timeout....')
  console.log(req.body)
}) 
router.post('/result_url', (req, res) => {
  console.log('....result....')
  console.log(req.body)
})  

router.post('/confirmation', (req, res) => {
    console.log('.....confirmation......') 
    trans_id = req.body.TransID 
    console.log(trans_id, "this is the transaction ID") 
    trans_amount = req.body.TransAmount 
    console.log(trans_amount, "this is the amount") 
    first_name = req.body.FirstName 
    console.log(first_name, "this is the first name") 
    middle_name = req.body.MiddleName 
    console.log(middle_name, "this is the middle name")
    last_name = req.body.LastName 
    console.log(last_name, "this is the last name")  
    msisdn = req.body.MSISDN 
    console.log(msisdn, "this is the phone number") 
    business_shortcode = req.body.BusinessShortCode 
    console.log(business_shortcode, "this is the shortcode")  

  const new_C2b = new C2bPayments({
    TransID=trans_id, 
    TransAmount = trans_amount, 
    FirstName = first_name,  
    MiddleName = middle_name,
    LastName = last_name, 
    MSISDN = msisdn, 
    BusinessShortCode = business_shortcode
  }) 
    new_C2b.save().then(() => console.log('saved in the database')).catch(() => console.log('An error occured!!!'))



}) 
router.post('/validation', (req, res) => {
    console.log('.....validation......') 
    console.log(req.body)
}) 




module.exports = router