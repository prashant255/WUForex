import React, { Component } from 'react';
import CurrencySearchBox from '../../common/currencySearch/CurrencySearch';
import  Navbar  from '../../common/navbar/Navbar';
import PreferedList from '../../common/preferedList/PreferedList';
import './Home-main.css';
import LPDisplay from './LPDisplay/LPDisplay'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import CurrencyPairError from '../../modal/currencyPairError/CurrencyPairError';
import { CurrencyList } from '../../common/currencySearch/search_bar/CurrencyList';
import { Html5Entities } from 'html-entities';

const htmlEntities = new Html5Entities();

class HomeMain extends Component {
    
    constructor(props){
        super(props)
        this.state = {
        redirect: false,
        modalIsOpen: false,
        isMarketOpen: true,
        recommended_id: 6,
        fromCurrencySymbol: "",
        toCurrencySymbol: "",
          displayRates: [],
          prevDisplayRates: [],
          currencyPair: null,
          isLoading: true
        }
    }   

    search = (lpid, myArray) => {
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].lpDetails.id === lpid) 
                return myArray[i];
        }
        return null
    }
    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    }

    callData = (currencyPair) => {
        if(currencyPair === undefined)
            return
        let url = "http://localhost:8080/api/common/getAllDetails/" + currencyPair
        axios.get(url)
        .then(response => {
            this.setState(
                prevState => {
                    return {
                        modalIsOpen: false,
                        isLoading: false,
                        prevDisplayRates: prevState.displayRates,
                        displayRates: response.data
                    };
                  }
                )
            if(response.data !== undefined)
                  this.setState({
                      recommended_id: response.data[0].lpDetails.id
                  })
        })
        .catch(error => {
            console.log(error)
            if(error.response !== undefined && error.response.status === 400)
                this.setState({modalIsOpen: true})
        });
    }

    extractCurrencySymbol = (currencyPair) => {
        
        var fromCurrency = currencyPair.substring(0,3)
        var toCurrency = currencyPair.substring(3,6)
        
        for(let i=0; i<CurrencyList.length; i++)
        {
            if(fromCurrency === CurrencyList[i].code)
            {
                this.setState({
                    fromCurrencySymbol: htmlEntities.decode(CurrencyList[i].symbol)
                }) 
                
            }
            if(toCurrency === CurrencyList[i].code)
            {
                this.setState({
                    toCurrencySymbol: htmlEntities.decode(CurrencyList[i].symbol)
                }) 
            }
        }
    }
    
    componentDidMount() {
            this.setState({
                isLoading: true,
                redirect: false
            })
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const currencyPair = urlParams.get('currencyPair');
            if(currencyPair === null || currencyPair === undefined || currencyPair.length !== 6)
                this.setState({ redirect: true }) 
            else 
            {
                this.extractCurrencySymbol(currencyPair)
                this.setState({ currencyPair: currencyPair  })
            }

            this.callData(currencyPair)
            setInterval(() => {
                this.callData(currencyPair)
            }, 5000)
        
            if((new Date().getUTCDay() === 0 && new Date().getUTCHours() <= 22 ) || (new Date().getUTCDay() === 5 && new Date().getUTCHours() >= 21) || (new Date().getUTCDay() === 6))
                this.setState({ isMarketOpen: false })
            else
                this.setState({ isMarketOpen: true })
           
            
    }
    
    render() {
        if (this.state.redirect){
            return <Redirect to = "/home"/>;
        }
        const {displayRates, prevDisplayRates, currencyPair} = this.state
        return (
            <div>
                <Navbar Page = {false}/>
                <CurrencyPairError currencyModalOpen = {this.state.modalIsOpen}/>
                <div className = "row">
                    <div className="col-md-3 side-nav">
                        <center>
                            <CurrencySearchBox alignSearch="col"/>
                            <PreferedList/>
                        </center>
                    </div>
                    
                    <div className = "col-md-9 increase-length">
                        { currencyPair != null? 
                            <h1 className = "selected-pair-header">
                                {currencyPair.substring(0,3)} - {currencyPair.substring(3,6)}
                            </h1>
                            :
                            null
                        }
                        <div className = "display-market-status">
                           <label>  
                               { this.state.isMarketOpen ? 
                                    <span class="text-success">
                                        <ion-icon name="ellipse-sharp" color="green"></ion-icon>&nbsp;
                                            <b>Market is open</b>
                                    </span> 
                                        :
                                    <span class="text-danger">
                                        <ion-icon name="ellipse-sharp" color="red"></ion-icon>&nbsp;
                                            <b>Market is closed</b>
                                    </span>
                                }
                            </label>
                        </div>
                        {this.state.isLoading? <div className = "spinner-border text-primary spinner-style"></div>: null}
                        {displayRates.map((singleLpRates) => {
                            return <LPDisplay 
                                        currencyPair = {currencyPair} 
                                        displayRates = {singleLpRates} 
                                        prevDisplayRates = {this.search(singleLpRates.lpDetails.id, prevDisplayRates)}
                                        fromCurrencySymbol = {this.state.fromCurrencySymbol}
                                        toCurrencySymbol = {this.state.toCurrencySymbol}
                                        recommended_id = {this.state.recommended_id}
                                    />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeMain         