// Character groups
var RE = {
  SEPARATOR: /[ \t\r\n\,.\-+]/,
  WHITESPACE: /[ \t\r\n]/,
  DIGIT: /[\d]/,
  SIGN: /[-+]/,
  POINT: /\./,
  COMMA: /,/,
  EXP: /e/i
}

// States
var SEP = 0
var INT = 1
var FLOAT = 2
var EXP = 3

module.exports = function parse (input) {

  var state = SEP
  var result = [], number = '', exponent = ''

  function newNumber() {
    if (exponent==='') result.push(Number(number))
    else               result.push(Number(number) * Math.pow(10, Number(exponent)))
    number = exponent = ''
  }

  var current, i = 0, length = input.length
  for (i = 0; i < length; i++) {
    current = input[i]

    // parse until next number
    if (state === SEP) {
      // eat whitespace
      if (RE.WHITESPACE.test(current)) {
        continue
      }
      // start new number
      if (RE.DIGIT.test(current) || RE.SIGN.test(current)) {
        state = INT
        number = current
        continue
      }
      if (RE.POINT.test(current)) {
        state = FLOAT
        number = current
        continue
      }
    }

    // parse integer part
    if (state === INT) {
      if (RE.DIGIT.test(current)) {
        number += current
        continue
      }
      if (RE.POINT.test(current)) {
        number += current
        state = FLOAT
        continue
      }
      if (RE.EXP.test(current)) {
        state = EXP
        continue
      }
    }

    // parse decimal part
    if (state === FLOAT) {
      if (RE.DIGIT.test(current)) {
        number += current
        continue
      }
      if (RE.EXP.test(current)) {
        state = EXP
        continue
      }
    }

    // parse exponent part
    if (state == EXP) {
      if (RE.DIGIT.test(current)) {
        exponent += current
        continue
      }
      if (RE.SIGN.test(current)) {
        if (exponent === '') {
          exponent += current
          continue
        }
        if (exponent.length === 1 && RE.SIGN.test(exponent)) {
          throwParseError(current, i, result)
        }
      }
    }

    // end of number
    if (RE.WHITESPACE.test(current) || RE.COMMA.test(current)) {
      newNumber()
      state = SEP
    }
    else if (RE.SIGN.test(current)) {
      newNumber()
      state = INT
      number = current
    }
    else if (RE.POINT.test(current)) {
      newNumber()
      state = FLOAT
      number = current
    }
    else if (i === length-1) {
      newNumber()
    }
    else {
      throwParseError(current, i, result)
    }
  }

  // add the last number found (if any)
  newNumber()

  return result
}

function throwParseError(current, i, partial) { // TODO: extend Error
  throw {
    name: 'ParseError',
    message: 'Unexpected character "'+current+'" at index '+i+'.',
    partial: partial
  }
}
