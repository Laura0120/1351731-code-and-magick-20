'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_BAR = 50;
var MAX_HEIGHT_BAR = 150;
var BAR_WIDTH = 40;
var BAR_CHART_X = CLOUD_X + GAP_BAR;
var BAR_CHART_Y = 260;
var TEXT_HEIGHT = 20;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

var getRandomValue = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hangin';
  ctx.fillText('Ура вы победили!', CLOUD_X + 15, CLOUD_Y + 20);
  ctx.fillText('Список результатов:', CLOUD_X + 15, CLOUD_Y + 40);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var stupid = BAR_CHART_X + (GAP_BAR + BAR_WIDTH) * i;
    var heightBar = (MAX_HEIGHT_BAR * times[i]) / maxTime;

    // Обнуляем цвет на каждой итерации
    ctx.fillStyle = '#000';

    // Рисуем время
    ctx.fillText(Math.round(times[i]), stupid, BAR_CHART_Y - TEXT_HEIGHT - heightBar - GAP);
    // Рисуем имя
    ctx.fillText(players[i], stupid, BAR_CHART_Y);
    // Рисуем колонку
    var colorSaturation = getRandomValue(0, 100) + '%';
    ctx.fillStyle = 'HSL(240,' + colorSaturation + ',50%)';

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(stupid, BAR_CHART_Y - TEXT_HEIGHT - heightBar, BAR_WIDTH, heightBar);
  }
};
