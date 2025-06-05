import React, { useState } from 'react';
import './otp-generate.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

type OtpGenerateProps = {
  email: string;
  onBack: () => void;
  onNext: () => void;
};

const OtpGenerate = ({ email, onBack }: OtpGenerateProps) => {

  const navigate = useNavigate();

  const { setUser, user } = useUser();

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('otpFetched', 'false')
    setUser({ ...user, communicationStream: user.medium ? user.email : user.phoneNumber});

    try {

      const payload = {
        medium : user?.medium,
        communicationStream : user.medium ? user.email : user.phoneNumber
      }

      const response = await fetch(
        'http://localhost:4000/generate-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      navigate('/verify-otp');

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
   

  return (
    <div className="registration-container">
      <div className="header-section">
        <h1>Registration</h1>
        <span className="step-indicator">Step 2 of 3</span>
      </div>

      <p className="subtitle">Please enter below information to create your account.</p>
      <div className="otp-verification">
        <h2>OTP Verification</h2>

        <div className="send-code-section">
          <h4>Send Code</h4>
          <p>How would you like to receive the code?</p>

          <div className="send-options">
            <label className="radio-label">
              <input
                type="radio"
                name="sendMethod"
                checked={user.medium === 0}
                onChange={() => setUser({ ...user, medium: 0 })}
              />
              <span>Send to Phone</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sendMethod"
                checked={user.medium === 1}
                onChange={() => setUser({ ...user, medium: 1 })}
              />
              <span>Send to Email</span>
            </label>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={onBack}>
          BACK
        </button>
        <button type="button" className="btn-next" onClick={handleNextClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default OtpGenerate;
