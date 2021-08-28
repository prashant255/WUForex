import React, { Component } from 'react';
import CanvasJSReact from '../../../canvas/canvasjs.react';
import "./LiveGraph.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var xVal = new Date();
var yVal1, yVal2;
var updateInterval = 5000;

class LiveGraph extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
        xVal = new Date();
		this.updateChart();
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
        var { dps1, dps2 } = this.props
        yVal1 = parseFloat(this.props.ask);
        yVal2 = parseFloat(this.props.bid);
        console.log(yVal1, yVal2)
        xVal = new Date()
        dps1.push({x: xVal, y: yVal1});
        dps2.push({x: xVal, y: yVal2});
		// if (dps1.length >  20  || dps2.length > 20) {
        //     dps1.shift();
        //     dps2.shift();
        // }
        if(this.chart !== undefined)
        {
		    this.chart.render()
        }
    }
    
    render() 
    {
        const options = {
            zoomEnabled: true,
            theme: "light2",
            title:{
              text:"WUForex Aggregator"
            },
            subtitles: [{
                text: this.props.currencyPair.substring(0,3) + " - " + this.props.currencyPair.substring(3,6) + "trend"
            }],
            axisY: {        
                prefix: "",
                stripLines: [{
                  showOnTop: true,
                  lineDashType: "dash",
                  color: "#ff4949",
                  labelFontColor: "#ff4949",
                  labelFontSize: 14
                }]
            },
            data: [{
				type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "JPY #,###.######",
                name:"Ask rates",
                showInLegend: true,
                dataPoints : this.props.dps1
            },
            {
                type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "JPY #,###.######",
                name:"Bid rates",
                showInLegend: true,
                dataPoints: this.props.dps2
            }
            ],
            legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 18,
				fontColor: "dimGrey",
            },
            rangeSelector: {
                enabled: true,
                inputFields: {
                    startValue: new Date(2020, 11, 24),
                    endValue: new Date(2020,11,25)
                }
                }  
            }

        const containerProps = {
            width: "100%",
            height: "625px",
          };
		return (
		<div className = "live-graph">
            <CanvasJSChart options = {options} 
				 containerProps={containerProps}
				 onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
}
 export default LiveGraph                     