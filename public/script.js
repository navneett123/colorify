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

function createTooltip(text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  return tooltip;
}

function createPalette(colors) {
  palette.innerHTML = ''; // clear old swatches
  colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = color;
    swatch.title = color;

    const tooltip = createTooltip('Copied!');
    swatch.appendChild(tooltip);

    swatch.addEventListener('mouseover', () => {
      main.style.backgroundColor = color;
    });

    swatch.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 1000);
      });
    });

    palette.appendChild(swatch);
  });
}

// Initialize swatches
createPalette(generateHexColors(100));

// Toggle Dark Mode
toggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
});

// Set a random background color
randomBtn.addEventListener('click', () => {
  const randomColor = generateHexColors(1)[0];
  main.style.backgroundColor = randomColor;
});
