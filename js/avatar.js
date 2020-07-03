'use strict';

(function () {
  var FILE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var matches = FILE_TYPES.some(function (it) {
      return it === file.type;
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
