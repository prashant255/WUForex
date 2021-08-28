import React, { Component } from 'react';
import  Navbar  from '../common/navbar/Navbar';
import TitleWU  from '../common/title/TitleWU';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import CurrencySearchBox from '../common/currencySearch/CurrencySearch';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="main">
                <div className="header">
                    <Navbar isLandingPage = {true}/>
                     <div className="header-main">
                        <div className="main-title"><Link to = "/home" className = "title-link"><TitleWU/></Link></div>
                        <div className="tagline"> The modern solution to trade and compare</div>
                        <br/>
                        <CurrencySearchBox alignSearch="row"/>
                    </div> 
                </div>
            </div>
        )
    }
}

export default Home         