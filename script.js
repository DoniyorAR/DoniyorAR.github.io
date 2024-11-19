function startTest() {
    const name = document.getElementById('name').value.trim();
    const classNumber = document.getElementById('classNumber').value.trim();
    if (name && classNumber) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userClassNumber', classNumber);
        document.getElementById('userInputSection').style.display = 'none';
        document.getElementById('questionsSection').style.display = 'block';
        loadQuestions();
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}

function loadQuestions() {
    Papa.parse("https://doniyorar.github.io/math_tests.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            if (results.data.length > 0) {
                buildTest(results.data);
            } else {
                alert("Test savollari yuklanmadi.");
            }
        }
    });
}

function buildTest(questions) {
    const form = document.getElementById('testForm');
    questions.forEach((question, index) => {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = question.Question;
        fieldset.appendChild(legend);

        ['A', 'B', 'D'].forEach(key => {
            if (question[key]) {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'question' + index;
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
    checkedAnswers.forEach(answer => {
        const questionIndex = parseInt(answer.name.replace('question', ''));
        const correctAnswer = questionsData[questionIndex].Correct;
        if (answer.value === correctAnswer) {
            score++;
        }
    });

    document.getElementById('questionsSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsDisplay').textContent = `Sizning natijangiz: ${score}`;
}
