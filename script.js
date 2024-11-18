// Function to start the test and save user data to local storage
function startTest() {
    var name = document.getElementById('name').value;
    var classNumber = document.getElementById('classNumber').value;
    console.log("Attempting to start test for:", name, ", class:", classNumber); // Log the inputs for debugging
    
    if (name && classNumber) {
        // Save user data to local storage
        localStorage.setItem('userName', name);
        localStorage.setItem('userClassNumber', classNumber);

        // Hide the start form and show the loading indicator
        document.getElementById('startForm').style.display = 'none';
        document.getElementById('loading').style.display = 'block';

        // Load questions from the CSV file
        loadQuestions();
    } else {
        // Alert if the required fields are not filled
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}

// Function to load questions from a CSV file using PapaParse
function loadQuestions() {
    Papa.parse("https://doniyorar.github.io/math_tests.csv", {
        download: true,
        header: true,
        complete: function(results) {
            console.log("Questions loaded:", results); // Log the results for debugging
            
            // Hide the loading indicator
            document.getElementById('loading').style.display = 'none';

            if (results.data && results.data.length > 0) {
                // Build the test if data is found
                buildTest(results.data);
            } else {
                // Error handling if no data is found
                console.error("No data found in CSV file.");
                alert("CSV faylida ma'lumotlar topilmadi.");
            }
        },
        error: function(err) {
            // Log and alert if there's an error loading the CSV file
            console.error("Error loading the CSV file:", err);
            alert("CSV fayl yuklanishida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        }
    });
}

// Function to build the test form dynamically with fetched questions
function buildTest(questions) {
    var form = document.getElementById('testForm');
    form.innerHTML = ''; // Clear any existing content

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
    document.getElementById('testContainer').style.display = 'block'; // Display the test
}

// Function to handle submitting the answers
function submitAnswers() {
    var userName = localStorage.getItem('userName');
    var userClassNumber = localStorage.getItem('userClassNumber');
    
    console.log("Submitting answers for:", userName, "from class:", userClassNumber); // Log the submission details
    alert("Test submitted for " + userName + " from class " + userClassNumber + ".");
    // Here, add logic to handle answer checking, scoring, etc.
}
