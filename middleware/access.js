const request = require('request') 
const { CONSUMER_KEY }= require('../config/myConfig')
const { CONSUMER_SECRET} = require('../config/myConfig') 
const access = (req, res, next) => { 
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    let auth = new Buffer(CONSUMER_KEY + ":" + CONSUMER_SECRET).toString('base64')

    request(
        {
            url: url, 
            headers: {
                "Authorization": "Basic " + auth
            }
        }, 
        (error, response, body) => {
            if(error){
                console.log(error)
            } 
            else{
                req.access_token = JSON.parse((body)).access_token
                next()
            }
        }
    )

} 
 
module.exports = access