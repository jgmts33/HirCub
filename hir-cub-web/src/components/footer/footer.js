import React from 'react';
import './styles.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <a href="/" className="logo">
          <img src="/img/footer/logo-white.png" alt="" />
        </a>
        <div className="footer__info">
          <ul className="footer__list">
            <li>
              <a href="mailto:carehub@virtualhospice.ca">Contact us</a>
            </li>
            <li>
              <a href="/about-us#privacy">Privacy Notice</a>
            </li>
            <li>
              <a href="https://www.virtualhospice.ca/en_US/Main+Site+Navigation/Right+Footer+Navigation/Privacy+Policy.aspx" target="_blank">
                Privacy Policy
              </a>
            </li>
          </ul>
          <span>
            Copyright 2022 Canadian Virtual Hospice. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
