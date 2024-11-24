<!-- Include SheetJS library from CDN for reading Excel files -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>

<script>
let questionsData = [];

document.addEventListener("DOMContentLoaded", () => {
    loadQuestions();
});

function loadQuestions() {
    const request = new XMLHttpRequest();
    request.open('GET', 'updated_questions2.xlsx', true);
    request.responseType = 'arraybuffer';

    request.onload = function(e) {
        const data = new Uint8Array(request.response);
        const workbook = XLSX.read(data, {type: 'array'});

        // Assuming your Excel file has one sheet and the required data is on the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, {header:1});

        // Convert array of arrays (json) to array of objects assuming the first row as header
        if (json.length > 1) {
            const keys = json.shift(); // Remove the first row and use it as keys for objects
            questionsData = json.map((row) => {
                let obj = {};
                row.forEach((cell, index) => {
                    obj[keys[index]] = cell;
                });
                return obj;
            });
            buildTest(questionsData);
        } else {
            alert("Test savollari yuklanmadi.");
        }
    };

    request.onerror = function() {
        alert("Excel yuklanishida xatolik yuz berdi.");
    };

    request.send();
}

function buildTest(questions) {
    const form = document.getElementById("testForm");
    form.innerHTML = "";

    questions.forEach((question, index) => {
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.innerHTML = `<strong>Savol ${index + 1}:</strong> ${question.Question}`;
        fieldset.appendChild(legend);

        ['A', 'B', 'C', 'D'].forEach((key) => {
            if (question[key]) {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = key;
                label.appendChild(input);
                label.innerHTML += ` ${key}. ${question[key]}`;
                fieldset.appendChild(label);
            }
        });

        form.appendChild(fieldset);
    });

    const submitButton = document.getElementById("submitAnswersButton");
    submitButton.style.display = "block";
    submitButton.style.alignSelf = "center";
}

function submitAnswers() {
    const checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    checkedAnswers.forEach((answer, index) => {
        if (answer.value === questionsData[index].Correct) {
            score++;
        }
    });

    localStorage.setItem("userScore", score);
    alert(`Sizning ballingiz: ${score}`);
    window.location.href = "result.html";
}
</script>
