import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import SearchBar from './search_bar/SearchBar';
import './CurrencySearch.css'
import { Redirect } from 'react-router-dom';
class CurrencySearchBox extends Component {
    
    constructor(props) {
        super(props);
        this.setToCurrency = this.setToCurrency.bind(this)
        this.setFromCurrency = this.setFromCurrency.bind(this)
        this.handleReverseClick = this.handleReverseClick.bind(this)
        this.state = {
            toCurrency: {},
            fromCurrency: {},
            currencyErrorFrom : '',
            currencyErrorTo : '',
            error: true,
            queryString: ''
        }
    }

    componentDidMount(){
        const queryString = window.location.href;
        this.setState({
            queryString
        })
    }

    validate = () => {
        let error = false;
        if(this.state.fromCurrency === this.state.toCurrency)
            error = true;
        if(Object.keys(this.state.fromCurrency).length === 0)
            error = true;        
        if(Object.keys(this.state.toCurrency).length === 0)
            error = true;
        if(!error)
        {
            this.setState({
                error: false
            })
        }   

    }

    setToCurrency = (value) => {
        this.setState({
            toCurrency: value
        })

        setTimeout(() => {
            this.validate()
        }, 500);
    }

    setFromCurrency = (value) => {
        this.setState({
            fromCurrency: value
        })

        setTimeout(() => {
            this.validate()
        }, 500);
    }

    handleReverseClick = () => {
        const {toCurrency, fromCurrency} = this.state
        let temp = toCurrency
        this.setState ({
            toCurrency: fromCurrency,
            fromCurrency: temp
        })
    }

    render() {

        const {toCurrency, fromCurrency, error, queryString} = this.state
        
        return (
            <div className = "container">   
                <div className = {this.props.alignSearch === "row" ? "row" : null}>
                    <div className={this.props.alignSearch === "row" ? "card card-searchBox col-md-4 ml=0": "card card-searchBox row ml-0"}>
                        <SearchBar 
                            setCurrency = { this.setFromCurrency } 
                            Holder={"Convert From"} 
                            inputType = {"From"}
                            setCurrencyName = {fromCurrency.currencyName}
                        />
                        {this.state.currencyErrorFrom ? <div className="validateButton">{this.state.currencyErrorFrom}</div> : null}    
                    </div>
                    <div className={this.props.alignSearch === "row"? "col-md-1":"row"}>
                        <div className={this.props.alignSearch === "row" ? "reverse-icon" : "reverse-icon-main"}>
                            <ion-icon name={this.props.alignSearch === "row"? "swap-horizontal-outline":"swap-vertical-outline"} onClick = {this.handleReverseClick} title="Reverse"></ion-icon>
                        </div>
                    </div>
                    <div className={this.props.alignSearch === "row" ? "card card-searchBox col-md-4 ml=0": "card card-searchBox row ml-0"}>
                        <SearchBar 
                            setCurrency = { this.setToCurrency } 
                            Holder={"Convert To"} 
                            inputType = {"To"} 
                            setCurrencyName = {toCurrency.currencyName}
                        />
                        {this.state.currencyErrorTo ? <div className="validateButton">{this.state.currencyErrorTo}</div> : null}
                    </div>
                    <div>
                    {   error ?  
                        <Button 
                             disabled
                             className = {this.props.alignSearch === "row" ? "SearchButton": "SearchButton-main"}
                             variant = "secondary"     
                        >
                            Search
                        </Button> 
                                :
                      <a href = {(queryString.includes("analytics")?"/analytics/main?currencyPair=":"/home/main?currencyPair=") + fromCurrency.code + toCurrency.code }>  <Button 
                             className = {this.props.alignSearch === "row" ? "SearchButton": "SearchButton-main"}
                             variant = "secondary"
                        >
                            Search
                        </Button> </a>
                    }  
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrencySearchBox;