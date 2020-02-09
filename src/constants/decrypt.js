const crypto = require('crypto');
const config = require('../../config');

module.exports = (encryptedText) => {
	var mykey = crypto.createDecipher('aes-128-cbc', config.encryptionKey);
	var mystr = mykey.update(encryptedText, 'hex', 'utf8')
	mystr += mykey.final('utf8');
	return mystr;
}