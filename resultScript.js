document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("userName");
    const classNumber = localStorage.getItem("userClassNumber");
    const score = parseInt(localStorage.getItem("userScore"), 10);

    const resultsDisplay = document.getElementById("resultsDisplay");

    // Determine the emoji based on the score
    let emoji = '';
    if (score < 5) {
        emoji = '😔';  // Sad smile
    } else if (score >= 5 && score < 8) {
        emoji = '🙂';  // Good smile
    } else if (score >= 8) {
        emoji = '😂';  // Laugh smile
    }

    // Display the results with the appropriate emoji
    if (name && classNumber && !isNaN(score)) {
        resultsDisplay.textContent = `Ism: ${name}, Sinf: ${classNumber}, Ball: ${score} ${emoji}`;
    } else {
        resultsDisplay.textContent = 'Xatolik yuz berdi! Natijalar topilmadi.';
    }
});
