import './Analytics.css';
import React, { Component } from 'react';
import PieChart from './piechart/PieChart';
import Navbar from '../common/navbar/Navbar';
import MultiLPChart from './multi-lpchart/MultiLPChart';
import PreferedList from '../common/preferedList/PreferedList';
import CurrencySearchBox from '../common/currencySearch/CurrencySearch';
import { CurrencyList } from '../common/currencySearch/search_bar/CurrencyList';
import { Html5Entities } from 'html-entities';
import axios from 'axios'
import CurrencyPairError from '../modal/currencyPairError/CurrencyPairError'

const htmlEntities = new Html5Entities();

class Analytics extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            isMarketOpen: true,
            fromCurrencySymbol: "",
            toCurrencySymbol: "",
            currencyPair: null,
            isLoading: true,
            modalIsOpen: false
         }
    }   

    checkCurrencyAvailable = (currencyPair) => {
        if(currencyPair === null || currencyPair === undefined)
            return
        let url = "http://localhost:8080/api/common/getAllDetails/" + currencyPair
        axios.get(url)
        .then(response => {
            this.setState({modalIsOpen: false})
        })
        .catch(error => {
            console.log(error)
            if(error.response !== undefined && error.response.status === 400)
                this.setState({modalIsOpen: true})
        });
    }


    componentDidMount() {
        this.setState({
            isLoading: true,
            redirect: false
        })
       
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const currencyPair = urlParams.get('currencyPair');
        
        if(currencyPair === undefined || (currencyPair !== null && currencyPair.length !== 6))
            this.setState({ redirect: true, currencyPair: null}) 
        else 
        {
            this.extractCurrencySymbol(currencyPair)
            this.setState({ currencyPair: currencyPair  })
            this.checkCurrencyAvailable(currencyPair)
        }

        if((new Date().getUTCDay() === 0 && new Date().getUTCHours() <= 22 ) || (new Date().getUTCDay() === 5 && new Date().getUTCHours() >= 21) || (new Date().getUTCDay() === 6))
                this.setState({ isMarketOpen: false })
            else
                this.setState({ isMarketOpen: true })
           
    }

    extractCurrencySymbol = (currencyPair) => {
        
        if(currencyPair!=null){
            var fromCurrency = currencyPair.substring(0,3)
            var toCurrency = currencyPair.substring(3,6)
        }
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

    render()
    {    
        return (
                <div className = "analytics">
                    <Navbar />
                    <CurrencyPairError currencyModalOpen = {this.state.modalIsOpen}/>
                    <div className = "row">
                        <div className="col-md-3 side-nav">
                            <center>
                                <CurrencySearchBox alignSearch="col"/>
                                <PreferedList/> 
                            </center>
                        </div>
                        {this.state.currencyPair === null ? 
                            <div className="display-cp-msg">
                                Please select currency pair !
                                <br/>
                                To view Analytics
                            </div>
                            :
                            <div className = "col-md-9 multi-lpchart">
                                <h1 className = "selected-pair-header">
                                {this.state.currencyPair.substring(0,3)} - {this.state.currencyPair.substring(3,6)}
                                </h1>
                                <div className = "display-market-status">
                                <label>  
                                    { this.state.isMarketOpen ? 
                                        <span className="text-success">
                                            <ion-icon name="ellipse-sharp" color="green"></ion-icon>&nbsp;
                                                <b>Market is open</b>
                                        </span> 
                                            :
                                        <span className="text-danger">
                                            <ion-icon name="ellipse-sharp" color="red"></ion-icon>&nbsp;
                                                <b>Market is closed</b>
                                        </span>
                                    }
                                </label>
                            </div>
                            <div>
                                    <MultiLPChart currencyPair = {this.state.currencyPair}/>
                                </div>
                                <div className = "pie-chart">
                                    <PieChart currencyPair = {this.state.currencyPair}/>
                                </div>
                            </div>
                        }
                    </div>                       
                </div>
        )
    }
}
export default Analytics     
