'use strict';

(function () {
  var FIREBALL_COLORS = ['#30a8ee', '#5ce6c0', '#e848d5', '#e6e848', '#ee4830'];

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = window.dialog.userDialog.querySelector('#coat-color');
  var eyesColorInput = window.dialog.userDialog.querySelector('#eyes-color');
  var fireballColorInput = window.dialog.userDialog.querySelector('#fireball-color');

  var getNextElement = function (array) {
    var index = 0;
    return function () {
      if (index === array.length) {
        index = 0;
      }
      var element = array[index];
      index++;
      return element;
    };
  };

  var getNextCoatColor = getNextElement(window.main.COAT_COLOR);
  var getNextEyesColor = getNextElement(window.main.EYES_COLOR);
  var getNextFireballColor = getNextElement(FIREBALL_COLORS);

  wizardCoat.addEventListener('click', function () {
    var currentCoatColor = getNextCoatColor();
    wizardCoat.style.fill = currentCoatColor;
    coatColorInput.value = currentCoatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var currentEyesColor = getNextEyesColor();
    wizardEyes.style.fill = currentEyesColor;
    eyesColorInput.value = currentEyesColor;
  });

  setupFireball.addEventListener('click', function () {
    var currentFireballColor = getNextFireballColor();
    setupFireball.style.background = currentFireballColor;
    fireballColorInput.value = currentFireballColor;
  });
})();
