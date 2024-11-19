document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();
});

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
        },
        error: function() {
            alert("CSV fayl yuklanishida xatolik yuz berdi.");
        }
    });
}

function buildTest(data) {
    var form = document.getElementById('testForm');
    data.forEach((question, index) => {
        var fieldset = document.createElement('fieldset');
        var legend = document.createElement('legend');
        legend.textContent = question.Question;
        fieldset.appendChild(legend);

        ['A', 'B', 'D'].forEach(key => {
            if (question[key]) {
                var label = document.createElement('label');
                var input = document.createElement('input');
                input.type = 'radio';
                input.name = 'question' + index;
                input.value = key;
                input.id = key + index;
                label.setAttribute('for', input.id);
                label.textContent = question[key];
                fieldset.appendChild(input);
                fieldset.appendChild(label);
            }
        });
        form.appendChild(fieldset);
    });

    var submitButton = document.createElement('button');
    submitButton.textContent = 'Javoblarni topshirish';
    submitButton.type = 'submit';
    form.appendChild(submitButton);
}

function submitAnswers(event) {
    event.preventDefault(); // Prevent default form submission
    // Collect answers here
    alert("Javoblaringiz qabul qilindi! Natijalar tez orada elon qilinadi.");
    window.location.href = "result.html"; // Redirect to result page after answers are submitted
}
