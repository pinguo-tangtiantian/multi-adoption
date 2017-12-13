import * as React from 'react';


export default class Input extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        const { item } = this.props;
        return(
            <div className="upload-item">
                <label>{item.item_name}:</label>
                <div className="check-div">
                {
                    item.options.map((option, index) => {
                        return (
                            <label key={option} className={`${index==0?"active":""}`}>
                                <input type="radio" name={item.name} data-index={index} />
                                {option}
                            </label>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}