const palette = document.getElementById('palette');
const main = document.getElementById('main');
const toggleBtn = document.getElementById('toggle-dark');
const randomBtn = document.getElementById('random-color');

let isDark = false;

function generateHexColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    colors.push(color);
  }
  return colors;
}

function createPalette(colors) {
  palette.innerHTML = '';
  colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = color;
    swatch.title = color;

    swatch.addEventListener('mouseover', () => {
      main.style.backgroundColor = color;
    });

    palette.appendChild(swatch);
  });
}

createPalette(generateHexColors(100));

toggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
});

randomBtn.addEventListener('click', () => {
  const randomColor = generateHexColors(1)[0];
  main.style.backgroundColor = randomColor;
});
