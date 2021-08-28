import React from 'react';
import './TitleWU.css';

const TitleWU = (props) => {

  return (
   <div className = {props.fontSize === undefined ? "title-main" : props.fontSize }>
    <span className = "WU"> WU</span>
    <span className = "Forex">Forex</span>     
   </div>
  )

}

export default TitleWU;