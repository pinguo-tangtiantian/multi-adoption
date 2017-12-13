import * as React from 'react';
import { Router, Route, Link } from 'react-router-dom';


export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: [
                { name: '联系我们', route: "/guide" },
                { name: '隐私政策', route: "/home" },
                { name: '关于我们', route: "/cat_list" },
            ]

        }
    }

    render() {
        return (
            <ul role="nav" className="footer-list">
                {
                    this.state.menu.map((item) => {
                        return (
                            <li className="footer-item" key={item.name}>
                                <Link to={item.route} >{item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}