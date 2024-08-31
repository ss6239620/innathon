import { sendSmsData } from './SendSMS'



function handleSMS(params) {
    const patient = Math.floor(100000 + Math.random() * 900000).toString()
    const doctor = Math.floor(100000 + Math.random() * 900000).toString()
    const dat= new Date()
    const SMSDATA = [
        {
            phone: '7718833236',
            msg: `Your appointment has been scheduled`
        },
        {
            phone: '9082222597',
            msg: `346773 this is code for video chat with patient at time ${dat}`
        },
    ]

    // console.log('msg sending...')
    sendSmsData(SMSDATA)
}

function PayNow(params) {
   console.log('payed');
   handleSMS()
}

export { PayNow }
