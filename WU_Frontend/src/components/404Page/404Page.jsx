import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './404Page.css'
import TitleWU from '../common/title/TitleWU';
const PageNotFound = ()=> {

    return (
        <div>
            <div className = "title">
                <Link to="/home" className = "title-link"><TitleWU/></Link>
            </div>
            <div className = "number-404">
                    404 
            </div>
            <div className = "page-not-found">
                Page Not Found!
            </div>
            <Link to="/home"><Button variant = "success" size = "lg" className = "go-back-home-btn">Go Back Home</Button></Link>
        </div>
      )

}

export default PageNotFound;