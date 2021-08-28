import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import './Navbar.css'
import TitleWU from '../title/TitleWU';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    state  = {
        clicked: false
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className = {this.props.isLandingPage ? "navbar-item-home" : "navbar-item" }> 
                <div className= {this.props.isLandingPage? "navbar-logo hide-title": "navbar-logo"}><Link to = "/home" className = "title-link"><TitleWU fontSize="title-main-md"/></Link></div>
                <div className = "menu-icon" onClick ={this.handleClick}>
                    <i className = {this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key = {index}>
                                <NavLink to={item.url} className= {this.props.isLandingPage ? 'nav-links' : 'nav-links-general'} activeClassName = "nav-links-active">{item.title}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar