function startTest() {
    const name = document.getElementById("name").value.trim();
    const classNumber = document.getElementById("classNumber").value.trim();

    if (name && classNumber) {
        // Save user data as a new row to user.csv
        saveUserData(name, classNumber);

        // Redirect to question.html
        window.location.href = "question.html";
    } else {
        alert("Iltimos, ismingiz va sinf raqamingizni to'ldiring!");
    }
}

function saveUserData(name, classNumber) {
    const newRow = `${name},${classNumber},0\n`;
    fetch('user.csv', { method: 'GET' })
        .then((response) => response.text())
        .then((data) => {
            const updatedData = data + newRow;
            downloadCSV(updatedData, 'user.csv');
        });
}

function downloadCSV(data, filename) {
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
