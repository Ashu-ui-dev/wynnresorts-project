import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import WynnLogo from '../../assets/images/wynn-logo.png'; 


const Header = ({ 
  currentLanguage = 'EN',
  onLanguageChange 
}) => {
  const navigationItems = [
    { label: 'ROOMS & SUITES', path: '/rooms' },
    { label: 'WYNN REWARDS', path: '/rewards' },
    { label: 'OFFERS', path: '/offers' },
    { label: 'DINING', path: '/dining' },
    { label: 'ENTERTAINMENT', path: '/entertainment' },
    { label: 'MEETINGS & EVENTS', path: '/meetings' },
  ];

  return (
    <header className="main-header">
      <div className="header-container">
        
        <Link to="/" className="logo-container">
          <img src={WynnLogo} alt="Wynn Resorts" className="wynn-logo" />
        </Link>

        <nav className="main-nav">
          <ul className="nav-items">
            {navigationItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="language-selector">
          <button 
            className="language-button"
            onClick={() => onLanguageChange?.(currentLanguage === 'EN' ? 'AR' : 'EN')}
          >
            {currentLanguage}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;