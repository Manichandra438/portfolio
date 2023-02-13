


function copyText() {  
    /* Copy text into clipboard */
    navigator.clipboard.writeText
    ("manichandramr438@gmail.com");
}

function toggleNav() {
    var navMenu = document.querySelector(".nav-menu");
    navMenu.classList.toggle("show-nav");
  }


function myMood() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
});




 


console.log("Hi, There")
console.log("             This is Manichandra")
console.log("Creator of this page: manichandramr.online")
console.log("If you are wondering How i made the page")
console.log("I took reference form :")
console.log("                         https://www.codewonders.dev/")

