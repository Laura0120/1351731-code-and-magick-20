'use strict';

(function () {
  var COAT_COLOR = [
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    ' rgb(0, 0, 0)',
    'rgb(101, 137, 164)',
  ];
  var EYES_COLOR = ['red', 'blue', 'yellow', 'green', 'black'];
  var FIREBALL_COLORS = ['#30a8ee', '#5ce6c0', '#e848d5', '#e6e848', '#ee4830'];

  var setupWizard = window.dialog.userDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = window.dialog.userDialog.querySelector('.setup-fireball-wrap');
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

  var getNextCoatColor = getNextElement(COAT_COLOR);
  var getNextEyesColor = getNextElement(EYES_COLOR);
  var getNextFireballColor = getNextElement(FIREBALL_COLORS);

  wizardCoat.addEventListener('click', function () {
    var newColor = getNextCoatColor();
    wizardCoat.style.fill = newColor;
    coatColorInput.value = newColor;
    window.wizards.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = getNextEyesColor();
    wizardEyes.style.fill = newColor;
    eyesColorInput.value = newColor;
    window.wizards.onEyesChange(newColor);
  });

  setupFireball.addEventListener('click', function () {
    var fireballColor = getNextFireballColor();
    setupFireball.style.background = fireballColor;
    fireballColorInput.value = fireballColor;
  });
})();
