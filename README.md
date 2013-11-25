# svg-numbers

Parse a list of coordinates from an SVG document, such as [the `points` attribute of a `<polyline>` element][1].

  [1]: http://www.w3.org/TR/SVG/shapes.html#PointsBNF

## Usage

`$ npm install svg-numbers`

    var parse = require('svg-numbers')

    var numbers = parse('10, 15.20.8 -11,15-25+75 4.2e3')
    console.log(numbers)
    // [ 10, 15.2, .8, -11, 15, -25, 75, 4200 ]

## Catching syntax errors

If a syntax error is found, an error is thrown. The valid coordinates up to and until the syntax error are available as `error.partial`:

    try {
      var numbers = parse('10, 20, , 30, 40')
    } catch (error) {
      console.log(error.partial)
      // [ 10, 20 ]
    }

(The W3C SVG recommendation has something to say about [error processing][2].)

  [2]: http://www.w3.org/TR/SVG/implnote.html#ErrorProcessing
