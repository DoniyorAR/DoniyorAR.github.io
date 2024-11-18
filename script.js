function startTest() {
    var name = document.getElementById('name').value;
    var classNumber = document.getElementById('classNumber').value;
    if (name && classNumber) {
        alert("Assalomu alaykum, " + name + "!\nSizning sinf raqamingiz: " + classNumber + "\nTestni endi boshlash mumkin.");
        // Here you can redirect to the test page or do other actions
    } else {
        alert("Ism va sinf raqamini to'liq kiriting!");
    }
}
