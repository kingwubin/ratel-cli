const ncp = require('ncp').ncp

module.exports =function dir(source, dist) {
    ncp(source, dist)
}