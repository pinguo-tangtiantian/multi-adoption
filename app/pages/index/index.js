import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component{
    render() {
        return (
            <div>Page index</div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById("app")
);
