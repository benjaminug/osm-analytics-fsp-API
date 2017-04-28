/**
 * Created by Morgan on 4/26/2017.
 */

const _apicache = require('apicache');

//Cache setup
var _apicache2 = _interopRequireDefault(_apicache);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
var cache = _apicache2.default.middleware;

module.exports = cache;  //https://github.com/kwhitley/apicache
