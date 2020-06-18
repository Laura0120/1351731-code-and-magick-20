'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if (evt.key === window.main.KEY_ESC) {
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

  setupOpen.addEventListener('click', function () {
    popupOpen();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.main.KEY_ENTER) {
      popupOpen();
    }
  });

  setupClose.addEventListener('click', function () {
    popupClose();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.main.KEY_ENTER) {
      popupClose();
    }
  });

  window.dialog = {
    userDialog: userDialog,
  };
})();
