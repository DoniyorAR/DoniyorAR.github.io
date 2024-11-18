function startTest() {
    var name = document.getElementById('name').value;
    var classNumber = document.getElementById('classNumber').value;
    if (name && classNumber) {
        document.getElementById('startForm').style.display = 'none'; // Hide the form
        document.getElementById('loading').style.display = 'block'; // Show loading indicator
        loadQuestions();
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}

function loadQuestions() {
    Papa.parse("https://doniyorar.github.io/math_tests.csv", {
        download: true,
        header: true,
        complete: function(results) {
            document.getElementById('loading').style.display = 'none'; // Hide loading indicator
            var data = results.data;
            var form = document.getElementById('testForm');
            data.forEach((question, index) => {
                var fieldset = document.createElement('fieldset');
                var legend = document.createElement('legend');
                legend.textContent = question.Question;
                fieldset.appendChild(legend);
                ['A', 'B', 'C', 'D'].forEach(option => {
                    if (question[option]) {
                        var label = document.createElement('label');
                        var input = document.createElement('input');
                        input.type = 'radio';
                        input.name = 'question' + index;
                        input.value = option; // Store the option letter as the value
                        label.appendChild(input);
                        label.appendChild(document.createTextNode(question[option]));
                        fieldset.appendChild(label);
                    }
                });
                form.appendChild(fieldset);
            });
            document.getElementById('testContainer').style.display = 'block'; // Show the test
        },
        error: function(err) {
            console.error("Error loading the CSV file:", err);
            alert("CSV fayl yuklanishida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        }
    });
}

function submitAnswers() {
    alert("Test submitted!");
    // Additional functionality to handle form submission can be added here
}
