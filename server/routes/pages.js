
module.exports = function(app, passport){
    // console.log(passport.authenticate)
    // =====================================
	// 首页 ========
    // =====================================
    app.get('/', function(req, res){
        console.log(req.isAuthenticated())
        res.render('index.html');
    });
    app.get('/home', function(req, res){
        console.log(req.isAuthenticated())
        res.render('index.html');
    });

    // =====================================
	// 登录页面 ===============================
	// =====================================
    // 展示登录表单
    app.get('/login', function(req, res){
        console.log(req.isAuthenticated())
        res.render('login.html', { message: req.flash('loginMessage')});
    });

    //处理登录表单
    app.post('/login', passport.authenticate(
        'local-login', 
        {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        }), 
        function(req, res) {
            console.loc(req.body)
            if(req.body.remember) {
                req.session.cookie.maxAge = 1000*60*3;
            }else{
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        }
    );

    // =====================================
	// 注册页 ==============================
	// =====================================
	// 展示注册表单
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.html', { message: req.flash('signupMessage') });
	});

    //处理注册表单
    app.post('/signup', passport.authenticate(
        'local-signup',
        {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }
    ));

    // =====================================
	// 个人主页 =========================
	// =====================================
	// 该页面受保护所以需要登录后才可查看
	// 通过路由中间件确认（isLoggedIn函数）
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.html', {
			user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
	// 退出登录 ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

};


// 确认的路由中间件
function isLoggedIn(req, res, next) {
    
        // 用户在会话中已登录认证，则执行下一步操作
        if (req.isAuthenticated())
            return next();
    
        // 否则就重定向到首页
        res.redirect('/');
    }