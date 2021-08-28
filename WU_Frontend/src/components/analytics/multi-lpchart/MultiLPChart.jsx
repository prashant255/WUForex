import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiLPBuyChart from '../../common/mulltiLPBuyChart/MultiLPBuyChart.jsx'
import MultiLPSellChart from '../../common/multiLPSellChart/MultiLPSellChart.jsx'
import  './MultiLPChart.css';
import axios from 'axios'

class MultiLPChart extends Component {
    state = {
        isbuyselected: true,
        response: []
    }

    componentDidMount() {
		this.getValue();
		setInterval(this.getValue, 5000);
    }

	getValue = () => {
        let url = "http://localhost:8080/api/common/analytics/" + this.props.currencyPair
        axios.get(url)
        .then(response => {
            this.setState({
                response : response.data
            })
        })   
    }

    handlesellstate = () => {
        this.setState({isbuyselected: false});
    }
    handlebuystate = () => {
        this.setState({isbuyselected: true});
    }

    render()
    {    
        return (
                    <div className = "multi-lpchart">
                        <div className = "row-btn">
                            <div className = "btn-ask-bid">
                                <Button size = "lg" variant="secondary" className="rates-graph" onClick = {this.handlebuystate}>ASK</Button>
                                <Button size = "lg" variant="secondary" className="rates-graph" onClick = {this.handlesellstate}>BID</Button>
                            </div>
                        </div>
                        <div>
                         { this.state.isbuyselected ? <MultiLPBuyChart 
                            response = {this.state.response}
                            currencyPair = {this.props.currencyPair}
                            /> 
                            : 
                            <MultiLPSellChart 
                            response = {this.state.response}
                            currencyPair = {this.props.currencyPair}
                            />
                        }
                        </div>
                       
                        
                        {/* <CanvasJSChart options = {options}
                //  onRef={ref => this.chart = ref}
                        /> */}
                        
                   </div>
        )
    }
}
export default MultiLPChart  