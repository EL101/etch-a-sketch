let isDrawing = false;
let isMouseDown = false;
let showCellBorders = true;
document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

const container = document.querySelector(".container");
const CONTAINER_WIDTH = container.clientWidth;

function createCells(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.toggle("row");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.toggle("cell");
            cell.addEventListener("mouseenter", (e) => {
                if (isMouseDown && isDrawing) {
                    cell.classList.add("hovered");
                }
            });
            cell.addEventListener("mousedown", () => {
                if (isDrawing) {
                    cell.classList.add("hovered");
                }
            });
            cell.style.width = CONTAINER_WIDTH / size + "px";
            cell.style.height = cell.style.width;
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