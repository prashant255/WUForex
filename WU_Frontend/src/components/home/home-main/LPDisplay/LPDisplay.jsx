import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LPDisplay.css'
import PriceCalculator from '../../../modal/PriceCalculator/PriceCalculator';
import ViewGraph from '../../../modal/viewGraph/ViewGraph';

class LPDisplay extends Component {

    state = {
        modalIsOpen: false,
        graphModalIsOpen: false,
        dps1: [],
        dps2: [],
        askSymbol: 0,
        bidSymbol: 0,
    }
    componentDidMount() {
        setInterval(this.handleAskBidSymbol, 5000);
    }

    handleAskBidSymbol = () => {
        const {rates} = this.props.displayRates
        if(this.props.prevDisplayRates !== null){
            const prevRates = this.props.prevDisplayRates.rates

            let askSymbol = 0, bidSymbol = 0
            if(parseFloat(rates.ask) > parseFloat(prevRates.ask))
                askSymbol = 1
            else if(parseFloat(rates.ask) < parseFloat(prevRates.ask))
                askSymbol = -1
             if(parseFloat(rates.bid) > parseFloat(prevRates.bid))
                bidSymbol = 1
            else if(parseFloat(rates.bid) < parseFloat(prevRates.bid))
                bidSymbol = -1
            this.setState({
                askSymbol,
                bidSymbol
            })
        }
    }
    
    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    }
    handleGraphClick = () => {
        this.setState({
            graphModalIsOpen: !this.state.graphModalIsOpen})
        this.setState({
            dps1: [],
            dps2: []
        })
    }

    render() {

        const {rates, lpDetails, highLowRates} = this.props.displayRates
        const {askSymbol, bidSymbol} = this.state
        return (
            <div className = "container mt-5">
                <div className = "card-lp">
                    <div className = "row">
                        <div className = "col-md-3">
                            {   console.log(this.props.recommended_id) }
                            {   this.props.recommended_id === lpDetails.id  ?
                            <div className = "recommended">
                                    Recommended
                            </div>
                            : 
                            null
                            }
                         <a href = {lpDetails.LPUrl}><img src={"/images/"+lpDetails.id+".png"} alt = {lpDetails.LPName} className="lp-img"/></a>
                        </div> 
                        <div className = "col-md-3">
                            <div className = "ask-bid">
                            <h3><b>Ask:</b> {rates.ask} &nbsp;
                            {askSymbol === 1?
                            <i className="fas fa-caret-up price-up"></i>
                            :
                            askSymbol === -1?
                            <i className="fas fa-caret-down price-down"></i>
                            :
                            null
                            }</h3><br />
                            <h3><b>Bid:</b> {rates.bid} &nbsp;
                            {bidSymbol === 1?
                            <i className="fas fa-caret-up price-up"></i>
                            :
                            bidSymbol === -1?
                            <i className="fas fa-caret-down price-down"></i>
                            :
                            null
                            }</h3><br />
                                <h3><b>Open:</b> {rates.open} </h3><br />
                            </div>
                        </div>
                        <div className = "col-md-3 display-rates">
                            <h5><i>Daily:</i></h5>
                            <h5 className = "high"><b>High:  &nbsp;&nbsp;</b> {highLowRates.dailyHigh} </h5>
                        <h5 className = "low"><b>Low: &nbsp;&nbsp;&nbsp;</b> {highLowRates.dailyLow} </h5>
                            <br />
                            <h5><i>Weekly:</i></h5>
                            <h5 className = "high"><b>High:   &nbsp;&nbsp;</b> {highLowRates.weeklyHigh} </h5>
                        <h5 className = "low"><b>Low: &nbsp;&nbsp;&nbsp;</b> {highLowRates.dailyHigh} </h5>
                    
                        </div>
                        <div className = "col-md-3 modal-links">
                            {/* button to view Graph and open the Graph modal */}
                            <Button className="btn btn-secondary" onClick = {this.handleGraphClick}><ion-icon name="bar-chart-outline"></ion-icon>&nbsp; View Graph </Button>
                            <ViewGraph 
                                graphModalIsOpen = {this.state.graphModalIsOpen} 
                                closeModal = {this.handleGraphClick} 
                                ask = {rates.ask}
                                bid = {rates.bid}
                                dps1 = {this.state.dps1}
                                dps2 = {this.state.dps2}
                                currencyPair = {this.props.currencyPair}                                 
                                lpId = {this.props.displayRates.lpDetails.id}
                            />

                              {/* button to view calculator and open the calculator modal   */}
                            <Button className="btn btn-secondary" onClick = {this.handleClick}><i className="fa fa-calculator"/>&nbsp; Price Calculator</Button>
                            <PriceCalculator 
                                modalIsOpen = {this.state.modalIsOpen} 
                                closeModal = {this.handleClick} 
                                buyRate= {rates.ask} 
                                sellRate = {rates.bid}
                                currencyPair = {this.props.currencyPair} 
                                fromCurrencySymbol = {this.props.fromCurrencySymbol}
                                toCurrencySymbol = {this.props.toCurrencySymbol}
                            />   
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default LPDisplay         