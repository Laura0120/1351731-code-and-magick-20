'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizardElements = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.backend.load(renderWizardElements, window.backend.errorHandler);

  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var showSimilarWizards = function () {
    window.dialog.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  showSimilarWizards();
})();
