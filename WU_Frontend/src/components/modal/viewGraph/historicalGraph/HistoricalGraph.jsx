import React, { Component } from 'react';
import CanvasJSReact from '../../../canvas/canvasjs.stock.react';
import "./HistoricalGraph.css";
import 'bootstrap/dist/css/bootstrap.min.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class HistoricalGraph extends Component {

    constructor(props) {
        super(props);
        this.state = { dataPoints: [], isLoaded: false };
    }
     
    componentDidMount() {
      let url = "http://localhost:8080/api/common/historicalData/" + this.props.lpId + "/" + this.props.currencyPair
      fetch(url)
          .then(res => res.json())
          .then(
            (data) => {
              var dps1 = [];
              for (var i = 0; i < data.length; i++) {
                dps1.push({
                  x: new Date(data[i].timestamp * 1000),
                  y: [
                    Number(data[i].open),
                    Number(data[i].high),
                    Number(data[i].low),
                    Number(data[i].close)
                  ]
                });
              }
              this.setState({
                isLoaded: true,
                dataPoints: dps1
              });
            }
          )
      }
     

    render(){
        const options = {
            theme: "light2",
            title:{
              text:"WUForex Chart"
            },
            subtitles: [{
              text:  (this.props.currencyPair.substring(0,3) + " - " + this.props.currencyPair.substring(3,6)  + " trend")
            }],
            charts: 
                [{
                    axisY: {        
                      prefix: "$"
                    },
                    data: [{
                      type: "candlestick",
                      yValueFormatString: "$#,###.##",
                      dataPoints : this.state.dataPoints
                    }]
                }],
                rangeSelector: {
                  enabled: true,
                  inputFields: {
                    startValue: new Date(2020, 11, 10),
                    endValue: new Date(2015, 11, 23)
                  },
                  buttons: [
                  {
                    range: 1, 
                    rangeType: "hour",
                    label: "1hr"
                  },{            
                    range: 1,
                    rangeType: "day",
                    label: "1day"
                  },
                  {
                    range: 1,
                    rangeType: "week",
                    label: "1week"
                  },
                  {
                    range: 1,
                    rangeType: "month",
                    label: "1month"
                  },{            
                    rangeType: "all",
                    label: "All" 
                    
                  }]
                }
            }
          const containerProps = {
            width: "100%",
            height: "90%",
          };

           return (
                <div className = "historical-graph">
                       {                        
                            this.state.isLoaded && 
                            <CanvasJSStockChart containerProps={containerProps} options = {options}
                            /* onRef = {ref => this.chart = ref} */
                            />
                        }
                        
                </div>
        )
    }
   
}
export default HistoricalGraph       
     
