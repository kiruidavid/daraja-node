const express = require('express') 
const request = require('request') 
const app = express() 
const access = require('./middleware/access')

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
app.get('/balance', access, (req, res) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query"
    let auth = "Bearer " + req.access_token 

    request(
        {
            url: url, 
            method: "POST", 
            headers: {
                "Authorization": auth
            }, 
            json: {
                "Initiator":"TestInit619",
                "SecurityCredential":"aFsJJL/FzuxXT9ckTWem4++IJW6OljOQTfOKX/c7uxJZKMD6lOAVtk5B+nMRpbxfbIuAPPwmETl1hHaj1qLLBEh0Uw3cVayYuR6OX9VVjZnE+Dpsclycor8luOzSnAtx8iyNi34OUW4G2pXyLgiSCOTd0C0+dab+kWtnnEFsXp5CJpGNHQCJHCU2WfLQqDQdSWJTh3t8fFQpBuZn41AJru86sm79skQk3l1usjWNrHvfcSgwIgbMeQjZfvbxlBQAF2V2TZarEcTmbLD+IIyJayV0Wf+7UpGqBgNgbVxnwxsN4dWQu7q8cmU7D3MPSTYlmrwDwUVxTHbydZqmdhKEfw==",
                "CommandID":"AccountBalance",
                "PartyA":"600618",
                "IdentifierType":"4",
                "Remarks":"Remarks",
                "QueueTimeOutURL":"https://whispering-brook-52781.herokuapp.com/timeout_url",
                "ResultURL":"https://whispering-brook-52781.herokuapp.com/result_url"
            }
        }, 
        function(error, response, body){
            if(error){ console.log(error)} 
            res.status(200).json(body)
        }
    )
}) 
app.post('/timeout_url', (req, res) => {
    console.log('......Timeout URL.......') 
    console.log(req.body)
}) 
app.post('/result_url', (req, res) => {
    console.log('......Result URL.......') 
    console.log(req.body.Result.ResultParameters)
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