const express = require('express') 
const request = require('request')
const app = express() 

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome")
})  
app.get('/access_token', access, (req, res) => {  
    res.status(200).json({ access_token: req.access_token})
   
    

}) 
app.get('/register', access, (req, res) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    let auth = "Bearer " + req.access_token 
    request(
        {
            url: url, 
            method:"POST", 
            headers: {
                "Authorization": auth
            }, 
            json: { 
                "ShortCode": "600618",
                "ResponseType": "Complete",
                "ConfirmationURL": "https://whispering-brook-52781.herokuapp.com/confirmation",
                "ValidationURL": "https://whispering-brook-52781.herokuapp.com/validation"

            }
        }, 
        function(error, response, body){
            if(error){ console.log(error)} 
            res.status(200).json(body)
        }
    )
}) 
app.post('/confirmation', (req, res) => {
    console.log('......confirmation.......') 
    console.log(req.body)
}) 
app.post('/validation', (req, res) => {
    console.log('......validation.......') 
    console.log(req.body)
}) 
app.get('/simulate', access, (req, res) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
    let auth = "Bearer " + req.access_token 

    request(
        {
            url: url, 
            method: "POST", 
            headers: {
                "Authorization": auth
            }, 
            json: { 
                                
                    "ShortCode":"600618",
                    "CommandID":"CustomerPayBillOnline",
                    "Amount":"3",
                    "Msisdn":"254708374149",
                    "BillRefNumber":"TestAPI"

            }
        },
        function(error, response, body) {
            if(error) {
                console.log(error)
            } 
            else{
                res.status(200).json(body)
            }
        } 
    )
})

function access(req, res, next) { 
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    let auth = new Buffer("AbHBls0VVrs6oYaek6f8fwuSPok1mjEH:h2A6xCmGCJnAhl2N").toString('base64')

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
                req.access_token = JSON.parse(body).access_token 
                next()
            }
        }
    )

}

app.listen(process.env.PORT || 5000, console.log("server is running on port 5000"))