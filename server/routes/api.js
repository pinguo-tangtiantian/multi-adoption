

var express = require('express');
var transporter = require('../util/nodemailer');
var upload = require('../util/multer');
var sqldb = require('../util/mysql');

var Common = require('../common');

var router = express.Router();

router.post('/upload_animal', upload.array("photos", 6), function (req, res, next) {
    var imgsArr = req.files;
    var data = req.body;
    var tempImgs = [];
    for(var i=0; i<imgsArr.length; i++){
      tempImgs.push(imgsArr[i].path);
    }
    var imgUrls = tempImgs.join("|");
    var sql = 'INSERT INTO cat_list ( breed, name, gender, color, age, expelling, vaccine, neutering, nature, origin, deposit, remark, img_urls) VALUES("'+data.breed+'", "'+data.name+'", "'+data.gender+'", "'+data.color+'", "'+data.age+'", "'+data.expelling+'", "'+data.vaccine+'", "'+data.neutering+'", "'+data.nature+'", "'+data.origin+'", "'+data.deposit+'", "'+data.remark+'", "'+imgUrls+'");';
    sqldb.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.send({ "data" : rows});
    });
});

module.exports = router;