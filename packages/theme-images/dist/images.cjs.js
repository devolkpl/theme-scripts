'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = preload;
exports.loadImage = loadImage;
exports.imageSize = imageSize;
exports.getSizedImageUrl = getSizedImageUrl;
exports.removeProtocol = removeProtocol;
/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * https://github.com/Shopify/slate.git.
 *
 */

/**
 * Preloads an image in memory and uses the browsers cache to store it until needed.
 *
 * @param {Array} images - A list of image urls
 * @param {String} size - A shopify image size attribute
 */

function preload(images, size) {
  if (typeof images === 'string') {
    images = [images];
  }

  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    loadImage(getSizedImageUrl(image, size));
  }
}

/**
 * Loads and caches an image in the browsers cache.
 * @param {string} path - An image url
 */
function loadImage(path) {
  new Image().src = path;
}

/**
 * Find the Shopify image attribute size
 *
 * @param {string} src
 * @returns {null}
 */
function imageSize(src) {
  var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

  if (match) {
    return match[1];
  } else {
    return null;
  }
}

/**
 * Adds a Shopify size attribute to a URL
 *
 * @param src
 * @param size
 * @returns {*}
 */
function getSizedImageUrl(src, size) {
  if (size === null) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

  if (match) {
    var prefix = src.split(match[0]);
    var suffix = match[0];

    return removeProtocol(prefix[0] + '_' + size + suffix);
  } else {
    return null;
  }
}

function removeProtocol(path) {
  return path.replace(/http(s)?:/, '');
}
