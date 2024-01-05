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

// Skill hover effect
document.addEventListener("DOMContentLoaded", function () {
    const hexagons = document.querySelectorAll(".hexagon-wrap");
    const skillInfo = document.getElementById("skill-info");
    let currentHexagon = null; // 현재 열린 헥사곤 정보를 저장하는 변수
    let isAnimating = false; // 애니메이션이 진행 중인지 여부를 확인하는 변수

    hexagons.forEach(hexagon => {
        hexagon.addEventListener("click", function (e) {
            e.stopPropagation(); // 상위로의 이벤트 전파 차단

            // .col60.skill 엘리먼트의 위치
            const col60SkillRect = document.querySelector(".col60.skill").getBoundingClientRect();

            const clickedHexagon = this;
            // 현재 클릭한 헥사곤과 이전에 열린 헥사곤이 다르면 이전 헥사곤 닫기
            if (currentHexagon !== clickedHexagon && currentHexagon) {
                currentHexagon.classList.remove("active");
                skillInfo.classList.remove("active");

                // 서서히 작아지는 효과 추가
                skillInfo.style.transform = "scale(0)";
                skillInfo.addEventListener("transitionend", function onTransitionEnd() {
                    skillInfo.removeEventListener("transitionend", onTransitionEnd);
                    skillInfo.style.display = "none";
                    isAnimating = false;
                });
            }

            // 클릭한 헥사곤에 .active 클래스 추가하여 확대 효과
            clickedHexagon.classList.add("active");
            skillInfo.classList.add("active");

            // 서서히 커지는 효과 추가
            if (!isAnimating) {
                isAnimating = true;
                skillInfo.style.display = "block";
                skillInfo.style.transform = "scale(0)";
                setTimeout(() => {
                    skillInfo.style.transform = "scale(1)";
                }, 0);
            }

            // 현재 클릭한 헥사곤 정보 저장
            currentHexagon = clickedHexagon;

            // hexagon-wrap 엘리먼트의 위치
            const hexagonRect = hexagon.getBoundingClientRect();

            // hexagon-wrap의 중심 좌표
            const hexagonCenterX = hexagonRect.left + hexagonRect.width / 2;
            const hexagonCenterY = hexagonRect.top + hexagonRect.height / 2 + 50; 


            // skillInfo의 위치를 조정 (부모 엘리먼트 위치 고려)
            skillInfo.style.left = `${hexagonCenterX - 250 / 2 - col60SkillRect.left}px`;
            skillInfo.style.top = `${hexagonCenterY - 50 / 2 - col60SkillRect.top}px`;

            // 스킬 정보 텍스트 동적으로 설정
            const skillName = this.querySelector("h4").textContent;
            const skillData = getSkillData(skillName);

            skillInfo.querySelector("h4").textContent = skillData.name;
            skillInfo.querySelector("p").textContent = skillData.description;

            // 클릭한 헥사곤에 .active 클래스 추가하여 확대 효과
            clickedHexagon.classList.add("active");
            skillInfo.classList.add("active");

            skillInfo.style.transform = "scale(1)";

            // 보여줄 때 visible 클래스 추가
            skillInfo.style.display = "block";
        });
    });

    function getSkillData(skillName) {
        // 각 스킬에 대한 정보를 반환하는 함수 (예시)
        switch (skillName) {
            case "CSS":
                return {
                    name: "CSS",
                    description: "Cascading Style Sheets로 웹 페이지의 스타일을 정의하는 데 사용됩니다."
                };
            case "HTML":
                return {
                    name: "HTML",
                    description: "Hypertext Markup Language로 웹 페이지의 구조를 정의하는 데 사용됩니다."
                };
            // 다른 스킬에 대한 정보 추가
            default:
                return {
                    name: "Unknown Skill",
                    description: "해당 스킬에 대한 정보가 없습니다."
                };
        }
    }

    // 문서 전체를 클릭했을 때 열린 헥사곤이 있으면 닫음
    document.addEventListener("click", function (e) {
        if (currentHexagon) {
            // 서서히 작아지는 효과 추가
            skillInfo.style.transform = "scale(0)";
            skillInfo.addEventListener("transitionend", function onTransitionEnd() {
                skillInfo.removeEventListener("transitionend", onTransitionEnd);
                skillInfo.style.display = "none";
                skillInfo.classList.remove("active");
                currentHexagon.classList.remove("active");
                currentHexagon = null; // 열린 헥사곤 정보 초기화
                isAnimating = false;
            });
        }
    });
});