'use strict';

var NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = [
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  ' rgb(0, 0, 0)',
  'rgb(101, 137, 164)',
];
var EYES_COLOR = ['red', 'blue', 'yellow', 'green', 'black'];
var WIZARDS_COUNT = 4;
var FIREBALL_COLORS = ['#30a8ee', '#5ce6c0', '#e848d5', '#e6e848', '#ee4830'];

var wizards = [];
var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var coatColorInput = userDialog.querySelector('#coat-color');
var eyesColorInput = userDialog.querySelector('#eyes-color');
var fireballColorInput = userDialog.querySelector('#fireball-color');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// открытие/закрытие окна насторойками

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    userDialog.classList.add('hidden');
  }
};

var popupOpen = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var popupClose = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', popupOpen);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    popupOpen();
  }
});

setupClose.addEventListener('click', popupClose);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    popupClose();
  }
});

// настройки мага
var creatGetNextElement = function (array) {
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

var getNextCoatColor = creatGetNextElement(COAT_COLOR);
var getNextEyesColor = creatGetNextElement(EYES_COLOR);
var getNextFireballColor = creatGetNextElement(FIREBALL_COLORS);

wizardCoat.addEventListener('click', function () {
  var carentCoatColor = getNextCoatColor();
  wizardCoat.style.fill = carentCoatColor;
  coatColorInput.value = carentCoatColor;
});

wizardEyes.addEventListener('click', function () {
  var carentEyesColor = getNextEyesColor();
  wizardEyes.style.fill = carentEyesColor;
  eyesColorInput.value = carentEyesColor;
});

setupFireball.addEventListener('click', function () {
  var carentFireballColor = getNextFireballColor();
  setupFireball.style.background = carentFireballColor;
  fireballColorInput.value = carentFireballColor;
});

// отрисовка магов

var getRandomItem = function (array) {
  return array[window.getRandomValue(0, array.length - 1)];
};

var createWizards = function () {
  var generatedWizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    generatedWizards.push({
      name: getRandomItem(NAME) + ' ' + getRandomItem(SURNAME),
      coatColor: getRandomItem(COAT_COLOR),
      eyesColor: getRandomItem(EYES_COLOR),
    });
  }
  return generatedWizards;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizardElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

var showSimilarWizards = function () {
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

wizards = createWizards();
renderWizardElements();
showSimilarWizards();
