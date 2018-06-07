/*
 * GET markets page.
 */

var markets = require("../markets.json");

exports.view = function(req, res) {
    res.render("markets", { markets 
    });
}; 
  