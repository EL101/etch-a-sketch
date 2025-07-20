let isMouseDown = false;
document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

const container = document.querySelector(".container");
const CONTAINER_WIDTH = 500;
function createCells(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.toggle("row");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.toggle("cell");
            cell.addEventListener("mouseenter", (e) => {
                if (isMouseDown) {
                    cell.classList.add("hovered");
                }
            });
            cell.addEventListener("mousedown", () => cell.classList.add("hovered"));
            cell.style.width = CONTAINER_WIDTH / size + "px";
            cell.style.height = cell.style.width;            
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

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    const rows = document.querySelectorAll(".row");
    for (let row of rows) {
        row.remove();
    }
    createCells(sizeSlider.value);
});