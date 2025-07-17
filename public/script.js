const palette = document.getElementById('palette');
const main = document.getElementById('main');
const toggleBtn = document.getElementById('toggle-dark');
const randomBtn = document.getElementById('random-color');

let isDark = false;

// Generate random hex color array
function generateHexColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    colors.push(color);
  }
  return colors;
}

// Create swatches
function createPalette(colors) {
  palette.innerHTML = '';
  colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = color;
    swatch.title = color;

    // Tooltip for copied hex
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = 'Copied!';
    swatch.appendChild(tooltip);

    // Hover changes main UI background
    swatch.addEventListener('mouseover', () => {
      main.style.backgroundColor = color;
    });

    // Click to copy hex
    swatch.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        swatch.classList.add('show-tooltip');
        setTimeout(() => swatch.classList.remove('show-tooltip'), 1000);
      });
    });

    palette.appendChild(swatch);
  });
}

// Setup
createPalette(generateHexColors(100));

// Toggle Dark Mode
toggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
});

// Apply random color to main background
randomBtn.addEventListener('click', () => {
  const randomColor = generateHexColors(1)[0];
  main.style.backgroundColor = randomColor;
});
