import * as React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:2333";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class SignBox extends React.Component {
    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    onSignIn() {
        event.preventDefault();
        const dom = document.getElementById("sign_in_form");
        const formdata = new FormData(dom);
        
        axios.post('/users/sign_in', formdata)
        .then((res) => {
            console.log(res);
        })
        .catch((res)=>{
            throw res;
        });
    }

    

    render() {
        const { signType } = this.props;
        return (
            <div className="content">
                <div className={`sign-box ${signType == 'find_pwd' ? "" : "hide"}`}>
                <p className="sign-title">找回密码</p>
                    <form className="sign-form" id="find_pwd_form">
                        <p className="tips">我们将会发送一份邮件到您的邮箱，<br />请注意查收</p>
                        <p>
                            {/* <label>邮箱：</label> */}
                            <input type='text' name="email" id="change_email" placeholder='请输入注册邮箱' />
                        </p>
                    </form>
                    <input type="button" className="btn btn-lg" onClick={this.onSendApply} value="找回密码" />
                </div>


                <div className={`sign-box ${signType == 'sign_in' ? "" : "hide"}`}>
                    <p className="sign-title">登 录</p>
                    <form className="sign-form" id="sign_in_form" encType="multipart/form-data">
                        <p>
                            {/* <label>邮箱：</label> */}
                            <input type='text' name="email" placeholder='邮箱' />
                        </p>
                        <p>
                            {/* <label>密码：</label> */}
                            <input type='password' name="password" placeholder='密码' />
                        </p>
                        <p className="tips">
                            还没有账号？前去
                    <span className="highlight" onClick={()=>this.props.onChangeSignType("sign_up")}>注册</span>
                            <span className="highlight float-right" onClick={()=>this.props.onChangeSignType("find_pwd")}>忘记密码？</span>
                        </p>

                        <input type="button" className="btn btn-lg" onClick={this.onSignIn} value="登录" />
                    </form>
                </div>

                <div className={`sign-box ${signType == 'sign_up' ? "" : "hide"}`}>
                <p className="sign-title">注 册</p>
                    <form className="sign-form" id="sign_up_form" encType="multipart/form-data" name="sign_up_form">
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
                        <p className="tips">已有账号？前去<span className="highlight" onClick={()=>this.props.onChangeSignType("sign_in")}>登录</span></p>
                        <input type="button" className="btn btn-lg" onClick={this.onSignUp} value="注册" />
                    </form>
                </div>

            </div>
        )
    }
}


export default SignBox;