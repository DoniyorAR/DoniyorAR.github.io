document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("userName");
    const classNumber = localStorage.getItem("userClassNumber");
    const score = localStorage.getItem("userScore");

    // Check if the required data is available
    if (name && classNumber && score !== null) {
        const resultsDisplay = document.getElementById("resultsDisplay");
        resultsDisplay.textContent = `Ism: ${name}, Sinf: ${classNumber}, Ball: ${score}`;
    } else {
        // Handle case where data is missing
        document.getElementById("resultsDisplay").textContent = "Xatolik yuz berdi! Natijalar topilmadi.";
    }
});
