('use strict');
(function () {
  var KEY_ESC = 'Escape';
  var KEY_ENTER = 'Enter';

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (array) {
    return array[getRandomValue(0, array.length - 1)];
  };

  window.util = {
    KEY_ESC: KEY_ESC,
    KEY_ENTER: KEY_ENTER,
    getRandomValue: getRandomValue,
    getRandomItem: getRandomItem,
  };
})();
