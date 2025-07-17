const palette = document.getElementById('palette');
const main = document.getElementById('main');
const toggleBtn = document.getElementById('toggle-dark');
const randomBtn = document.getElementById('random-color');

// Create full preview overlay
const previewOverlay = document.createElement('div');
previewOverlay.className = 'full-preview hidden';
previewOverlay.innerHTML = `
  <div class="preview-color" id="preview-color"></div>
  <button id="close-preview">⨉ Close Preview</button>
`;
document.body.appendChild(previewOverlay);
const previewColorBox = document.getElementById('preview-color');
const closePreviewBtn = document.getElementById('close-preview');

let isDark = false;

// Generate hex colors
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

    // Mouse hover effect
    swatch.addEventListener('mouseover', () => {
      main.style.backgroundColor = color;
    });

    // Left click = copy hex
    swatch.addEventListener('click', () => {
      navigator.clipboard.writeText(color);
      showTooltip(swatch, 'Copied!');
    });

    // Right click = full page preview
    swatch.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      previewColorBox.style.backgroundColor = color;
      previewOverlay.classList.remove('hidden');
    });

    palette.appendChild(swatch);
  });
}

// Tooltip on swatch
function showTooltip(target, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  target.appendChild(tooltip);
  setTimeout(() => target.removeChild(tooltip), 1000);
}

// Close full preview
closePreviewBtn.addEventListener('click', () => {
  previewOverlay.classList.add('hidden');
});

// Generate initial palette
createPalette(generateHexColors(100));

// Toggle dark mode
toggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
});

// Apply random color
randomBtn.addEventListener('click', () => {
  const randomColor = generateHexColors(1)[0];
  main.style.backgroundColor = randomColor;
});
