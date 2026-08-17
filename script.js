// Join button

const joinBtn = document.getElementById("joinBtn");

joinBtn.addEventListener("click", function () {
    alert("Welcome to the FitLife Fitness Community!");
});


// Read More buttons

const readButtons = document.querySelectorAll(".read-btn");

readButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const title =
            this.parentElement.querySelector(".card-title").innerText;

        alert("You selected: " + title);

    });

});


// Navbar background on scroll

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "#000";
    } else {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    }

});