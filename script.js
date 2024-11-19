document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners
    document.getElementById("startButton").addEventListener("click", startTest);
    document.getElementById("submitAnswersButton").addEventListener("click", submitAnswers);
});

let questionsData = []; // To store loaded questions

function startTest() {
    const name = document.getElementById("name").value.trim();
    const classNumber = document.getElementById("classNumber").value.trim();

    if (name && classNumber) {
        // Save user details
        localStorage.setItem("userName", name);
        localStorage.setItem("userClassNumber", classNumber);

        // Hide the user input section
        document.getElementById("userInputSection").style.display = "none";

        // Show the questions section
        document.getElementById("questionsSection").style.display = "block";

        // Load questions
        loadQuestions();
    } else {
        alert("Iltimos, ismingiz va sinf raqamingizni to'ldiring!");
    }
}

function loadQuestions() {
    Papa.parse("https://doniyorar.github.io/math_tests.csv", {
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
            alert("CSV fayl yuklanishida xatolik yuz berdi.");
        },
    });
}

function buildTest(questions) {
    const form = document.getElementById("testForm");
    form.innerHTML = ""; // Clear existing content if any

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

    // Show the submit button
    document.getElementById("submitAnswersButton").style.display = "block";
}

function submitAnswers() {
    const checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    checkedAnswers.forEach((answer) => {
        const questionIndex = parseInt(answer.name.replace("question", ""));
        const correctAnswer = questionsData[questionIndex].Correct;
        if (answer.value === correctAnswer) {
            score++;
        }
    });

    // Hide the questions section and show the results section
    document.getElementById("questionsSection").style.display = "none";
    document.getElementById("resultsSection").style.display = "block";

    // Display the results
    const name = localStorage.getItem("userName");
    const classNumber = localStorage.getItem("userClassNumber");
    document.getElementById("resultsDisplay").textContent = `${name} (${classNumber}), Sizning natijangiz: ${score}`;
}
