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
    form.innerHTML = ""; // Clear any existing content

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

    // Ensure the submit button is visible
    document.getElementById("submitAnswersButton").style.display = "block";
}

function submitAnswers() {
    const checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    // Calculate the score based on the selected answers
    checkedAnswers.forEach((answer, index) => {
        if (answer.value === questionsData[index].Correct) {
            score++;
        }
    });

    // Save the score, name, and class number to localStorage
    const name = localStorage.getItem("userName");
    const classNumber = localStorage.getItem("userClassNumber");
    localStorage.setItem("userScore", score);

    console.log(`Score saved: ${score}, Name: ${name}, Class: ${classNumber}`); // Debugging log

    // Redirect to results page
    window.location.href = "result.html";
}
