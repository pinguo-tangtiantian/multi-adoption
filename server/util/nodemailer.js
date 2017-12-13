var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    auth: {
        user: '798459906@qq.com',
        pass: 'gflngrtykenrbcfg'
    }
});

module.exports = transporter;