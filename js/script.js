function myMenuFunction() {
    const menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu") menuBtn.className += " responsive"
    else menuBtn.className = "nav-menu"
}

// Dark Mode 
const body = document.querySelector("body");
toggleSwitch = document.getElementById("toggle-switch");

toggleSwitch.addEventListener('click', () => {
    body.classList.toggle("dark")
});

// Typing Effect
const typingEffect = new Typed(".typedText", {
    strings: ["Passionate FrontEnd Developer", "UI/UX Enthusiast", "Code Wizard", "Web Design Lover", "JavaScript Ninja"],
    loop: true,
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 2000,
});

// Scroll animation
const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
});

sr.reveal(".featured-name", { delay: 100 })
sr.reveal(".text-info", { delay: 200 });
sr.reveal(".text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
//sr.reveal(".featured-image", { delay: 320 });

sr.reveal(".project-box", { interval: 200 });
sr.reveal(".top-header", {});

const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srLeft.reveal(".about-info", { delay: 100 })
srLeft.reveal(".contact-info", { delay: 100 })

const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srRight.reveal(".skill", { delay: 100 })
srRight.reveal(".skill-box", { delay: 100 })

const srBottom = ScrollReveal({
    origin: "bottom",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srBottom.reveal(".form-control", { delay: 100 })

// active link
const sections = document.querySelectorAll(".section[id]");
function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId= current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionTop + sectionHeight) {
            document.querySelectorAll(".nav-menu a[href*=" + sectionId + "]").classList.add("active-link");
        } else {
            document.querySelectorAll(".nav-menu a[href*=" + sectionId + "]").classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);


// url 이동
const socialIcons = document.querySelector(".social_icons")
socialIcons.addEventListener('click', function (e) {
    let targetIcon = e.target;

    if(targetIcon.tagName === 'IMG'){
        targetIcon = targetIcon.parentElement;
    }

    targetIcon = targetIcon.closest('.icon');

    if (targetIcon) {
        const url = targetIcon.getAttribute("url");
        if (url) {
            window.open(url, "_blank")
        }
    }
})
