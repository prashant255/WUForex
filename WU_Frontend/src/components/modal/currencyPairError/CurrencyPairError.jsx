import React, { Component } from 'react';
import Modal from 'react-modal'
import './CurrencyPairError.css'
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const CurrencyPairError = (props) =>
{
        return(
            <div className = "currency-pair-error-modal">
                <Modal  size = "lg" className = "modal-currency-error" isOpen = {props.currencyModalOpen} centered>
                    <div className = "oops">
                        <h1><b>OOPS</b></h1>
                    </div>
                    <div>
                        <img className = "oops-img" src="/images/exclaimation_mark.png" alt="oops"></img>
                    </div>
                    <p className="sorry-msg">Sorry for the inconvienience.</p>
                    <div className = "text-msg">
                        The currency pair selected is not available. We are trying to expand.
                    </div>
                    <Link to="/home"><Button variant = "secondary" size = "md" className="button-go-home">Go Back</Button></Link>
                </Modal>
            </div>
        )
}

export default CurrencyPairError  