import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Navigator from '../../components/top_nav';

import '../../static/css/style.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Navigator />
                <div className="content">
                    <div className='sign-box'>
                        <p className="sign-title">登 录</p>
                        <form className="sign-form" id="sign_in_form" method="post" action="http://localhost:2333/login">
                            <p>
                                {/* <label>邮箱：</label> */}
                                <input type='text' name="email" placeholder='邮箱' />
                            </p>
                            <p>
                                {/* <label>密码：</label> */}
                                <input type='password' name="password" placeholder='密码' />
                            </p>
                            <p className="tips">还没有账号？前去<a className="highlight" href='/signup'>注册</a>

                                <span>
                                    <input type="radio" name='remember' />
                                    <label>记住我</label>
                                </span>
                            </p>
                            <p><span className="highlight float-right">忘记密码？</span></p>

                            <input type="submit" className="btn btn-lg" value="登录" />
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}



ReactDOM.render(
    <LoginPage />,
    document.getElementById("app")
);
