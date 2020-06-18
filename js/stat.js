'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CLOUD_COLOR = '#fff';
  var GAP = 10;
  var GAP_BAR = 50;
  var MAX_HEIGHT_BAR = 150;
  var BAR_WIDTH = 40;
  var BAR_CHART_X = CLOUD_X + GAP_BAR;
  var BAR_CHART_Y = 260;
  var TEXT_HEIGHT = 20;
  var USER_COLOR = 'rgba(255, 0, 0, 1)';

  var renderCloud = function (ctx) {
    ctx.fillStyle = SHADOW_COLOR;
    ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = CLOUD_COLOR;
    ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getRandomBlueColor = function () {
    var colorSaturation = window.util.getRandomValue(0, 100) + '%';
    return 'HSL(240, ' + colorSaturation + ', 50%)';
  };

  var renderHeader = function (ctx) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hangin';
    ctx.fillText('Ура вы победили!', CLOUD_X + 50, CLOUD_Y + 20);
    ctx.fillText('Список результатов:', CLOUD_X + 15, CLOUD_Y + 40);
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx);
    renderHeader(ctx);
    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      var xCoord = BAR_CHART_X + (GAP_BAR + BAR_WIDTH) * i;
      var heightBar = (MAX_HEIGHT_BAR * times[i]) / maxTime;

      // Обнуляем цвет на каждой итерации
      ctx.fillStyle = '#000';

      // Рисуем время
      ctx.fillText(Math.round(times[i]), xCoord, BAR_CHART_Y - TEXT_HEIGHT - heightBar - GAP);

      // Рисуем имя
      ctx.fillText(players[i], xCoord, BAR_CHART_Y);

      // Рисуем колонку
      ctx.fillStyle = players[i] === 'Вы' ? USER_COLOR : getRandomBlueColor();

      ctx.fillRect(xCoord, BAR_CHART_Y - TEXT_HEIGHT - heightBar, BAR_WIDTH, heightBar);
    }
  };
})();
