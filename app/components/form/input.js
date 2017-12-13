import * as React from 'react';

export default class Input extends React.Component{
    constructor(props){
        super(props);
    }

    onInputFocus = (e) => {
        this.props.onSelectToggle(e);
    }

    render() {
        const { item } = this.props;
        return(
            <div className="upload-item">
                <label>{item.item_name}:</label>
                <input name={item.name} onFocus={this.onInputFocus} type="text" placeholder={item.placeholder} />
            </div>
        )
    }
}