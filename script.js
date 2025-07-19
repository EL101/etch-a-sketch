const container = document.querySelector(".container");
for (let i = 0; i < 16; i++) {
    const row = document.createElement("div");
    row.classList.toggle("row");
    for (let j = 0; j < 16; j++) {
        const cell = document.createElement("div");
        cell.textContent = "bro";
        row.append(cell);
    }
    container.append(row);
}