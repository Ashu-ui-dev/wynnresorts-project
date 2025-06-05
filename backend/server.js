const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;
const formStore = {};

const otpDb = {};

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  const { email, firstName, lastName, phoneNumber, country, gender, termsAccepted } = formData;

  if (email && firstName && lastName && phoneNumber && country && gender && termsAccepted) {

    Object.assign(formStore, formData);

    return res.status(200).json({ message: 'Data stored successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid request' })
  }
});

app.post('/generate-otp', (req, res) => {
  const { medium , communicationStream } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  otpDb[communicationStream] = {
    ...(otpDb[communicationStream] || {}),
    otp,
  };

  return res.status(200).json({ message : 'otp generated successfully' }); // In production: Send via email/SMS instead
});

app.post('/get-otp', (req, res)=>{

  const { communicationStream } = req.body;

  if(!otpDb[communicationStream]){
    return res.status(400).json({
      status : false,
      message : `No OTP found for : ${communicationStream}`});
  }else{
    res.status(200).json({
      status : true,
      message : `Your OTP is ${ otpDb[communicationStream]?.otp }`})
  }

})

app.post('/verify-otp', (req, res) => {
  const {otp , communicationStream} = req.body;

  if (!otpDb[communicationStream]) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  if (otpDb[communicationStream].otp === otp) {
    return res.json({ success: true, message: 'OTP verified' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
