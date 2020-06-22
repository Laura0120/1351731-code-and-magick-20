'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var form = userDialog.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
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

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), popupClose, window.backend.errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

  window.dialog = {
    userDialog: userDialog,
  };
})();
