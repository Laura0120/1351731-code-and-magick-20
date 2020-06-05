'use strict';

var NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  ' rgb(0, 0, 0)',
];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var silimarListElement = document.querySelector('.setup-similar-list');
var silimarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var arrRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var wizards = [
  {
    name: arrRandElement(NAME) + arrRandElement(SURNAME),
    coatColor: arrRandElement(COAT_COLOR),
    eyesColor: arrRandElement(EYES_COLOR),
  },
  {
    name: arrRandElement(NAME) + arrRandElement(SURNAME),
    coatColor: arrRandElement(COAT_COLOR),
    eyesColor: arrRandElement(EYES_COLOR),
  },
  {
    name: arrRandElement(NAME) + arrRandElement(SURNAME),
    coatColor: arrRandElement(COAT_COLOR),
    eyesColor: arrRandElement(EYES_COLOR),
  },
  {
    name: arrRandElement(NAME) + arrRandElement(SURNAME),
    coatColor: arrRandElement(COAT_COLOR),
    eyesColor: arrRandElement(EYES_COLOR),
  },
];

var renderWizard = function (wizard) {
  var wizardElement = silimarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

silimarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
