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
            console.log(sectionId)
            console.log(document.querySelectorAll(".nav-menu a[href*=" + sectionId + "]"))
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll(".nav-menu a[href*=" + sectionId + "]")[0].classList.add("active-link");
        } else {
            document.querySelectorAll(".nav-menu a[href*=" + sectionId + "]")[0].classList.remove("active-link");
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


// chip 이벤트
document.addEventListener('DOMContentLoaded', () => {
    const chips = document.querySelectorAll('.chip');

    chips.forEach(chip => {
        const chipBg = chip.querySelector('.chip-bg');
        const project = chip.querySelector('.project-img');

        let width = 0;
        let height = 0;
        let mouseX = 0;
        let mouseY = 0;
        let mouseLeaveDelay = null;

        function handleMouseMove(e) {
            const rect = chip.getBoundingClientRect();
            if (width === 0 || height === 0) {
                width = chip.offsetWidth;
                height = chip.offsetHeight;
            }
            mouseX = e.clientX - rect.left - width / 2;
            mouseY = e.clientY - rect.top - height / 2;

            requestAnimationFrame(() => {
                const rX = (mouseX / width) * 20;
                const rY = (mouseY / height) * -20;
                const tX = (mouseX / width) * -40;
                const tY = (mouseY / height) * -40;
                chip.style.transition = 'transform 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95), margin-top 0.3s ease-in-out';
                chip.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg) translateZ(20px)`;

                project.style.transition = 'transform 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95), margin-top 0.3s ease-in-out';
                project.style.transform = `rotateY(${-rX}deg) rotateX(${-rY}deg) translateZ(20px)`;
            });
        }

        function handleMouseEnter() {
            clearTimeout(mouseLeaveDelay);
        }

        function handleMouseLeave() {
            mouseLeaveDelay = setTimeout(() => {
                mouseX = 0;
                mouseY = 0;
                chip.style.transition = 'transform 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)';
                chip.style.transform = 'rotateY(0deg) rotateX(0deg)';

                project.style.transition = 'transform 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)';
                project.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }, 1000);
        }

        function handleClick() {
            chip.classList.toggle('active')
        }

        chip.addEventListener('mousemove', handleMouseMove);
        chip.addEventListener('mouseenter', handleMouseEnter);
        chip.addEventListener('mouseleave', handleMouseLeave);
        chip.addEventListener('click', handleClick);
    });
});