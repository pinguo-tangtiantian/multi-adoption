import GAD from '../../../data/dictionary';
import * as React from 'react';

export default class Select extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            text: this.props.item.options[0]
        }
    }


    onSelectToggle = (e) => {
        this.props.onSelectToggle(e);
    }

    onSelectOption = (e) => {
        var value = e.target.getAttribute("data-value");
        this.setState(prevState => ({
            text: value
        }));
        this.props.onSelectToggle(e);
    }


    render() {
        const { item } = this.props;
        const { text } = this.state;
        // console.log(GAD[item.name][text])
        return (
            <div className="upload-item">
                <label>{item.item_name}:</label>
                <div className="select">
                    <div className="select-value"  data-name={item.name} onClick={this.onSelectToggle}>{text}<span className="triangle tri-down"></span></div>
                    <div className={`options-box ${this.props.showName == item.name?"":"hide"}`}>
                        {
                            item.options.map(option => {
                                return (
                                    <div 
                                    className={`option ${option == text? "selected": ""}`} 
                                    key={option} 
                                    data-value={option} 
                                    onClick={this.onSelectOption}
                                    >{option}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <input type="hidden" name={item.name} value={GAD[item.name][text]} />
            </div>
        )
    }
}