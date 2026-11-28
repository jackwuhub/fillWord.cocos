const { createPlatform } = require('../platform');

function createGame() {
  const platform = createPlatform();
  const system = platform.getSystemInfo();
  const canvas = wx.createCanvas();
  const context = canvas.getContext('2d');
  const width = system.windowWidth;
  const height = system.windowHeight;
  const scale = system.pixelRatio || 1;
  canvas.width = width * scale;
  canvas.height = height * scale;
  context.scale(scale, scale);

  const state = {
    page: 'home',
    coins: platform.getStorage('coins', 1250),
    hearts: platform.getStorage('hearts', 3),
    unlockedLevel: platform.getStorage('unlockedLevel', 1),
    scrollY: 0,
    touchStartY: 0
  };

  function roundedRect(x, y, w, h, radius, fill, stroke) {
    context.beginPath();
    context.roundRect(x, y, w, h, radius);
    context.fillStyle = fill;
    context.fill();
    if (stroke) {
      context.lineWidth = 4;
      context.strokeStyle = stroke;
      context.stroke();
    }
  }

  function text(value, x, y, size, color, align) {
    context.font = `bold ${size}px sans-serif`;
    context.textAlign = align || 'center';
    context.textBaseline = 'middle';
    context.lineWidth = Math.max(2, size / 10);
    context.strokeStyle = '#70401c';
    context.strokeText(value, x, y);
    context.fillStyle = color;
    context.fillText(value, x, y);
  }

  function drawHeader(back) {
    if (back) {
      roundedRect(18, 18, 58, 58, 29, '#2c91e8', '#073c75');
      text('‹', 47, 47, 44, '#fff');
    }
    roundedRect(width * 0.21, 20, width * 0.27, 48, 24, '#123f70', '#082748');
    text(`🪙 ${state.coins}`, width * 0.345, 44, 19, '#fff');
    roundedRect(width * 0.53, 20, width * 0.25, 48, 24, '#123f70', '#082748');
    text(`❤️ ${state.hearts}  +`, width * 0.655, 44, 19, '#fff');
    roundedRect(width - 70, 18, 52, 52, 26, '#174e8d', '#082748');
    text('⚙', width - 44, 44, 28, '#fff');
  }

  function drawHome() {
    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#43aaf4');
    sky.addColorStop(0.65, '#b9e8ff');
    sky.addColorStop(1, '#f5b760');
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#fff7c9';
    context.beginPath();
    context.arc(width * 0.15, height * 0.22, 45, 0, Math.PI * 2);
    context.fill();
    drawHeader(false);
    text('👑', width / 2, height * 0.2, 72, '#ffd92c');
    text('我是梗王', width / 2, height * 0.32, 54, '#ffdf28');
    text('你有多懂互联网？', width / 2, height * 0.39, 24, '#fff');
    text('😎', width / 2, height * 0.57, 112, '#fff');
    roundedRect(width * 0.13, height * 0.73, width * 0.74, 82, 40, '#ffd92c', '#8e4c16');
    text('▶ 开始挑战', width / 2, height * 0.79, 34, '#fff');
    text('♛ 收集网络热梗 · 成为真正的梗王 ♛', width / 2, height * 0.91, 16, '#fff');
  }

  function drawLevels() {
    context.fillStyle = '#79c9ff';
    context.fillRect(0, 0, width, height);
    drawHeader(true);
    text('梗王之树', width / 2, 101, 30, '#fff');
    context.strokeStyle = '#8c5a2d';
    context.lineWidth = 20;
    context.beginPath();
    context.moveTo(width / 2, height + state.scrollY);
    context.bezierCurveTo(width * 0.26, height * 0.72 + state.scrollY, width * 0.75, height * 0.42 + state.scrollY, width / 2, 90 + state.scrollY);
    context.stroke();

    for (let level = 1; level <= 20; level++) {
      const y = height - 105 - (level - 1) * 112 + state.scrollY;
      if (y < 96 || y > height + 70) continue;
      const x = width / 2 + Math.sin(level * 1.7) * width * 0.22;
      const open = level <= state.unlockedLevel;
      context.beginPath();
      context.arc(x, y, 34, 0, Math.PI * 2);
      context.fillStyle = open ? '#ffe22b' : '#858b95';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = open ? '#2aa94d' : '#515963';
      context.stroke();
      text(open ? '😎' : '🔒', x, y - 5, 27, '#fff');
      roundedRect(x - 25, y + 20, 50, 25, 12, open ? '#28cb47' : '#66707b', '#fff');
      text(String(level), x, y + 32, 17, '#fff');
    }
    text('向上滑动查看更多关卡', width / 2, height - 30, 16, '#fff');
  }

  function render() {
    context.clearRect(0, 0, width, height);
    if (state.page === 'home') drawHome();
    else drawLevels();
  }

  platform.onTouchStart((event) => {
    const point = event.touches[0];
    state.touchStartY = point.clientY;
  });
  platform.onTouchEnd((event) => {
    const point = event.changedTouches[0];
    const delta = point.clientY - state.touchStartY;
    if (state.page === 'home' && point.clientY > height * 0.68) {
      state.page = 'levels';
    } else if (state.page === 'levels' && Math.abs(delta) > 18) {
      state.scrollY = Math.min(0, Math.max(-(20 * 112 - height + 180), state.scrollY + delta));
    } else if (state.page === 'levels' && point.clientX < 80 && point.clientY < 85) {
      state.page = 'home';
    }
    render();
  });

  render();
}

module.exports = { createGame };
