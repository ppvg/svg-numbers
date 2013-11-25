var parse = require('../')
var test = require('tap').test

test('integers', function (t) {
  t.same(parse('1'),       [ 1 ])
  t.same(parse('1, 2, 3'), [ 1, 2, 3 ])
  t.same(parse('1 2 3'),   [ 1, 2, 3 ])
  t.end()
})

test('floats', function (t) {
  t.same(parse('1.5'),       [ 1.5 ])
  t.same(parse('1.5, 4.2'),  [ 1.5, 4.2 ])
  t.same(parse('1.2.3.4'),   [ 1.2, .3, .4 ])
  t.same(parse('1.2.3,4.5'), [ 1.2, .3, 4.5 ])
  t.end()
})

test('signs', function (t) {
  t.same(parse('-1'),        [ -1 ])
  t.same(parse('-1, -2, 3'), [ -1, -2, 3 ])
  t.same(parse('1-2-3'),     [ 1, -2, -3 ])
  t.same(parse('1 -2 +3'),   [ 1, -2, 3 ])
  t.end()
})

test('exponent', function (t) {
  t.same(parse('1e3'),       [ 1000 ])
  t.same(parse('1e-3'),      [ 1/1000 ])
  t.same(parse('1e3.5'),     [ 1000, .5 ])
  t.same(parse('1e3,5'),     [ 1000, 5 ])
  t.same(parse('1e3 4.2e5'), [ 1000, 420000 ])
  t.end()
})


test('full example', function (t) {
  t.same(
    parse('100,1e2 15.20,-110,150-25-75'),
    [ 100, 1e2, 15.2, -110, 150, -25, -75 ]
  )
  t.end()
})
