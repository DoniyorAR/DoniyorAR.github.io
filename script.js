function startTest() {
    var name = document.getElementById('name').value;
    var classNumber = document.getElementById('classNumber').value;
    console.log("Starting test for:", name, "from class number:", classNumber); // Log to check values
    if (name && classNumber) {
        document.getElementById('startForm').style.display = 'none'; // Hide the form
        document.getElementById('loading').style.display = 'block'; // Show loading indicator
        loadQuestions();
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}

function loadQuestions() {
    console.log("Attempting to load questions from CSV file.");
    Papa.parse("https://doniyorar.github.io/math_tests.csv", {
        download: true,
        header: true,
        complete: function(results) {
            console.log("CSV parse complete:", results);
            if (results.data && results.data.length > 0) {
                buildTest(results.data);
            } else {
                console.error("No data found in CSV file.");
                alert("CSV faylida ma'lumotlar topilmadi.");
            }
            document.getElementById('loading').style.display = 'none'; // Hide loading indicator
        },
        error: function(err) {
            console.error("Error loading the CSV file:", err);
            alert("CSV fayl yuklanishida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        }
    });
}

function buildTest(questions) {
    var form = document.getElementById('testForm');
    questions.forEach((question, index) => {
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
}

function submitAnswers() {
    console.log("Submitting answers.");
    alert("Test submitted!");
    // Additional functionality to handle form submission can be added here
}
