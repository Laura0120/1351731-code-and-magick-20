'use strict';

(function () {
  var MIN_COORDINATES_Y = 0;

  var bodyElement = document.querySelector('body');
  var setupOpen = document.querySelector('.setup-open');
  var userDialog = document.querySelector('.setup');
  var setupClose = userDialog.querySelector('.setup-close');
  var dialogHandle = userDialog.querySelector('.upload');
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
    if (evt.key === window.util.KEY_ENTER) {
      popupOpen();
    }
  });

  setupClose.addEventListener('click', function () {
    popupClose();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.KEY_ENTER) {
      popupClose();
    }
  });

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), popupClose, window.backend.errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      var currentCoords = {
        x: window.dialog.userDialog.offsetLeft - shift.x,
        y: window.dialog.userDialog.offsetTop - shift.y,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (
        currentCoords.y >= MIN_COORDINATES_Y &&
        currentCoords.y <= bodyElement.offsetHeight &&
        currentCoords.x <= bodyElement.offsetWidth
      ) {
        window.dialog.userDialog.style.left = currentCoords.x + 'px';
        window.dialog.userDialog.style.top = currentCoords.y + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.dialog = {
    userDialog: userDialog,
  };
})();
