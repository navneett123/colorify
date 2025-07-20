const palette = document.getElementById('palette');
const main = document.getElementById('main');
const toggleBtn = document.getElementById('toggle-dark');
const randomBtn = document.getElementById('random-color');
const brightnessSlider = document.getElementById('brightness');
const favoritesList = document.getElementById('favorites-list');

let isDark = false;
let currentColor = '#ffffff';

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

function applyBrightness() {
  const brightnessValue = brightnessSlider.value;
  main.style.filter = `brightness(${brightnessValue}%)`;
}

function addToFavorites(color) {
  const fav = document.createElement('div');
  fav.className = 'favorite-swatch';
  fav.style.backgroundColor = color;
  fav.title = color;
  fav.onclick = () => {
    currentColor = color;
    main.style.backgroundColor = color;
  };
  favoritesList.appendChild(fav);
}

function createPalette(colors) {
  palette.innerHTML = '';
  colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = color;
    swatch.title = color;

    const tooltip = createTooltip('Copied!');
    swatch.appendChild(tooltip);

    swatch.addEventListener('mouseover', () => {
      currentColor = color;
      main.style.backgroundColor = color;
    });

    swatch.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 1000);
        addToFavorites(color);
      });
    });

    palette.appendChild(swatch);
  });
}

// Initialize
createPalette(generateHexColors(100));
applyBrightness();

// Toggle Dark Mode
toggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
});

// Random Color Button
randomBtn.addEventListener('click', () => {
  const randomColor = generateHexColors(1)[0];
  currentColor = randomColor;
  main.style.backgroundColor = randomColor;
  addToFavorites(randomColor);
});

// Brightness Slider
brightnessSlider.addEventListener('input', applyBrightness);
