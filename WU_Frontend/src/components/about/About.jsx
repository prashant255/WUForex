import React, { Component } from 'react';
import  Navbar  from '../common/navbar/Navbar';
import './About.css'


const About =  () => {
    return (
        <div>
            <Navbar isLandingPage = {false}/>
            <div  className = "about-us">
                <img className = "image-about-us" src = "/images/About-us.png" alt="about-us"/> 
            </div>
            <div  className = "info">
                <div className = "heading-info">
                   <h1><b> Key Features</b> </h1>
                </div>
                <div className="image-features"><img src = "/images/ai.png" alt="ai" className="img-fluid"/></div>
                <div className="image-features"><img src = "/images/chart.jpg" alt="chart" className="img-fluid"/></div>
                <div className="image-features"><img src = "/images/dynamic.jpg" alt="dynamic" className="img-fluid"/></div>
                <div className = "key-features">
                   <span className="word-info"><b> AI - Powered </b></span>
                   <span className="word-info"><b> Live Graphs </b></span>
                   <span className="word-info"><b> Dynamic Rates </b></span>
                </div>
                <div className = "heading-info">
                    Why WUForex?
                </div>
                <div className ="description-why-WUForex">
                There is an ever increasing number of liquidity providers these days. With so many available options for Forex exchange, 
                it often times becomes very difficult for the customer to choose the most optimum option to maximize their profit.  
                That's where WUForex Aggregator comes to rescue. WUForex Aggregator is an AI-powered engine that recommends customer with best 
                Liquidity Provider amongst various available options. It reduces your burden of going through multiple website and 
                comparing rates between various LPs.
                <br/>
                <br/>
                The website offers lot of interesting features like -
                <br/>
                <br/> 
                <ul>
                    <li>
                     <b>Candlestick Graph</b>:   This enables the user to visualize the extremities of particular forex pair at a particular interval.
                    </li>
                    <li>
                      <b>Pie-chart</b> :      To give a comparison on the number of times our prediction engine had recommended various LPs. 
                      This allows the customer to make an informed decision based on past performance of given LP.
                    </li>
                    <li>
                      <b>Data Analytics</b> :    This will constantly suggest customer of hottest currency pairs at that particular instance.
                    </li>
                </ul>
                <br/>
                
                We value your money as much as you do and hence we have ensured that we only bring the best and most trusted LPs to you.
                So leave your worries at bay and let us help you make your forex decision making much easier and wiser!
                <br/>
                </div>
                <div className = "heading-info">
                    Our Resources
                </div>
                <div className="image-logo"><img src = "/images/1.png" alt="oanda" className="img-fluid"/></div>
                <div className="image-logo"><img src = "/images/2.png" alt="octafx" className="img-fluid"/></div>
                <div className="image-logo"><img src = "/images/3.png" alt="pepperstone" className="img-fluid"/></div>
                <div className="image-logo"><img src = "/images/4.png" alt="fxpig" className="img-fluid"/></div>
                <div className="image-logo"><img src = "/images/5.png" alt="icm traders" className="img-fluid"/></div>
                <div className="image-logo"><img src = "/images/6.png" alt="iForex" className="img-fluid"/></div>
                <div className="image-logo"><img src = "/images/7.png" alt="trader market" className="img-fluid"/></div>
                <div className = "heading-info"> 
                    Created By
                </div>
                <div className="info-created-by">
                    WUForex Aggregator is created by Team G.A.P.S for the Western Union Techathon.
                </div>
            </div>
        </div>
    
    )
}

export default About         