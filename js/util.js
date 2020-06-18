('use strict');
(function () {
  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (array) {
    return array[getRandomValue(0, array.length - 1)];
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandomItem: getRandomItem,
  };
})();
