function startTest() {
    var name = document.getElementById('name').value.trim();
    var classNumber = document.getElementById('classNumber').value.trim();

    if (name && classNumber) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userClassNumber', classNumber);
        document.getElementById('startForm').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
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
    var form = document.getElementById('testForm');
    form.innerHTML = ''; // Clear previous entries

    data.forEach((question, index) => {
        var fieldset = document.createElement('fieldset');
        var legend = document.createElement('legend');
        legend.textContent = question.Question;
        fieldset.appendChild(legend);

        ['A', 'B', 'C', 'D'].forEach(key => {
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
}

function submitAnswers() {
    var userName = localStorage.getItem('userName');
    var classNumber = localStorage.getItem('userClassNumber');
    console.log("Answers submitted for:", userName, "Class:", classNumber);
    alert("Javoblarni topshirildi!");
}
