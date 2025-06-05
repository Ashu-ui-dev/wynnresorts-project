import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/registration';
import OtpGenerate from './components/otp-generate';
import OtpSuccess from './components/otp-success';
import Header from './components/header';
import Footer from './components/footer';
import { UserProvider } from './context/UserContext';

const App = () => {
  const [email, setEmail] = useState<string>('');

  const handleBack = () => {
    sessionStorage.setItem('otpFetched', 'false')
    window.history.back();
  }
  const handleNext = () => {
    sessionStorage.setItem('otpFetched', 'false')
    window.history.forward();
  }

  const handleLanguageChange = (language: string) => {
    console.log('Language changed to:', language);
  };

  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Header
            currentLanguage="EN"
            onLanguageChange={handleLanguageChange}
          />
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route
              path="/generate-otp"
              element={
                <OtpGenerate
                  email={email}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              }
            />
            <Route
              path="/verify-otp"
              element={
                <OtpSuccess
                  email={email}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
