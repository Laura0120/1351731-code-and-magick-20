'use strict';

(function () {
  var NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_COUNT = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = [];

  var createWizards = function () {
    var generatedWizards = [];
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      generatedWizards.push({
        name: window.util.getRandomItem(NAME) + ' ' + window.util.getRandomItem(SURNAME),
        coatColor: window.util.getRandomItem(window.main.COAT_COLOR),
        eyesColor: window.util.getRandomItem(window.main.EYES_COLOR),
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
    window.dialog.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  wizards = createWizards();
  renderWizardElements();
  showSimilarWizards();
})();
