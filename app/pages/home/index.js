import * as React from 'react';
import * as ReactDOM from 'react-dom';

class HomePage extends React.Component{
    render() {
        return (
            <div className="content">
                <p>Welcome to home page!</p>
            </div>
        )
    }
}


ReactDOM.render(
    <HomePage />,
    document.getElementById("app")
);