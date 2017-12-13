import * as React from 'react';



class Navigator extends React.Component{
    constructor(props) {
        super(props);
        this.onMenuToggle = this.onMenuToggle.bind(this);
        this.state = {
            menu: [
                { name: '引导页', route: "/guide" },
                { name: '首页', route: "/home" },
                { name: '猫猫列表', route: "/cat_list" },
                { name: '狗狗列表', route: "/dog_list" },
                { name: '个人中心', route: "/user_center" },
                { name: '登录', route: "/login" },
                { name: '上传', route: "/upload" },
            ],
            isLogin: false,
            menuOn: false
        }
    }

    onMenuToggle() {
        this.setState(prevState=>({
            menuOn: !prevState.menuOn
        }), ()=>{
            console.log(this.state.menuOn)
        })
    }


    render() {
        console.log(document.cookie)
        const { isLogin, menu, menuOn } = this.state;
        return (
            <div className="top-nav">
                <div className="menu-icon" onClick={this.onMenuToggle}></div>
                <div className={`menu-box ${menuOn ? "show" : "hide"}`}>
                    <div className="menu-mask" onClick={this.onMenuToggle}></div>
                    <div className="menu-list">
                        <div className="user-info">

                        </div>
                        {
                            menu.map((item) => {
                                return (
                                    <p className="menu-item" key={item.name} onClick={this.onMenuToggle}>
                                        <a href={item.route} >{item.name}</a>
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="slogan">Take me home</div>
                {
                    isLogin ?
                        <div className="user-avator">Tritty</div> :
                        <div className="user-avator">
                            <a href="/logout" className="user-icon">
                            </a>
                        </div>
                }

            </div>
        )
    }
}

export default Navigator;
