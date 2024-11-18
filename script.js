<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script>
function startTest() {
    var name = document.getElementById('name').value;
    var classNumber = document.getElementById('classNumber').value;
    console.log("Attempting to start test for:", name, ", class:", classNumber);
    if (name && classNumber) {
        document.getElementById('startForm').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        loadQuestions();
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}

function loadQuestions() {
    console.log("Loading questions from CSV...");
    Papa.parse("https://doniyorar.github.io/math_tests.csv", {
        download: true,
        header: true,
        complete: function(results) {
            console.log("Questions loaded:", results);
            if (results.data && results.data.length > 0) {
                buildTest(results.data);
            } else {
                console.error("No data found in CSV.");
                alert("CSV faylida ma'lumotlar topilmadi.");
            }
            document.getElementById('loading').style.display = 'none';
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
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(question[option]));
                fieldset.appendChild(label);
            }
        });
        form.appendChild(fieldset);
    });
    document.getElementById('testContainer').style.display = 'block';
}

function submitAnswers() {
    console.log("Answers submitted.");
    alert("Test submitted!");
}
</script>
