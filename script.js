const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let width, height;
let showMatrix = false;
const symbols = ['𓂀', '𐘀', '𐘁', '𐘂', '𐘃', '𐘄', '𐘅', 'ϟ', 'φ', '∿', 'ψ', 'κ', 'θ', '🝞', '☯', '✶', '⟁', '⚛', '⟲', '∞'];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let stars = Array(222).fill().map(() => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: Math.random() * 1.5 + 0.5,
  dx: Math.random() * 0.5 - 0.25,
  dy: Math.random() * 0.5 - 0.25
}));

// Matrix weave: 10 horizontal + 10 vertical lines, with interactive nodes at intersections
const numLines = 10;
const matrixNodes = [];
for (let i = 0; i < numLines; i++) {
  for (let j = 0; j < numLines; j++) {
    const node = document.createElement('div');
    node.className = 'matrix-node';
    node.style.left = `${(width / numLines) * j}px`;
    node.style.top = `${(height / numLines) * i}px`;
    node.addEventListener('click', () => {
      node.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
      alert('Node entangled! Strength: ' + Math.random().toFixed(3));
    });
    document.body.appendChild(node);
    matrixNodes.push(node);
  }
}

function drawMatrix() {
  if (!showMatrix) return;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  // Horizontal lines
  for (let i = 0; i < numLines; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (height / numLines) * i);
    ctx.lineTo(width, (height / numLines) * i + Math.sin(Date.now() / 1000 + i) * 10);
    ctx.stroke();
  }
  // Vertical lines
  for (let j = 0; j < numLines; j++) {
    ctx.beginPath();
    ctx.moveTo((width / numLines) * j, 0);
    ctx.lineTo((width / numLines) * j + Math.cos(Date.now() / 1000 + j) * 10, height);
    ctx.stroke();
  }
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > width) s.dx *= -1;
    if (s.y < 0 || s.y > height) s.dy *= -1;
  });
  drawMatrix();
  requestAnimationFrame(animateStars);
}
animateStars();

// Floating symbols
function spawnSymbol() {
  const symbol = document.createElement('div');
  symbol.className = 'floating-symbol';
  symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  symbol.style.left = `${Math.random() * width}px`;
  symbol.style.top = `${Math.random() * height}px`;
  symbol.addEventListener('click', () => {
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.transform = `rotate(${Math.random() * 360}deg)`;
    alert('Symbol rotated through dimension!');
  });
  document.body.appendChild(symbol);
  setInterval(() => {
    symbol.style.left = `${parseFloat(symbol.style.left) + (Math.random() - 0.5) * 2}px`;
    symbol.style.top = `${parseFloat(symbol.style.top) + (Math.random() - 0.5) * 2}px`;
  }, 100);
}
for (let i = 0; i < 10; i++) spawnSymbol();

// Black cat floating
const cat = document.getElementById('black-cat');
let catX = Math.random() * width;
let catY = Math.random() * height;
let catDX = Math.random() * 1 - 0.5;
let catDY = Math.random() * 1 - 0.5;
function animateCat() {
  catX += catDX;
  catY += catDY;
  if (catX < 0 || catX > width - 20) catDX *= -1;
  if (catY < 0 || catY > height - 20) catDY *= -1;
  cat.style.left = `${catX}px`;
  cat.style.top = `${catY}px`;
  requestAnimationFrame(animateCat);
}
animateCat();

// Controls
function toggleMatrix() {
  showMatrix = !showMatrix;
  matrixNodes.forEach(node => node.style.display = showMatrix ? 'block' : 'none');
}
toggleMatrix(); // Initial hide

function generatePulse() {
  const log = document.getElementById('entanglement-log');
  log.textContent += '\nPulse generated: ' + Math.random().toString(2).substring(2, 18) + ' ϟ φ';
  log.scrollTop = log.scrollHeight;
}

function resetEntanglement() {
  const log = document.getElementById('entanglement-log');
  log.textContent = log.textContent.split('# ── ΔX∞_BINARY-PULSE')[0] + '# ── ΔX∞_BINARY-PULSE :: RESET ─────────────\nstatus: RESET';
  stars.forEach(s => {
    s.dx = Math.random() * 0.5 - 0.25;
    s.dy = Math.random() * 0.5 - 0.25;
  });
}

// Signature & timestamp
function signIn() {
  const name = document.getElementById('visitor-name').value.trim();
  if (name) {
    const log = document.getElementById('timestamp-log');
    const time = new Date().toLocaleString();
    const entry = document.createElement('div');
    entry.textContent = `𐘀 ${name} signed at ${time}`;
    log.appendChild(entry);
  }
}

// Fibonacci Generator
let f0 = 0, f1 = 1;
const fiboEl = document.getElementById('fibonacci');
setInterval(() => {
  const next = f0 + f1;
  fiboEl.textContent = `Φ: ${next}`;
  f0 = f1;
  f1 = next;
  if (f1 > 999999) {
    f0 = 0;
    f1 = 1;
  }
}, 2000);

// AI Chat Integration (using xAI Grok API)

async function sendChat() {
  const input = document.getElementById('chat-input').value.trim();
  if (!input) return;

  const log = document.getElementById('chat-log');
  const userEntry = document.createElement('div');
  userEntry.textContent = `You: ${input}`;
  log.appendChild(userEntry);
  log.scrollTop = log.scrollHeight;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: input }],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();
    const aiEntry = document.createElement('div');
    aiEntry.textContent = `AI: ${aiResponse}`;
    log.appendChild(aiEntry);
    log.scrollTop = log.scrollHeight;
  } catch (error) {
    const errorEntry = document.createElement('div');
    errorEntry.textContent = `Error: ${error.message}`;
    log.appendChild(errorEntry);
    log.scrollTop = log.scrollHeight;
  }

  document.getElementById('chat-input').value = '';
}
