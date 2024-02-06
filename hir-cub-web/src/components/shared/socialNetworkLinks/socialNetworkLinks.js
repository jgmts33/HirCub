import React from 'react';
import './styles.scss';

function SocialNetworkLinks() {
    return (
     <ul className="side-social-network-links">
        <li className="facebook">
            <a href="#">
                <i className="fab fa-facebook-f"></i>
            </a>
        </li>
        <li className="twitter">
            <a href="#">
                <i className="fab fa-twitter"></i>
            </a>
        </li>
        <li className="pinterest">
            <a href="#">
                <i className="fab fa-pinterest-p"></i>
            </a>
        </li>
        <li className="blogger">
            <a href="#">
                <i className="fab fa-blogger-b"></i>
            </a>
        </li>
        <li className="reddit">
            <a href="#">
                <i className="fab fa-reddit-alien"></i>
            </a>
        </li>
        <li className="envelope">
            <a href="#">
                <i className="fas fa-envelope"></i>
            </a>
        </li>
     </ul>
    );
  }
  
  export default SocialNetworkLinks;
  