import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [error,setError] = useState()
  const footerLinks = {
    column1: [
      { label: 'Shop Home Collection', path: '/shop' },
      { label: 'Gift Cards', path: '/gift-cards' },
      { label: 'Wynn Stories', path: '/stories' },
      { label: 'Wynn Slots App', path: '/slots-app' },
      { label: 'Mobile App', path: '/mobile-app' },
      { label: 'Responsible Gaming', path: '/responsible-gaming' },
    ],
    column2: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Investor Relations', path: '/investors' },
      { label: 'Privacy Notice', path: '/privacy' },
      { label: 'Cookie Notice', path: '/cookies' },
      { label: 'Terms of Use', path: '/terms' },
      { label: 'Hotel Information & Directory', path: '/directory' },
    ],
    column3: [
      { label: 'Wynn Palace Cotai', path: '/cotai' },
      { label: 'Encore Boston Harbor', path: '/boston' },
      { label: 'Wynn Macau', path: '/macau' },
    ],
  };

  const socialLinks = [
    { icon: 'facebook', url: '#' },
    { icon: 'weibo', url: '#' },
    { icon: 'apple', url: '#' },
    { icon: 'instagram', url: '#' },
    { icon: 'twitter', url: '#' },
  ];

  const handleNewsLetterSubmit = async () => {
    const formData = {
      newLetterEmail: email
    };
    if (email.length) {

      try {
        const response = await fetch("https://67a77275203008941f67a4de.mockapi.io/asdfpi/formdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setError(error.message)
      }
    }
  }

  return (
    <footer className="main-footer">
      <div className="newsletter-section">
        <div className="newsletter-container">
          <h2>Get News & Updates</h2>
          <p>Get latest developments and exciting news on how we are shaping the future!</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              className="email-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="subscribe-button" onClick={handleNewsLetterSubmit} >JOIN THE NEWSLETTER</button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-links">
            <div className="footer-column">
              {footerLinks.column1.map((link) => (
                <Link key={link.path} to={link.path}>{link.label}</Link>
              ))}
            </div>

            <div className="footer-column">
              {footerLinks.column2.map((link) => (
                <Link key={link.path} to={link.path}>{link.label}</Link>
              ))}
            </div>

            <div className="footer-column">
              <div className="property-links">
                {footerLinks.column3.map((link) => (
                  <Link key={link.path} to={link.path}>{link.label}</Link>
                ))}
              </div>

              <div className="location-info">
                <p>Wynn and Encore Las Vegas</p>
                <p>3131 Las Vegas Blvd. Las Vegas, NV 89109</p>
                <p>+1 (702) 770-7000</p>
              </div>

              <div className="social-section">
                <p>Connect with us.</p>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a key={social.icon} href={social.url} className={`social-icon ${social.icon}`}>
                      {/* <span className="sr-only">{social.icon}</span> */}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-container">
            <Link to="/privacy/do-not-sell" className="privacy-link">
              Do Not Sell Or Share My Data
            </Link>
            <p className="copyright">
              © 2024 Wynn Resorts Holdings, LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;