 const access = (req, res, next) => { 
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