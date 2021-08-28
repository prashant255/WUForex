import React, { Component } from 'react';
import CanvasJSReact from '../../canvas/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var xVal = new Date()
var updateInterval = 5000
var dps1=[], dps2=[], dps3=[], dps4=[], dps5=[], dps6=[], dps7 =[]

class MultiLPBuyChart extends Component {
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
        let {response, ask} = this.props
        if(response !== undefined && response.length > 0){
            xVal = new Date()
            dps1.push({x: xVal, y: response[0].ask})
            dps2.push({x: xVal, y: response[1].ask})
            dps3.push({x: xVal, y: response[2].ask})
            dps4.push({x: xVal, y: response[3].ask})
            dps5.push({x: xVal, y: response[4].ask})
            dps6.push({x: xVal, y: parseFloat(response[5].ask)})
            dps7.push({x: xVal, y: response[6].ask})
        }
        if(this.chart !== undefined)
		    this.chart.render()
        
    }
    
	render() {
		const options = {
			zoomEnabled: true,
            animationEnabled: true,
			title :{
				text: "ASK rates of Liquidity Providers"
            },
            subtitles: [{
                text: this.props.currencyPair.substring(0,3) + " - " + this.props.currencyPair.substring(3,6)
              }],
            axisY: {
                prefix: "",
                title: "Forex Rates",
                stripLines: [{
                  showOnTop: true,
                  lineDashType: "dash",
                  color: "#ff4949",
                  labelFontColor: "#ff4949",
                  labelFontSize: 14
                }]
              },
            toolTip: {
                shared: true,
            },
            legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 18,
				fontColor: "dimGrey",
            },
			data: [{
				type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "#,###.######",
                name:"Oanda",
                showInLegend: true,
                dataPoints : dps1
            },
            {
                type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "#,###.######",
                name:"OctaFX",
                showInLegend: true,
                dataPoints: dps2
            },
            {
                type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "#,###.######",
                name:"Perpperstone",
                showInLegend: true,
                dataPoints: dps3
            }, {
                type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "#,###.######",
                name:"Fxpig",
                showInLegend: true,
                dataPoints: dps4
            }, {
                type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "#,###.######",
                name:"ICM Traders",
                showInLegend: true,
                dataPoints: dps5
            }, {
                type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "#,###.######",
                name:"iForex",
                showInLegend: true,
                dataPoints: dps6
            }, {
                type: "line",
                xValueFormatString: "MMM DD, YYYY HH:mm:ss",
                xValueType: "dateTime",
                yValueFormatString: "#,###.######",
                name:"Trader Made",
                showInLegend: true,
                dataPoints: dps7
            }
            ]
        }
        const containerProps = {
            width: "100%",
            height: "590px",
          };
		return (
		<div>
            <CanvasJSChart options = {options} 
				 containerProps={containerProps}
				 onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
}
 export default MultiLPBuyChart                         