import React, { Component } from 'react';
import "./PriceCalculator.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal'

class PriceCalculator extends Component{
    state = {
        isbuyselected: true,
        value: 0
    }

    handleChange = (e) => {
        let rate = this.state.isbuyselected?this.props.buyRate:this.props.sellRate
        this.setState({value: (rate * e.target.value).toFixed(5)});
    }

    handlesellstate = () => {
        this.setState({isbuyselected: false});
    }
    
    handlebuystate = () => {
        this.setState({isbuyselected: true});
    }

    render(){
        return(
            <Modal className = "modal-calculator" centered isOpen = {this.props.modalIsOpen} onRequestClose = {this.props.closeModal}>
                <fieldset>
                        <div className = "row">
                            <div className = "col-lg-12 ml-0 mr-0 mb -10 topButton">
                                <Button size = "md" variant="secondary" className="rates" onClick = {this.handlebuystate}>ASK</Button>
                                <Button size = "md" variant="secondary" className="rates" onClick = {this.handlesellstate}>BID</Button>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-lg-12 display-rate">
                                    <label> 
                                         { this.state.isbuyselected ? 
                                         <span><b>ASK: &nbsp;  { this.props.toCurrencySymbol }</b>{this.props.buyRate}</span> 
                                         :
                                         <span><b>BID: &nbsp; { this.props.toCurrencySymbol }</b> {this.props.sellRate}</span>}
                                    </label> 
                                <br/> 
                            </div>
                        </div>
                        <div className = "row input-level">     
                            <div className = "col-lg-2">             
                                <label className="size-label">Size:</label>
                            </div>
                            <div className = "col-lg-7">             
                                <input className = "input-box" type="number" onChange = {this.handleChange}></input>
                            </div>
                            <div className = "col-lg-2">             
                                <label className = "lots"> units</label>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-lg-6">
                                <label className = "valuation">Valuation:</label> 
                            </div>
                            <div className = "col-lg-6">
        <label className = "valuation-price"><b>{this.props.fromCurrencySymbol}</b>{this.state.value}</label>              
                            </div>
                        </div>
                        <div className = "row">
                            <br/>
                            <Button variant = "secondary" size = "md" className="button-close" onClick = {this.props.closeModal}>Close</Button>
                        </div>
                </fieldset> 
            </Modal> 
        )
    }
}

export default PriceCalculator  