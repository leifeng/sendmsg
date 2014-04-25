/*
 * GET home page.
 */

exports.index = function (req, res) {
    if(req.cookies.islogin==='ok'){
        res.render('index');
    }else{
        res.redirect('login');
    }

};

