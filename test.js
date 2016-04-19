'use strict'

import test from 'ava'
import materialpalette from './'

test('should detect invalid input', t => {
    t.throws(() => materialpalette({ h: '36ABC', s: 100, l: 100 }), TypeError, 'Invalid input')
})

test('should handle (converting) numeric input strings', t => {
    t.plan(2)

    const palette = materialpalette({ h: '36', s: '100', l: '100' })
    t.not(palette, null)
    t.true(typeof palette === 'object')
})

test('should handle (ignoring) float input', t => {
    t.plan(2)

    const palette = materialpalette({ h: 36.3, s: 10.5, l: 99.9 })
    t.not(palette, null)
    t.true(typeof palette === 'object')
})

test('should detect invalid hue', t => {
    t.plan(2)

    t.throws(() => materialpalette({ h: 361, s: 100, l: 100 }), RangeError, `Hue must be an integer within [0, 360]; given 361`)
    t.throws(() => materialpalette({ h: -1, s: 100, l: 100 }), RangeError, `Hue must be an integer within [0, 360]; given -1`)
})

test('should detect invalid saturation', t => {
    t.plan(2)

    t.throws(() => materialpalette({ h: 36, s: 101, l: 100 }), RangeError, `Saturation must be an integer within [0, 100]; given 101`)
    t.throws(() => materialpalette({ h: 36, s: -1, l: 100 }), RangeError, `Saturation must be an integer within [0, 100]; given -1`)
})

test('should detect invalid lightness', t => {
    t.plan(2)

    t.throws(() => materialpalette({ h: 36, s: 100, l: 101 }), RangeError, `Lightness must be an integer within [0, 100]; given 101`)
    t.throws(() => materialpalette({ h: 36, s: 100, l: -1 }), RangeError, `Lightness must be an integer within [0, 100]; given 101`)
})

test('should accept limit values', t => {
    t.plan(4)

    let palette = materialpalette({ h: 0, s: 0, l: 0 })
    t.not(palette, null)
    t.true(typeof palette === 'object')

    palette = materialpalette({ h: 360, s: 100, l: 100 })
    t.not(palette, null)
    t.true(typeof palette === 'object')
})

test('should return an object of objects', t => {
    t.plan(170)

    const palette = materialpalette({ h: 359, s: 75, l: 75 })
    t.not(palette, null)
    t.true(typeof palette === 'object')

    for (let p of ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700']) {
        t.true(palette.hasOwnProperty(p))
        t.not(palette[p], null)
        t.true(typeof palette[p] === 'object')
        for (let c of ['h', 's', 'l']) {
            t.true(palette[p].hasOwnProperty(c))
            t.true(Number.isInteger(palette[p][c]))
            t.true(palette[p][c] >= 0 && c === 'h' ? true : palette[p][c] <= 100)
        }
    }
})
