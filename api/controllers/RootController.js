/**
 * RootController
 *
 * @description :: Server-side logic for managing Roots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
        return res.json({
            info: 'cody'
        });
    }
};

