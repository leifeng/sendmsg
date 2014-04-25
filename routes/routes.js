/**
 * Created by zcl on 2014/4/25.
 */

var index=require('./index'),
    login=require('./login');
module.exports = function (app) {
    app.get('/',index.index);
    app.get('/index',index.index);
    app.get('/login',login.index);
    app.post('/login',login.login)
}