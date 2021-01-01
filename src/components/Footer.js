import React from 'react';
import { Button } from './Button';
import './Footer.css'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join us now and get started!
                </p>
                <p className="footer-subscription-text">
                    Return to to TOP
                </p>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">

          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
        </div>
    </div>
    <section className="social-media">
        <div className="social-media-wrap">
            <small className="website-rights">© 2020 Kazuhide Izawa All Rights Reserved</small>
            <div className="social-icons">
                <Link className="social-icon-link facebook" to="/" target="_blank" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="social-icon-link instagram" to="/" target="_blank" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                </Link>
                <Link className="social-icon-link twitter" to="/" target="_blank" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                </Link>
            </div>
        </div>
    </section>
    </div>
    )
}

export default Footer
