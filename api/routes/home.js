// Logger
var log = require('debug')('cody:router_register');
// Requirements
log('Load Requirements');
var express = require('express');
var pkg = require('../../package.json');
log('Init Router');
var router = express.Router();

router.route('/')
    .get(function (req, res) {
       res.json({
         name: pkg.name,
         version: pkg.version
       });
    });

module.exports = router;

