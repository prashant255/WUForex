import React, { Component } from 'react';
import './SearchBar.css';
import { CurrencyList } from './CurrencyList';
import 'bootstrap/dist/css/bootstrap.min.css';

class SearchBar extends Component {
        
    constructor(props){
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
          cursor: 0,
          suggestions: [],
          text: '',
          inputFocus: false,
        }
    }   

    handleKeyDown(e) {
        const { cursor, suggestions } = this.state
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
          this.setState( prevState => ({
            cursor: prevState.cursor - 1
          }))
        } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
          this.setState( prevState => ({
            cursor: prevState.cursor + 1
          }))
        } else if (e.keyCode === 13) {
            this.suggestionSelected(suggestions[cursor]);
        }
    }

    onTextChanged = (e) =>{
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0)
        {
            try{
                const regex = new RegExp(`${value}`,'i', 'g');
                suggestions = CurrencyList.sort().filter(v => regex.test(v.currencyName +" "+ v.code));
            }catch(e) {
                suggestions = []
            }
        }
        this.setState(() => ({suggestions, text : value, cursor: 0}));
    }

    renderSuggestions = () => {
        const {suggestions,cursor, text} = this.state;
        if(suggestions.length === 0){
            if(text.length === 0)
                return null;
        }
        return(
            <ul>
                {suggestions.map((item, i) => <li onClick = {() => this.suggestionSelected(item)} key={ item._id } className={cursor === i ? 'li-list-active' : 'li-list'}>{item.currencyName + " (" + item.code + ")"}</li>)}
            </ul>
        )
    }


    suggestionSelected = (value) => {
        this.setState(() => ({
            text : value.currencyName + " (" +value.code + ")",
            suggestions : [],
            inputFocus: false
        }))
        this.props.setCurrency(value)
    }

    handleFocus = () => {

        let value = []
        this.props.setCurrency('')
        if(!this.state.inputFocus)
            value = CurrencyList
        this.setState({inputFocus: !this.state.inputFocus, suggestions: value})
    }

    render() {
            return (

                <div className="col-md-12 text-field">
                        <div className = "task-title">
                                {this.props.inputType}
                        </div>
                        <div className="convert-box">
                            <div className = "search-box">
                                <input className="search-txt" 
                                    onClick = {this.handleFocus} 
                                    onKeyDown={ this.handleKeyDown } 
                                    onChange = {this.onTextChanged}  
                                    value={this.props.setCurrencyName} type="text" 
                                    placeholder= {this.props.Holder}
                                />
                                <a className="search-btn" href="#">
                                    <ion-icon name="search-outline"></ion-icon>
                                </a> 
                                {this.renderSuggestions()}
                            </div>
                        </div>
                    </div>        
            )
    }
}

export default SearchBar;