import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/registration/index.js';
import OtpGenerate from './components/otp-generate/index.js';
import OtpSuccess from './components/otp-success/index.js';
import Header from './components/header/index.js';
import Footer from './components/footer/index.js';
import { UserProvider } from "./context/UserContext.js"; 


const App = () => {
  const [email, setEmail] = useState('');

  const handleBack = () => window.history.back();
  const handleNext = () => window.history.forward();

  const handleLanguageChange = (language) => {
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
          <Route path="/generate-otp" element={
            <OtpGenerate 
              email={email} 
              onBack={handleBack} 
              onNext={handleNext}
            />
          } />
          <Route path="/verify-otp" element={
            <OtpSuccess 
              email={email} 
              onBack={handleBack} 
              onNext={handleNext}
            />
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
    </UserProvider>
  );
};
export default App;