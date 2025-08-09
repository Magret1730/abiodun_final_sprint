import React from 'react';
import './Footer.css';
import { FaTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__text">&copy; 2025 Magret. All rights reserved.</p>
        </div>
        <div className="footer__social-media">
          <a href="https://www.twitter.com/@OyedeleMagret" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaTwitter className='footer__social-twitter'/>
          </a>
          <a href="http://www.github.com/Magret1730" target="_blank" rel="noopener noreferrer"  className="footer__social-link">
            <FaGithub/>
          </a>
          <a href="https://www.linkedin.com/in/oyedele-abiodun/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
            <FaLinkedin/>
          </a>
        </div>
      </footer>
  )
}

export default Footer;