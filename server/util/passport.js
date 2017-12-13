var LocalStrategy = require('passport-local').Strategy;
var sqldb = require('./mysql');

function passprtMysql(passport) {
    // =========================================================================
    // 设置认证会话==================================================
    // =========================================================================
    // 需要持久的登录会话
    // 认证需要能够在会话外序列化和反序列化用户信息

    //为会话序列化用户信息
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    //反序列化用户信息
    passport.deserializeUser(function (id, done) {
        sqldb.query("SELECT * from user_info where id=" + id, function (err, rows) {
            done(err, rows[0]);
        })
    });



    // =========================================================================
    // 本地注册 ============================================================
    // =========================================================================
    //默认使用已命名的strategies因为我们需要一个登陆的 一个注册
    //如果没有命名，直接用'local'
    passport.use('local-signup', new LocalStrategy({
        //local strategy默认使用username和password，我们将会用email重写username
        usernameField: 'email',
        passwordFeild: 'password',
        passReqToCallback: true //允许将整个请求发送给回调函数
    },

        function (req, email, password, done) {
            // console.log(req.body)
            //找到邮箱与表单邮箱一致的用户
            //检查请求登录的用户是否存在
            sqldb.query("SELECT * from user_info where email='" + email + "'", function (err, rows) {
                if (err) return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('注册消息', "该邮箱地址以被占用"));
                } else {//未找到该用户，创建用户
                    var newUserMysql = {
                        email: email,
                        password: password,
                        username: req.body.username,
                        telephone: req.body.telephone,
                    };
                    var insertQuery = "INSERT INTO user_info ( username, password, email, telephone ) values (?,?,?,?)";
                    console.log(insertQuery);
                    sqldb.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.email, newUserMysql.telephone], function (err, rows) {
                        if (err) return done(err);
                        newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
                    })

                }
            })
        }
    ));

    // =========================================================================
    // 本地登录 ============================================================
    // =========================================================================
    //默认使用已命名的strategies因为我们需要一个登陆的 一个注册
    //如果没有命名，直接用'local'
    passport.use('local-login', new LocalStrategy({
        //local strategy默认使用username和password，我们将会用email重写username
        usernameField: 'email',
        passwordFeild: 'password',
        passReqToCallback: true //允许将整个请求发送给回调函数
    },
        function (req, email, password, done) { //回调函数带从表单里传来的email和password
            sqldb.query("SELECT * from user_info where email='" + email + "'", function (err, rows) {
                if (err) return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('登录消息', "未找到该用户"));
                    //req.flash通过connect-flash来设置flashdata
                }

                //找到用户但是密码错误
                if (!(rows[0].password == password)) {
                    return done(null, false, req.flash('登录消息', "密码错误"));
                }
                //万事俱备，只欠东风，返回正确用户
                return done(null, rows[0]);
            });
        }
    ))
}


module.exports = passprtMysql;