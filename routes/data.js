/*
 * GET data page.
 */

var markets = require('../markets.json');
var questions = require('../questions.json');

exports.view = function(req, res) {
    res.render('data', { markets, questions 
    });
}; 