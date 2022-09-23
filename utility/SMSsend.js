const dotenv = require('dotenv').config();
const twilio = require('twilio')(process.env.SID, process.env.AUTH_TOKEN);

const twilioNumber = process.env.NUMBER

const sendVerifySMS = (to, sms) => {

    twilio.messages.create({
        from : twilioNumber,
        to : to, 
        body : sms
    }).then(res => {
        console.log('SMS send done');
    }).catch(err => {
        console.log(err.message);
    })

}

// module export
module.exports = sendVerifySMS