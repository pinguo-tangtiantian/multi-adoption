import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../../static/css/style.css';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="content">
                <div className="sign-box">
                <p className="sign-title">注 册</p>
                    <form className="sign-form" id="sign_up_form" name="sign_up_form" action="http://localhost:2333/signup" method="post">
                        <p>
                            {/* <label>昵称：</label> */}
                            <input type='text' name='username' placeholder='用户名' />
                        </p>
                        <p>
                            {/* <label>邮箱：</label> */}
                            <input type='text' name='email' placeholder='邮箱' />
                        </p>
                        <p>
                            {/* <label>手机号码：</label> */}
                            <input type='text' name='telephone' placeholder='手机号码' />
                        </p>
                        <p>
                            {/* <label>密码：</label> */}
                            <input type='password' name='password' placeholder='密码' />
                        </p>
                        <p>
                            {/* <label>确认密码：</label> */}
                            <input type='password' placeholder='确认密码' />
                        </p>
                        <p className="tips">已有账号？前去<a href='/login' className="highlight">登录</a></p>
                        <input type="submit" onSubmit={this.onFormSubmit} className="btn btn-lg" value="注册" />
                    </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <SignUpPage />,
    document.getElementById('app')
);
