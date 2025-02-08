import React, { useState, useRef } from 'react';
import './otp-success.scss';
import { useUser } from '../../context/UserContext';

const OtpSuccess = ({ email, onBack, onNext }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const { user } = useUser(); 

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="registration-container">
     <div className="header-section">
        <h1>Registration</h1>
        <span className="step-indicator">Step 1 of 3</span>
      </div>
      
      <p className="subtitle">Please enter below information to create your account.</p>

      <div className="otp-verification">
        <h2>OTP Verification</h2>

        <div className="otp-success-section">
          {user?.medium > 0 ? (<> <h4>Please check your email.</h4>
            <p>We've sent a code to {user?.email}</p></>) : (<> <h4>Please check your phone.</h4>
              <p>We've sent a code to {user?.phoneNumber}</p></>)}


          <div className="otp-input-group">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <p className="resend-text">
            Didn't get a code? <button className="link-button">Click to resend.</button>
          </p>
        </div>
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={onBack}>
          BACK
        </button>
        <button className="btn-next" onClick={() => onNext(otp.join(""))}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default OtpSuccess;
