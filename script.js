var questionsData; // This will hold the questions data once loaded

function startTest() {
    var name = document.getElementById('name').value.trim();
    var classNumber = document.getElementById('classNumber').value.trim();

    if (name && classNumber) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userClassNumber', classNumber);
        document.getElementById('startForm').style.display = 'none';
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
                questionsData = results.data;
                buildTest(questionsData);
                document.getElementById('loading').style.display = 'none';
                document.getElementById('testContainer').style.display = 'block';
            } else {
                alert("Test savollari yuklanmadi.");
            }
        },
        error: function() {
            alert("CSV fayl yuklanishida xatolik yuz berdi.");
        }
    });
}

function buildTest(data) {
    var form = document.createElement('form');
    form.id = 'testForm';
    document.body.appendChild(form);

    data.forEach((question, index) => {
        var fieldset = document.createElement('fieldset');
        var legend = document.createElement('legend');
        legend.textContent = question.Question;
        fieldset.appendChild(legend);

        ['A', 'B', 'D'].forEach(key => {  // Reflect the absence of option C
            if (question[key]) {
                var label = document.createElement('label');
                var input = document.createElement('input');
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

    var submitButton = document.createElement('button');
    submitButton.textContent = 'Javoblarni topshirish';
    submitButton.type = 'button';
    submitButton.onclick = submitAnswers;
    form.appendChild(submitButton);
}

function submitAnswers() {
    var userName = localStorage.getItem('userName');
    var classNumber = localStorage.getItem('userClassNumber');
    var results = collectAnswers(); 

    var allResults = JSON.parse(localStorage.getItem('userResults')) || [];
    allResults.push({ name: userName, classNumber: classNumber, points: results.points });
    localStorage.setItem('userResults', JSON.stringify(allResults));

    alert("Javoblarni topshirildi!");
}

function collectAnswers() {
    var checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    var points = 0;
    checkedAnswers.forEach(answer => {
        var questionIndex = parseInt(answer.name.replace('question', ''));
        var correctAnswer = questionsData[questionIndex].Correct;
        if (answer.value === correctAnswer) {
            points += 1;
        }
    });
    return { points };
}

function downloadResults() {
    var results = JSON.parse(localStorage.getItem('userResults')) || [];
    var csvContent = "data:text/csv;charset=utf-8,Name,ClassNumber,Points\n";
    results.forEach(function(result) {
        csvContent += `${result.name},${result.classNumber},${result.points}\n`;
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "test_results.csv");
    link.click();
}
