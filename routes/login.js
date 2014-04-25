/**
 * Created by zcl on 2014/4/22.
 */
var config=require('./config');
exports.index = function (req, res) {
    res.render('login',{msg:''});
};

exports.login = function (req, res) {
    if(req.body.UserName===config.username&&req.body.Password===config.passworld){
        res.cookie('islogin','ok',{maxAge: 300000});
        res.redirect('index');
    }else{
        res.render('login',{msg:'用户名或密码错误'});
    }

};
