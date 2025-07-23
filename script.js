let isDrawing = false;
let isMouseDown = false;
let showCellBorders = true;
let isShading = false;
let rainbowMode = false;
let currColor = "black";
document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

const container = document.querySelector(".container");
const CONTAINER_WIDTH = container.clientWidth;

function colorCell(e) {
    e.target.classList.add("hovered");
    if (rainbowMode) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    else {
        e.target.style.backgroundColor = currColor;
    }
    if (isShading) {
        e.target.style.opacity = +e.target.style.opacity + 0.1;
    } else {
        e.target.style.opacity = 1;
    }
}
function createCells(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.toggle("row");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.toggle("cell");
            const cellContent = document.createElement("div");
            cellContent.style.opacity = 0;
            cellContent.addEventListener("mouseenter", (e) => {
                if (isMouseDown && isDrawing) {
                    colorCell(e);
                }
            });
            cellContent.addEventListener("mousedown", (e) => {
                if (isDrawing) {
                    colorCell(e);
                }
            });
            cell.style.width = CONTAINER_WIDTH / size + "px";
            cell.style.height = cell.style.width;
            cellContent.style.width = cell.style.width;
            cellContent.style.height = cell.style.height;
            cell.append(cellContent);
            if (showCellBorders) {
                cell.classList.toggle("show-border");
            }      
            row.append(cell);
        }
        container.append(row);
    }
}

const sizeSlider = document.querySelector(".size-slider-input");
const sizeIndicator = document.querySelector(".size-indicator");
sizeIndicator.textContent = `Size: ${sizeSlider.value}x${sizeSlider.value}`;

sizeSlider.addEventListener("input", () => {
    sizeIndicator.textContent = `Size: ${sizeSlider.value}x${sizeSlider.value}`;
});

createCells(sizeSlider.value);

function deleteCanvas() {
    const rows = document.querySelectorAll(".row");
    for (let row of rows) {
        row.remove();
    }
}
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    isDrawing = !isDrawing;
    if (isDrawing) {
        startButton.textContent = "Reset";
    } else {
        startButton.textContent = "Start";
        deleteCanvas();
        createCells(sizeSlider.value);
    }
    const cells = document.querySelectorAll("cell");
    for (let cell of cells) {
        cell.classList.toggle("show-border");
    }
});

sizeSlider.addEventListener("input", (e) => {
    if (!isDrawing) {
        deleteCanvas();
        createCells(e.target.value);
    }
});

const gridButton = document.querySelector(".grid-button");
const gridSectors = document.querySelectorAll(".grid-sector");
gridButton.addEventListener("click", () => {
    for (let sector of gridSectors) {
        sector.classList.toggle("show-border");
    }
    const cells = document.querySelectorAll(".cell");
    for (let cell of cells) {
        cell.classList.toggle("show-border");
    }
    showCellBorders = !showCellBorders;
});

const shadeButton = document.querySelector(".shade-button");
shadeButton.addEventListener("click", () => {
    isShading = !isShading;
    if (isShading) {
        shadeButton.textContent = "Shading Off";
    } else {
        shadeButton.textContent = "Shading On";
    }
});

const rainbowButton = document.querySelector(".rainbow-button");
rainbowButton.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    if (rainbowMode) {
        rainbowButton.textContent = "Normal Mode";
    } else {
        rainbowButton.textContent = "Rainbow Mode";
    }
});

const colorPicker = document.querySelector(".color-picker");
const colorPickerWrapper = document.querySelector(".color-picker-wrapper");

colorPicker.addEventListener("input", () => {
    colorPickerWrapper.style.backgroundColor = colorPicker.value;
    currColor = colorPicker.value;
});
colorPickerWrapper.addEventListener("click", () => colorPicker.click());