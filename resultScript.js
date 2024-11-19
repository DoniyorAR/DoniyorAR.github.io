document.addEventListener("DOMContentLoaded", () => {
    fetch('user.csv', { method: 'GET' })
        .then((response) => response.text())
        .then((data) => {
            const rows = data.split("\n");
            const lastRow = rows[rows.length - 2]; // Get the last row
            const [name, classNumber, points] = lastRow.split(",");
            document.getElementById("resultsDisplay").textContent = `Ism: ${name}, Sinf: ${classNumber}, Ball: ${points}`;
        });
});
