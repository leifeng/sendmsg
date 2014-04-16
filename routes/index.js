/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { status: '0' });
};

exports.pushMsg = function (req, res) {

    res.render('index', { status: '1' })
}