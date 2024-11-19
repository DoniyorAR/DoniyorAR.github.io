document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("userName");
    const classNumber = localStorage.getItem("userClassNumber");
    const score = localStorage.getItem("userScore");

    if (name && classNumber && score !== null) {
        document.getElementById("resultsDisplay").textContent = `Ism: ${name}, Sinf: ${classNumber}, Ball: ${score}`;
    } else {
        document.getElementById("resultsDisplay").textContent = "Xatolik yuz berdi! Natijalar topilmadi.";
    }
});
