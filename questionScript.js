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
                alert("Test savollari yuklanmadi."); // Alert if no questions were loaded
            }
        },
        error: function () {
            alert("CSV yuklanishida xatolik yuz berdi."); // Alert on CSV load error
        },
    });
}

function buildTest(questions) {
    const form = document.getElementById("testForm");
    form.innerHTML = ""; // Clear any existing content

    questions.forEach((question, index) => {
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = `Savol ${index + 1}: ${question.Question}`; // Using "Savol" instead of "Question"
        fieldset.appendChild(legend);

        // Create a container for the question options to align them to the right
        const optionsContainer = document.createElement("div");
        optionsContainer.style.display = "flex";
        optionsContainer.style.flexDirection = "column";
        optionsContainer.style.alignItems = "flex-end";

        ['A', 'B', 'C', 'D'].forEach((key) => { // Iterate over each option
            if (question[key]) {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = key;
                label.appendChild(input);
                label.innerHTML += ` ${key}. ${question[key]}`; // Include option label
                optionsContainer.appendChild(label);
            }
        });

        fieldset.appendChild(optionsContainer);
        form.appendChild(fieldset);
    });

    // Ensure the submit button is visible and placed at the bottom
    const submitButton = document.getElementById("submitAnswersButton");
    submitButton.style.display = "block";
    submitButton.style.alignSelf = "center"; // Center the submit button
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

    // Optionally, display or store the score, e.g., save to localStorage
    localStorage.setItem("userScore", score);
    alert(`Sizning ballingiz: ${score}`); // Show an alert with the score

    // Redirect to results page or handle the scoring display differently
    window.location.href = "result.html"; // Redirect to a results page if needed
}

