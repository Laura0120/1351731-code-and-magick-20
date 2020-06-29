'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var DEBOUNCE_INTERVAL = 500;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = [];
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizardElements = function (data) {
    var takeNumber = data.length > WIZARDS_COUNT ? WIZARDS_COUNT : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(createWizardElement(data[i]));
    }
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizardElements(
      wizards.slice().sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }),
    );
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var onCoatChange = debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onEyesChange = debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  var showSimilarWizards = function () {
    window.dialog.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  showSimilarWizards();

  window.wizards = {
    update: updateWizards,
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange,
  };
})();
