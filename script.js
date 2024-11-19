function startTest() {
    const name = document.getElementById("name").value.trim();
    const classNumber = document.getElementById("classNumber").value.trim();

    if (name && classNumber) {
        // Save user details to localStorage
        localStorage.setItem("userName", name);
        localStorage.setItem("userClassNumber", classNumber);

        // Redirect to the question page
        window.location.href = "question.html";
    } else {
        alert("Iltimos, ismingiz va sinf raqamingizni to'ldiring!");
    }
}
