import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {

  return (
    <div className="footer">
      <div className="row-div">
      
      <div className="col-span-1">
          <ul className="footer-nav">
            <p>
                Copyright &copy; by WUForex 2020, All rights reserved.
            </p>
          <li><a href="/TC">Terms and Conditions Apply</a></li>
          </ul>
      </div>
      <div className="col-span-2">
          <ul className="social-links">
            <li><a href="https://www.instagram.com/"><div className="insta"><ion-icon name="logo-instagram"></ion-icon></div></a></li>
            <li><a href="https://www.twitter.com/"><div className="twitter"><ion-icon name="logo-twitter"></ion-icon></div></a></li>
            <li><a href="https://www.linkedin.com/"><div className="linkedin"><ion-icon name="logo-linkedin"></ion-icon></div></a></li>
            <li><a href="https://www.facebook.com/"><div className="facebook"><ion-icon name="logo-facebook"></ion-icon></div></a></li>
          </ul>
      </div>
        
    </div>
  </div> 
  )

}

export default Footer;