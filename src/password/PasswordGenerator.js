exports.generatePassword = function(length, lowers, uppers, numbers, specials) {
  var buffer = '';
  var lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numberChars = '01234567890';
  var specialChars = '@#&()!-_*$^%+=/|:;,?';
  if (lowers) {
    buffer = lowerChars;
  }
  if (uppers) {
    buffer = buffer + upperChars;
  }
  if (numbers) {
    buffer = buffer + numberChars;
  }
  if (specials) {
    buffer = buffer + specialChars;
  }
  var result = '';
  for (var i = 0; i < length; i++) {
    var a = _getRandomIndex(buffer.length);
    result = result + buffer.charAt(a);
  }
  return result;
};

function _getRandomIndex(max) {
  // between 0 - 1
  var random = Math.random();
  return parseInt(random * max);
}
