const crypto = require('crypto');
const config = require('../../config');

module.exports = (text) => {
	var mykey = crypto.createCipher('aes-128-cbc', config.encryptionKey);
	var mystr = mykey.update(text, 'utf8', 'hex')
	mystr += mykey.final('hex');
	return mystr;
};