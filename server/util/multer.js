var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var savePath = path.resolve(__dirname, '../pictures/'+req.body.type+"/");
        cb(null, savePath);
    },
    filename: function (req, file, cb) {
        var type = req.body.type;
        var name = req.body.name;
        var fileFormat = (file.originalname).split(".");
        var format = fileFormat[fileFormat.length - 1];
        cb(null, type+'-'+ name + '-' + Date.now() + '.' + format);
    }
});

var upload = multer({ storage: storage });

module.exports = upload;