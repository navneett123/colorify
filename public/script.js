const palette = document.getElementById('palette');
const main = document.getElementById('main');

function generateHexColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        colors.push(color);
    }
    return colors;
}

function createPalette(colors) {
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

const hexColors = generateHexColors(192);
createPalette(hexColors);
