function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    console.log("submitForm function is called");
    const name = document.getElementById('name').value.trim();
    const classNumber = document.getElementById('classNumber').value.trim();
    
    if (name && classNumber) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userClassNumber', classNumber);
        console.log("Redirecting to question.html");
        window.location.href = 'question.html';
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}
