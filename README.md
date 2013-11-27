# svg-numbers

Parser and serializer for lists of coordinates for SVG documents, such as [the `points` attribute of a `<polyline>` element][1].

  [1]: http://www.w3.org/TR/SVG/shapes.html#PointsBNF

## Installation

With npm: `$ npm install svg-numbers`

## Usage

### Parsing

    var parse = require('svg-numbers').parse

    var numbers = parse('10, 15.20.8 -11,15-25+75 4.2e3')
    console.log(numbers)
    // [ 10, 15.2, .8, -11, 15, -25, 75, 4200 ]

### Serializing

    var serialize = require('svg-numbers').serialize

    var numbers = [10, 4.2, .333, -8]
    var str = serialize(numbers)
    console.log(str)
    // '10,4.2.333-8'

### Catching syntax errors

If a syntax error is found, an error is thrown. The valid coordinates up to and until the syntax error are available as `error.partial`:

    try {
      var numbers = parse('10, 20, , 30, 40')
    } catch (error) {
      console.log(error.partial)
      // [ 10, 20 ]
    }

(The W3C SVG recommendation has something to say about [error processing][2].)

  [2]: http://www.w3.org/TR/SVG/implnote.html#ErrorProcessing

## Running the tests

    $ git clone https://github.com/PPvG/svg-numbers

    $ cd svg-numbers

    $ npm install

    $ npm test

## License

[MIT](https://raw.github.com/PPvG/svg-numbers/master/LICENSE)
