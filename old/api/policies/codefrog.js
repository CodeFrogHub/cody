/**
 * codefrog
 *
 * @module      :: Policy
 * @description :: Simple policy to overwrite poweredby.
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
    res.header('X-Powered-By', 'CodeFrog IT GmbH <codefrog.de>');
    
    next();
};