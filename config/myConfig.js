const CONSUMER_KEY = 'AbHBls0VVrs6oYaek6f8fwuSPok1mjEH'
const CONSUMER_SECRET = 'h2A6xCmGCJnAhl2N'   
const SHORTCODE = '600618' 
const MSISDN = '254708374149' 
const SECURTITY_CREDENTIALS = 'CKQZCXPLlgHWgK1iMXTzd/uZKHd1XSyJFXqhQ3F1ftIwDKY+AhVu0tuXtUo6E4ruIubgMEHPeu6qQ0eaRw7hfbz+JyNV24h7MHRYwehZILF5cq6C1VtMiiNjB931UEZI+S/I8UQDX5wDVYsqbUozLubIW7mFeApOV/1adKJczgTTnjhZNXhEMY2WxsNGUrSUH642i9pBtkhJZbsEQj3+VETzlap4CrNWroJKEGv6cDTCD3vGSw1aqNBbpM8ZUp82R0a4GnVyZXw9j6pEyXhoxp4FOuemsvUpD2H3kAGmiSAvCtrV00Lo6Vz6NJuob8nE7GzuhJYSu1/Azxzp6yDtrw=='
const INITIATOR_NAME = 'TestInit619'  
const PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' 
const LNM_SHORTCODE = '174379'

let datenow = new Date()
const TIMESTAMP = datenow.getFullYear() + "" + "" + datenow.getMonth() + "" + "" + datenow.getDate() + "" + "" + datenow.getHours() + "" + "" + datenow.getMinutes() + "" + "" + datenow.getSeconds() 
const PASSWORD = new Buffer.from(LNM_SHORTCODE + PASSKEY + TIMESTAMP).toString('base64')

module.exports = {CONSUMER_KEY, 
    CONSUMER_SECRET, SHORTCODE,
     MSISDN, 
     SECURTITY_CREDENTIALS, 
     INITIATOR_NAME,
     LNM_SHORTCODE, TIMESTAMP, PASSWORD}


