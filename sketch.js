// ...existing code...
let circles = [];
const COLORS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
const TARGET_COLOR = '#ffca3a'; // 目標得分顏色
const NUM_CIRCLES = 20;

let particles = []; // 爆破用粒子陣列
let score = 0; // 分數變數

// 提取圓的重置邏輯，並確保儲存 hexColor
function resetCircle(c) {
  let hex = random(COLORS);
  c.y = height + c.r / 2; // 從底部重新出現
  c.x = random(width);
  c.r = random(50, 200);
  c.hexColor = hex; // 儲存 Hex 顏色字串 (例如: '#ffca3a')
  c.color = color(hex); // 更新 p5.Color
  c.alpha = random(80, 255);
  c.speed = random(1, 5);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 初始化圓
  circles = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    let hex = random(COLORS);
    circles.push({
      x: random(width),
      y: random(height),
      r: random(50, 200),
      hexColor: hex,         // 儲存 Hex 顏色字串
      color: color(hex),     // p5.Color 物件
      alpha: random(80, 255),
      speed: random(1, 5)
    });
  }
}

function draw() {
  background('#fcf6bd');
  noStroke();

  // === 顯示文字和分數 ===
  textSize(32);
  fill('#eb6424'); // 設定文字顏色為 eb6424

  // 左上角文字 (新的要求: "414730423")
  textAlign(LEFT, TOP);
  text("414730803", 10, 10); // 距離左上角 10 像素

  // 右上角得分分數
  textAlign(RIGHT, TOP);
  text(`Score: ${score}`, width - 10, 10); // 距離右上角 10 像素
  // === 結束顯示文字和分數 ===

  // 畫並更新圓
  for (let c of circles) {
    c.y -= c.speed;
    if (c.y + c.r / 2 < 0) {
      // 圓完全移出畫面頂端，只重置，不產生爆破
      resetCircle(c);
    }
    c.color.setAlpha(c.alpha); // 設定透明度
    fill(c.color); // 使用設定的顏色
    circle(c.x, c.y, c.r); // 畫圓

    // 在圓的右上方1/4圓的中間產生方形 (裝飾)
    let squareSize = c.r / 6;
    let angle = -PI / 4;
    let distance = c.r / 2 * 0.65;
    let squareCenterX = c.x + cos(angle) * distance;
    let squareCenterY = c.y + sin(angle) * distance;
    fill(255, 255, 255, 120); // 白色透明
    noStroke();
    rectMode(CENTER);
    rect(squareCenterX, squareCenterY, squareSize, squareSize);
  }

  // 更新並畫出粒子
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.vy += 0.12; // 重力
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    let alpha = map(p.life, 0, p.maxLife, 0, 255);
    fill(red(p.color), green(p.color), blue(p.color), alpha);
    noStroke();
    ellipse(p.x, p.y, p.r);

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// 產生爆破粒子的函數 (已修正語法)
function spawnParticles(x, y, baseColor, count = 30) {
  const br = red(baseColor);
  const bg = green(baseColor);
  const bb = blue(baseColor);

  for (let i = 0; i < count; i++) {
    let ang = random(TWO_PI);
    let speed = random(1.5, map(count, 12, 90, 2.5, 9));
    let vx = cos(ang) * speed * random(0.5, 1.5);
    let vy = sin(ang) * speed * random(0.5, 1.5);
    let life = floor(random(40, 100));
    particles.push({
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      r: random(2, 6),
      life: life,
      maxLife: life,
      color: color(br, bg, bb)
    });
  }
}

// 使用滑鼠點擊可對最近的圓產生爆破和計分
function mousePressed() {
  if (circles.length === 0) return;
  let nearest = null;
  let nd = Infinity;
  for (let i = 0; i < circles.length; i++) {
    let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
    if (d < nd) {
      nd = d;
      nearest = i;
    }
  }
  if (nearest !== null && nd < 300) { // 範圍限制，點太遠不觸發
    let c = circles[nearest];

    // === 計分邏輯 ===
    if (c.hexColor === TARGET_COLOR) {
      score += 1; // 按到 ffca3a 顏色氣球則加 1 分
    } else {
      score -= 1; // 其他顏色氣球則扣 1 分
    }
    // === 結束計分邏輯 ===

    // 產生爆破 (粒子數較多，給予互動回饋)
    spawnParticles(c.x, c.y, c.color, floor(map(c.r, 50, 200, 20, 90)));
    
    // 重置該圓
    resetCircle(c);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 重新分布圓的位置
  for (let c of circles) {
    c.x = random(width);
    c.y = random(height);
  }
}
// ...existing code...// ...existing code...
let circles = [];
const COLORS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
const TARGET_COLOR = '#ffca3a'; // 目標得分顏色
const NUM_CIRCLES = 20;

let particles = []; // 爆破用粒子陣列
let score = 0; // 分數變數

// 提取圓的重置邏輯，並確保儲存 hexColor
function resetCircle(c) {
  let hex = random(COLORS);
  c.y = height + c.r / 2; // 從底部重新出現
  c.x = random(width);
  c.r = random(50, 200);
  c.hexColor = hex; // 儲存 Hex 顏色字串 (例如: '#ffca3a')
  c.color = color(hex); // 更新 p5.Color
  c.alpha = random(80, 255);
  c.speed = random(1, 5);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 初始化圓
  circles = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    let hex = random(COLORS);
    circles.push({
      x: random(width),
      y: random(height),
      r: random(50, 200),
      hexColor: hex,         // 儲存 Hex 顏色字串
      color: color(hex),     // p5.Color 物件
      alpha: random(80, 255),
      speed: random(1, 5)
    });
  }
}

function draw() {
  background('#fcf6bd');
  noStroke();

  // === 顯示文字和分數 ===
  textSize(32);
  fill('#eb6424'); // 設定文字顏色為 eb6424

  // 左上角文字 (新的要求: "414730423")
  textAlign(LEFT, TOP);
  text("414730423", 10, 10); // 距離左上角 10 像素

  // 右上角得分分數
  textAlign(RIGHT, TOP);
  text(`Score: ${score}`, width - 10, 10); // 距離右上角 10 像素
  // === 結束顯示文字和分數 ===

  // 畫並更新圓
  for (let c of circles) {
    c.y -= c.speed;
    if (c.y + c.r / 2 < 0) {
      // 圓完全移出畫面頂端，只重置，不產生爆破
      resetCircle(c);
    }
    c.color.setAlpha(c.alpha); // 設定透明度
    fill(c.color); // 使用設定的顏色
    circle(c.x, c.y, c.r); // 畫圓

    // 在圓的右上方1/4圓的中間產生方形 (裝飾)
    let squareSize = c.r / 6;
    let angle = -PI / 4;
    let distance = c.r / 2 * 0.65;
    let squareCenterX = c.x + cos(angle) * distance;
    let squareCenterY = c.y + sin(angle) * distance;
    fill(255, 255, 255, 120); // 白色透明
    noStroke();
    rectMode(CENTER);
    rect(squareCenterX, squareCenterY, squareSize, squareSize);
  }

  // 更新並畫出粒子
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.vy += 0.12; // 重力
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    let alpha = map(p.life, 0, p.maxLife, 0, 255);
    fill(red(p.color), green(p.color), blue(p.color), alpha);
    noStroke();
    ellipse(p.x, p.y, p.r);

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// 產生爆破粒子的函數 (已修正語法)
function spawnParticles(x, y, baseColor, count = 30) {
  const br = red(baseColor);
  const bg = green(baseColor);
  const bb = blue(baseColor);

  for (let i = 0; i < count; i++) {
    let ang = random(TWO_PI);
    let speed = random(1.5, map(count, 12, 90, 2.5, 9));
    let vx = cos(ang) * speed * random(0.5, 1.5);
    let vy = sin(ang) * speed * random(0.5, 1.5);
    let life = floor(random(40, 100));
    particles.push({
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      r: random(2, 6),
      life: life,
      maxLife: life,
      color: color(br, bg, bb)
    });
  }
}

// 使用滑鼠點擊可對最近的圓產生爆破和計分
function mousePressed() {
  if (circles.length === 0) return;
  let nearest = null;
  let nd = Infinity;
  for (let i = 0; i < circles.length; i++) {
    let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
    if (d < nd) {
      nd = d;
      nearest = i;
    }
  }
  if (nearest !== null && nd < 300) { // 範圍限制，點太遠不觸發
    let c = circles[nearest];

    // === 計分邏輯 ===
    if (c.hexColor === TARGET_COLOR) {
      score += 1; // 按到 ffca3a 顏色氣球則加 1 分
    } else {
      score -= 1; // 其他顏色氣球則扣 1 分
    }
    // === 結束計分邏輯 ===

    // 產生爆破 (粒子數較多，給予互動回饋)
    spawnParticles(c.x, c.y, c.color, floor(map(c.r, 50, 200, 20, 90)));
    
    // 重置該圓
    resetCircle(c);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 重新分布圓的位置
  for (let c of circles) {
    c.x = random(width);
    c.y = random(height);
  }
}
// ...existing code...