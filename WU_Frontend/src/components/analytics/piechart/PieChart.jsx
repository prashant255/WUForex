import React, { Component } from 'react';
import CanvasJSReact from '../../canvas/canvasjs.react';
import axios from 'axios'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {

	constructor() {
		super();
		this.state = {
			dataPoints: []
		}
	}

	componentDidMount() {
		let url = "http://localhost:8080/api/common/predCount/" + this.props.currencyPair
		axios.get(url)
        .then(response => {
			this.setState({
				dataPoints: response.data
			})
        })
        .catch(error => {
            console.log(error)
        });
	}
	render()
    {    
        const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", 
			title:{
				text: "Freq. of Recommended LPs"
			},
			data: [{
                type: "pie",
                showInLegend: true,
				legendText: "{label}",
				indexLabel: "#percent%",
				percentFormatString: "#0.##",
				indexLabelPlacement: "inside",	
				toolTipContent: "{label} (#percent%)",
				dataPoints: this.state.dataPoints
			}]
		}
        return (
                    <div className = "piechart">
                        <CanvasJSChart options = {options}
                //  onRef={ref => this.chart = ref}
                        />
                        
                   </div>
        )
    }
}
export default PieChart      