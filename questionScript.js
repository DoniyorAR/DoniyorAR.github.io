let questionsData = [];

document.addEventListener("DOMContentLoaded", () => {
    loadQuestions();
});

function loadQuestions() {
    Papa.parse("math_tests.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            if (results.data.length > 0) {
                questionsData = results.data;
                buildTest(questionsData);
            } else {
                alert("Test savollari yuklanmadi.");
            }
        },
        error: function () {
            alert("CSV yuklanishida xatolik yuz berdi.");
        },
    });
}

function buildTest(questions) {
    const form = document.getElementById("testForm");

    questions.forEach((question, index) => {
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = question.Question;
        fieldset.appendChild(legend);

        ["A", "B", "D"].forEach((key) => {
            if (question[key]) {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "question" + index;
                input.value = key;
                label.appendChild(input);
                label.appendChild(document.createTextNode(question[key]));
                fieldset.appendChild(label);
            }
        });

        form.appendChild(fieldset);
    });
}

function submitAnswers() {
    const checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    checkedAnswers.forEach((answer, index) => {
        if (answer.value === questionsData[index].Correct) {
            score++;
        }
    });

    updatePoints(score);
}

function updatePoints(score) {
    const name = localStorage.getItem("userName");
    const classNumber = localStorage.getItem("userClassNumber");

    fetch('user.csv', { method: 'GET' })
        .then((response) => response.text())
        .then((data) => {
            const rows = data.split("\n");
            const updatedRows = rows.map((row, index) => {
                if (index === rows.length - 2) {
                    // Update the Points column for the last added row
                    return `${name},${classNumber},${score}`;
                }
                return row;
            });

            const updatedData = updatedRows.join("\n");
            downloadCSV(updatedData, 'user.csv');

            // Redirect to result.html
            window.location.href = "result.html";
        });
}
