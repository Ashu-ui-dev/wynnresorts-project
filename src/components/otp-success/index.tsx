import React, { useState, useRef, useEffect } from 'react';
import './otp-success.scss';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

type OtpSuccessProps = {
  email: string;
  onBack: () => void;
  onNext: (otp: string) => void;
};

const OtpSuccess = ({ email, onBack, onNext }: OtpSuccessProps) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [successState,setSuccessState] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { user } = useUser();
  const navigate = useNavigate()
  const getOtp = async () => {
    try {
      const response = await fetch('http://localhost:4000/get-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ communicationStream: user.communicationStream }),
      });

      const result = await response.json();
      if (result?.status) {
        alert(result.message);
        sessionStorage.setItem('otpFetched', 'true'); 
      } else {
        alert('No OTP found');
      }
    } catch (error) {
      console.error('OTP API error:', error);
    }
  };

  useEffect(() => {
    const alreadyFetched = sessionStorage.getItem('otpFetched');

    if (alreadyFetched === 'true') return; 
    getOtp();
  }, [user.communicationStream]);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitOtp = async () => {
    const joinedOtp = otp.join(""); 
    try {
      const response = await fetch('http://localhost:4000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ communicationStream: user.communicationStream, otp: joinedOtp }),
      });

      const result = await response.json();

      if (result) {
        alert(result.message);

        if(result.success){
          setSuccessState(true)
        }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="registration-container">
      <div className="header-section">
          <h1>Registration</h1>
          <span className="step-indicator">Step 3 of 3</span>
        </div>
  

      {
        !successState ? (
          <>
        <p className="subtitle">Please enter below information to create your account.</p>
        <div className="otp-verification">
          <h2>OTP Verification</h2>
  
          <div className="otp-success-section">
            {typeof user?.medium === 'number' && user.medium > 0 ? (
              <>
                <h4>Please check your email.</h4>
                <p>We've sent a code to {user?.email}</p>
              </>
            ) : (
              <>
                <h4>Please check your phone.</h4>
                <p>We've sent a code to {user?.phoneNumber}</p>
              </>
            )}
  
            <div className="otp-input-group">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
  
            <p className="resend-text">
              Didn't get a code? <button className="link-button" onClick={getOtp}>Click to resend.</button>
            </p>
          </div>
        </div>
  
        <div className="button-group">
          <button className="btn-back" onClick={onBack}>
            BACK
          </button>
          <button className="btn-next" onClick={handleSubmitOtp}>
            NEXT
          </button>
        </div>
        </>
        ) : (
          <>
          <p className="subtitle success">You have been succesffully registered.</p>
          </>
        )
      }

    </div>
  );
};

export default OtpSuccess;
