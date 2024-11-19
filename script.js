function submitForm() {
    const name = document.getElementById('name').value.trim();
    const classNumber = document.getElementById('classNumber').value.trim();
    
    if (name && classNumber) {
        // Save user data to localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userClassNumber', classNumber);
        // Redirect to the question page
        window.location.href = 'question.html';
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}
