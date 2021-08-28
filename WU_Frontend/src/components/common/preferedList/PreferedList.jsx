import React, { Component } from 'react';
import './PreferedList.css'
import {Major} from './Major'
import {Minor} from './Minor'

class PreferedList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            queryString: ''
        }
    }


    componentDidMount(){
        const queryString = window.location.href;
        this.setState({
            queryString
        })
        // console.log(queryString)
    }
    
    
    render() {
        return (
            <div>
                <div className="MainList">
                    <div className="HeadingList"> Major </div>
                    <div className="List">
                    {
                        Major.map((item) =>
                        <a href = {
                            (this.state.queryString.includes("home") ? 
                            "/home/main?currencyPair=" 
                            :
                            "/analytics/main?currencyPair=") 
                            + item.Currency1 + item.Currency2 }> <li key={ item._id }>{item.Currency1}-{item.Currency2}</li>
                        </a>                                 
                        )
                    }
                      {/*   <a href= {"/home/main?currencyPair="+ item.Currency1 + item.Currency2}>
                          <li key={ item._id }> {item.Currency1} - {item.Currency2}</li>
                      </a> */}
                    </div>
                </div>
                <div className="MainList">
                    <div className="HeadingList"> Minor </div>
                    <div className="List">
                    {
                    Minor.map((item) =>
                        <a href = {
                                (this.state.queryString.includes("home") ? 
                                "/home/main?currencyPair=" 
                                :
                                "/analytics/main?currencyPair=") 
                                + item.Currency1 + item.Currency2 }> <li key={ item._id }>{item.Currency1}-{item.Currency2}</li>
                            </a>)
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default PreferedList