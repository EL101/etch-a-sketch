let isMouseDown = false;
document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

const container = document.querySelector(".container");
for (let i = 0; i < 16; i++) {
    const row = document.createElement("div");
    row.classList.toggle("row");
    for (let j = 0; j < 16; j++) {
        const cell = document.createElement("div");
        cell.classList.toggle("cell");
        cell.addEventListener("mouseenter", (e) => {
            if (isMouseDown) {
                cell.classList.add("hovered");
            }
        });
        cell.addEventListener("mousedown", () => cell.classList.add("hovered"));
        // cell.addEventListener("mouseleave", (e) => cell.classList.toggle("hovered"));
        row.append(cell);
    }
    container.append(row);
}