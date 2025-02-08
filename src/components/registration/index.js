import React, { useState, useEffect } from "react";
import "./registration.scss";
import { useNavigate } from 'react-router-dom';
import { getCountries } from "../../services/services";
import { useUser } from "../../context/UserContext";

const Registration = () => {

  const { setUser } = useUser(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:  "",
    gender: "",
    country:  "",
    email:  "",
    phoneNumber:  "",
    termsAccepted:  false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [countryError, setCountryError] = useState('');
  const [selectedCallingCode, setSelectedCallingCode] = useState('+971');
  const [showCallingCodes, setShowCallingCodes] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  useEffect(() => {
    setIsLoadingCountries(true);
    getCountries()
      .then(data => {
        setCountries(data);
        setIsLoadingCountries(false);
      })
      .catch(error => {
        setCountryError('Unable to load countries');
        setIsLoadingCountries(false);
      });
  }, []);

  const handleCallingCodeSelect = (country) => {
    setSelectedCallingCode(country.callingCode || '');
    setShowCallingCodes(false);
  };

  const handleBlur = () => {
    validateForm(); // Re-run validation on blur
};

  const validateForm = () => {
    const newErrors = {};
    let hasErrors = false;
    let firstErrorField = null; // ✅ Track first error field

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
        newErrors.email = "Email is required";
        if (!firstErrorField) firstErrorField = "email"; // ✅ First error
        hasErrors = true;
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        if (!firstErrorField) firstErrorField = "email";
        hasErrors = true;
    }

    // Phone validation
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
        if (!firstErrorField) firstErrorField = "phoneNumber";
        hasErrors = true;
    } else if (phoneDigits.length !== 9) {
        newErrors.phoneNumber = "Phone number must be 9 digits";
        if (!firstErrorField) firstErrorField = "phoneNumber";
        hasErrors = true;
    }

    // Required fields
    if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
        if (!firstErrorField) firstErrorField = "firstName";
        hasErrors = true;
    }

    if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
        if (!firstErrorField) firstErrorField = "lastName";
        hasErrors = true;
    }

    if (!formData.gender) {
        newErrors.gender = "Gender is required";
        if (!firstErrorField) firstErrorField = "gender";
        hasErrors = true;
    }

    if (!formData.country) {
        newErrors.country = "Country is required";
        if (!firstErrorField) firstErrorField = "country";
        hasErrors = true;
    }

    if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms";
        if (!firstErrorField) firstErrorField = "termsAccepted";
        hasErrors = true;
    }

    setErrors(newErrors);
    return hasErrors ? firstErrorField : null; 
};

  
const handleSubmit = async (e) => {
  e.preventDefault(); 

  setError("");
  setSuccess("");

  const firstErrorField = validateForm(); 

  if (firstErrorField) {
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
          errorElement.classList.add("error"); 
          errorElement.focus(); 
      }
      return;
  }

  const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      gender: e.target.gender.value,
      country: e.target.country.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      termsAccepted: e.target.termsAccepted.checked, 
  };

  try {
      const response = await fetch("https://67a77275203008941f67a4de.mockapi.io/api/formdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
      });

      if (!response.ok) {
          throw new Error("Failed to submit data");
      }

      const result = await response.json();
      setUser({ email: formData.email, phoneNumber: formData.phoneNumber });

      setSuccess("Form submitted successfully!");

      navigate("/generate-otp");
  } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong. Please try again.");
  }
};



  return (
    <div className="registration-container">
      <div className="header-section">
        <h1>Registration</h1>
        <span className="step-indicator">Step 1 of 3</span>
      </div>
      
      <p className="subtitle">Please enter below information to create your account.</p>

      <form onSubmit={handleSubmit}>
        <div className="section">
          <h2 className="section-heading">Personal Info</h2>
          
          <div className="form-row">
            <div className="input-group">
              <label>
                First Name <span className="required">*</span>
                
              </label>
              <input 
                type="text" 
                name="firstName"
                placeholder="Enter first name..."
                value={formData.firstName}
                onChange={handleChange} 
                onBlur={handleBlur}
                className={`input-field ${errors.firstName ? 'error' : ''}`}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="input-group">
              <label>
                Last Name <span className="required">*</span>
                
              </label>
              <input 
                type="text" 
                name="lastName"
                placeholder="Enter last name..."
                value={formData.lastName}
                onChange={handleChange} 
                onBlur={handleBlur}
                className={`input-field ${errors.lastName ? 'error' : ''}`}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>
          <div className="input-group">
            <label>
              Gender <span className="required">*</span>
              
            </label>
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field ${errors.gender ? 'error' : ''}`}
            >
              <option value="">Select gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>

          <div className="input-group">
            <label>
              Your Residence Country <span className="required">*</span>
              
            </label>
            <select 
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field ${errors.country ? 'error' : ''}`}
              disabled={isLoadingCountries}
            >
              <option value="">
                {isLoadingCountries 
                  ? 'Loading countries...' 
                  : 'Select residence country...'}
              </option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flagIcon} {country.name}
                </option>
              ))}
            </select>
            {errors.country && <span className="error-text">{errors.country}</span>}
            {countryError && <span className="error-text">{countryError}</span>}
          </div>
        </div>

        <div className="section">
          <h2 className="section-heading">Contact Details</h2>
          
          <div className="input-group">
            <label>
              Email <span className="required">*</span>
              
            </label>
            <input 
              type="email"
              name="email"
              placeholder="Enter email address..."
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>
              Phone Number <span className="required">*</span>
              
            </label>
            <div className={`phone-input-container ${errors.phoneNumber ? 'error' : ''}`}>
              <div className="calling-code-selector">
                <button 
                  type="button" 
                  className="calling-code-button"
                  onClick={() => setShowCallingCodes(!showCallingCodes)}
                >
                  {isLoadingCountries ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      {countries.find(c => c.callingCode === selectedCallingCode)?.flagIcon}
                      <span>{selectedCallingCode}</span>
                      <span className="dropdown-arrow">▼</span>
                    </>
                  )}
                </button>
                
                {showCallingCodes && (
                  <div className="calling-codes-dropdown">
                    {countries.map(country => (
                      <button
                        key={country.code}
                        type="button"
                        className="calling-code-option"
                        onClick={() => handleCallingCodeSelect(country)}
                      >
                        <span className="country-flag">{country.flagIcon}</span>
                        <span className="country-name">{country.name}</span>
                        <span className="calling-code">{country.callingCode}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input 
                type="tel"
                name="phoneNumber"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`phone-input ${errors.phoneNumber ? 'error' : ''}`}
              />
            </div>
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>
        </div>

        <div className="checkbox-row">
          <label className="checkbox-label">
            <input 
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>I agree to the <a href="#">terms and conditions</a> and <a href="#">privacy policy</a>.</span>
          </label>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'NEXT'}
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
};

export default Registration;