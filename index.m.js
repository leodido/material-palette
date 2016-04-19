'use strict'

/**
 * Minimize the maximum possible loss
 *
 * @param      {number}             val           The input value to test
 *
 * @return     {number}             A number between 0 and 100
 */
const minimax = val => Math.min(100, Math.max(0, val))

/**
 * Material Palette Generator
 *
 * It calculates all colors from base.
 * These colors were determined by finding all HSL values for each google palette.
 * Then calculating the differences in H, S, and L per color change individually.
 * Finally applying these here.
 *
 * @param      {Object}           param           The input color
 * @param      {number}           h               The hue ([0, 360]) of the input color
 * @param      {number}           s               The saturation ([0, 100]) of the input color
 * @param      {number}           l               The lightness ([0, 100]) of the input color
 *
 * @return     {Object}           Its palette
 * @property   {Object}           50              The variant 50 of the color
 * @property   {Object}           100             The variant 100 of the color
 * @property   {Object}           200             The variant 200 of the color
 * @property   {Object}           300             The variant 300 of the color
 * @property   {Object}           400             The variant 400 of the color
 * @property   {Object}           500             The input color
 * @property   {Object}           600             The variant 600 of the color
 * @property   {Object}           700             The variant 700 of the color
 * @property   {Object}           800             The variant 800 of the color
 * @property   {Object}           900             The variant 900 of the color
 * @property   {Object}           A100            The accent variant 100 of the color
 * @property   {Object}           A200            The accent variant 200 of the color
 * @property   {Object}           A400            The accent variant 400 of the color
 * @property   {Object}           A700            The accent variant 700 of the color
 */
const generator = ({ h, s, l }) => {
  h = Math.round(h)
  s = Math.round(s)
  l = Math.round(l)

  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    throw new TypeError('Invalid input')
  }
  if (h < 0 || h > 360) {
    throw new RangeError(`Hue must be an integer within [0, 360]; given ${h}`)
  }
  if (s < 0 || s > 100) {
    throw new RangeError(`Saturation must be an integer within [0, 100]; given ${s}`)
  }
  if (l < 0 || l > 100) {
    throw new RangeError(`Lightness must be an integer within [0, 100]; given ${l}`)
  }

  return {
    '50': { h, s, l: minimax(l + 52) },
    '100': { h, s, l: minimax(l + 37) },
    '200': { h, s, l: minimax(l + 26) },
    '300': { h, s, l: minimax(l + 12) },
    '400': { h, s, l: minimax(l + 6) },
    '500': { h, s, l },
    '600': { h, s, l: minimax(l - 6) },
    '700': { h, s, l: minimax(l - 12) },
    '800': { h, s, l: minimax(l - 18) },
    '900': { h, s, l: minimax(l - 24) },
    'A100': { h: h + 5, s, l: minimax(l + 24) }, // { h, s, l: minimax(l + 52) }
    'A200': { h: h + 5, s, l: minimax(l + 16) }, // { h, s, l: minimax(l + 37) }
    'A400': { h: h + 5, s, l: minimax(l - 1) }, // { h, s, l: minimax(l + 6) }
    'A700': { h: h + 5, s, l: minimax(l - 12) } // { h, s, l: minimax(l - 12) }
  }
}

export default generator