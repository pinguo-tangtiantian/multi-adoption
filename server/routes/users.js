
var express = require('express');
const crypto = require('crypto');

var transporter = require('../util/nodemailer');
var upload = require('../util/multer');
var sqldb = require('../util/mysql');

var Common = require('../common');

var router = express.Router();


/**
 * 注册
 */
router.post('/sign_up', upload.array(), function (req, res, next) {
    var user = req.body;
    var token = Common.randomWord(8, 15);   //激活码
    var email = user.email;     //注册邮箱
    var name = user.username;   //用户名
    var pwd = user.password;     //密码
    var hash = hashUserInfo(email, pwd);    //加密
    console.log(user)
    var activationUrl = 'http://127.0.0.1:3001/users/activate?email=' + email + '&token=' + token;
    var sql = 'INSERT INTO user_info ( username, email, telephone, password, hash, cd_key) VALUES("' + name + '", "' + email + '", "' + user.telephone + '", "' + pwd + '", "' + hash + '", "' + token + '");';

    sqldb.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err.message);
            return;
        }

        var mailOptions = {
            from: '798459906@qq.com',
            to: email,
            subject: '领养平台-请激活您的帐号',
            html: '<div>亲爱的: ' + name + '</div><br /><p>感谢您注册领养平台帐号，注册的最后一步，请通过下面链接完成帐号验证。即可开始体验blabla！</p><p>请<a href="' + activationUrl + '" target=_blank>点击这里</a>完成验证, 如果您无法点击此连接, 请手动拷贝下面链接地址到浏览器中:</p><p>' + activationUrl + '</p><p>如果您还有别的疑问或者不知道怎么办，请联系我:</p><p>新浪微博: @铲屎官Tritty</p><p>QQ号: 798459906</p><p>谢谢！</p>'
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(info);
        });
    });
});

/**
 * 激活
 */
router.get('/activate', upload.array(), function (req, res, next) {
    var params = req.query;
    var token = params.token;
    var email = params.email;

    var sql1 = 'SELECT * FROM user_info WHERE email="' + email + '";';
    sqldb.query(sql1, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send("激活失败！请前往邮箱确认激活链接~");
            return;
        }
        var activeCode = rows[0].cd_key;
        var activeStatus = rows[0].active;
        if (activeStatus == 1) {
            res.send("您的账号已成功激活，无需重复激活。您可前往登录页面登录您的账号~");
            return;
        } else {
            if (activeCode === token) {
                var time = new Date().getTime();
                var sql2 = 'UPDATE user_info SET active="1", last_login_time="' + time + '"WHERE email="' + email + '";';  //激活成功
                sqldb.query(sql2, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // res.setHeader("Set-Cookie", ["logStatus=0"]);
                    res.send("您已成功激活账号，前往登录页面进行登录");
                })
            } else {
                res.send("激活码错误，请前往邮箱确认激活链接~");
            }
        }
    })
});

/**
 * 登录
 */
router.post('/sign_in', upload.array(), function (req, res, next) {
    var user = req.body;
    var email = user.email;
    var pwd = user.password;


    var sql = 'SELECT * FROM user_info where email="' + email + '";';

    sqldb.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }

        if (rows || rows[0]) {    //用户存在
            if (rows[0].active == 0) {    //未激活
                res.send("您还未激活账号，请前往注册邮箱地激活。");
            } else {  //已激活
                var hash = hashUserInfo(email, pwd);
                console.log("login_email - " + email + " password - " + pwd + " hash - " + hash);

                if (checkUserInfo(rows[0], email, pwd)) { //账号、密码均正确
                    var lastLoginTime = rows[0].last_login_time;
                    var sql2 = 'UPDATE user_info SET last_login_time="' + new Date().getTime() + '" WHERE email="' + email + '";';
                    console.log("login ok, last - " + lastLoginTime);
                    sqldb.query(sql2, function (err, rows, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        res.cookie("account", { account: email, hash: hash, last: lastLoginTime, maxAge: 1000*60*60*48, httpOnly: false });
                        res.send('login success');
                        console.log("after redirect");
                    });
                } else {   //密码错误
                    console.log("password error");
                    res.render('login', { msg: "密码错误" });
                }
            }
        } else {  //未查询到该用户
            res.send("该用户不存在，请确认邮箱");
        }
    });
});


/**
 * 找回密码时发送邮件
 */
router.get('/change_pwd_apply', function (req, res, next) {
    var email = req.query.email;
    var time = new Date().getTime();
    console.log(req.headers)

    var sql1 = 'SELECT * FROM user_info where email="' + email + '";';
    sqldb.query(sql1, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        var name = rows[0].username;
        var token = Common.randomWord(8, 15);
        var sql2 = 'UPDATE user_info SET last_mdf_pwd="' + time + '" where email="' + email + '";';
        sqldb.query(sql2, function (err, rows, fields) {
            var url = 'http://127.0.0.1:3001/change_pwd?email=' + email + '&md_key=' + token;
            var mailOptions = {
                from: '798459906@qq.com',
                to: email,
                subject: '领养平台-找回密码',
                html: '<div>亲爱的: ' + name + '</div><br /><p>请通过下面链接修改密码，该链接在30分钟内有效。</p><p>请<a href="' + url + '" target=_blank>点击这里</a>完成验证, 如果您无法点击此连接, 请手动拷贝下面链接地址到浏览器中:</p><p>' + url + '</p><p>如果您还有别的疑问或者不知道怎么办，请联系我:</p><p>新浪微博: @铲屎官Tritty</p><p>QQ号: 798459906</p><p>谢谢！</p>'
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send(info);
            });

        });
    })

});



router.get('/change_pwd', function (req, res, next) {
    console.log(req.body)
    console.log(req.query)
    // var email = req.body.email;
    // var pwd = req.body.password;

    // var sql = 'UPDATE user_info set password="' + pwd + '"where email="' + email + '";';

    // sqldb.query(sql, function(err, rows, fields){
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }

    //     res.send("成功修改密码");
    // });

});




function hashUserInfo(email, pwd) {
    var hash = crypto.createHash("md5");
    hash.update(email + pwd);
    return hash.digest("hex");
}

function checkUserInfo(userInDb, email, hash) {
    var user = userInDb;
    if (hash = user.hash) {
        return true;
    } else {
        return false;
    }

}

function isLogedIn(req) {
    var cookies = req.headers.cookies;

    if (cookies["account"] != null) {
        var account = cookies["account"];
        var user = account.account;
        var hash = account.hash;

        if (checkUserInfo(user, hash) == 0) {
            console.log(req.cookies.account.account + " had logined.");
            return true;
        }
    }
    return false;
}



module.exports = router;