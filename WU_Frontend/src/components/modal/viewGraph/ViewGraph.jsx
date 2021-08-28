import React, { Component } from 'react';
import Modal from 'react-modal'
import Button from 'react-bootstrap/Button';
import "./ViewGraph.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HistoricalGraph from './historicalGraph/HistoricalGraph';
import LiveGraph from './liveGraph/LiveGraph';


class ViewGraph extends Component {
    state = {
    historicalGraphSelected: true
}

handleLiveGraphSelected = () => {
    this.setState({historicalGraphSelected: false});
}
handleHistoricalGraphSelected = () => {
  this.setState({historicalGraphSelected: true});
}

    render(){
        return (
                <div>
                    <Modal className = "modal-graph" centered isOpen = {this.props.graphModalIsOpen} onRequestClose = {this.props.closeModal}>
                        <div className = "button-graph-div">
                        <Button className="btn btn-secondary button-graph" size = "lg" onClick = {this.handleLiveGraphSelected}>Live Graph</Button>
                        <Button className="btn btn-secondary button-graph" size = "lg"onClick = {this.handleHistoricalGraphSelected}>Historical Graph </Button>
                        </div>
                        <div className = "display-graph">
                            { this.state.historicalGraphSelected ? 
                                <HistoricalGraph currencyPair = {this.props.currencyPair} lpId = {this.props.lpId}/> 
                                :
                                <LiveGraph ask = {this.props.ask} bid = {this.props.bid} currencyPair = {this.props.currencyPair} dps1 = {this.props.dps1} dps2 = {this.props.dps2} /> 
                            }
                        </div> 
                        <div className="row">
                        <Button variant = "secondary" size = "md" className="button-closed" onClick = {this.props.closeModal}>Close</Button>
                        </div>
                    </Modal>
                </div>
        )
    }
   
}
export default ViewGraph       
