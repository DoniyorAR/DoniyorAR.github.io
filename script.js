function submitForm() {
    const name = document.getElementById('name').value.trim();
    const classNumber = document.getElementById('classNumber').value.trim();
    
    if (name && classNumber) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userClassNumber', classNumber);
        window.location.href = 'question.html';  // Redirects to question.html
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}
