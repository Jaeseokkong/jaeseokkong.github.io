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
    strings: ["Passionate FrontEnd", "UI/UX Enthusiast", "Code Wizard", "Web Design Lover", "JavaScript Ninja"],
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
    let ing = false;

    hexagons.forEach(hexagon => {
        if(hexagon.classList.contains("empty")) return;
        hexagon.addEventListener("click", function (e) {
            e.stopPropagation(); // 상위로의 이벤트 전파 차단
            if(ing == true) return;
            // .col60.skill 엘리먼트의 위치
            const col60SkillRect = document.querySelector(".col60.skill").getBoundingClientRect();

            const clickedHexagon = this;

            const currentHexagon = document.querySelector(".hexagon-wrap.active")

            // hexagon-wrap 엘리먼트의 위치
            const hexagonRect = hexagon.getBoundingClientRect();

            // hexagon-wrap의 중심 좌표
            const hexagonCenterX = hexagonRect.left + hexagonRect.width / 2;
            const hexagonCenterY = hexagonRect.top + hexagonRect.height / 2 + 50; 

            if (currentHexagon !== clickedHexagon && currentHexagon) {
                currentHexagon.classList.remove("active");
                skillInfo.classList.remove("active");
                   
                ing = true;
                setTimeout(() => {
                    console.log('여기')
                    skillInfo.style.left = `${hexagonCenterX - 250 / 2 - col60SkillRect.left}px`;
                    skillInfo.style.top = `${hexagonCenterY - 50 / 2 - col60SkillRect.top}px`;
                        // 스킬 정보 텍스트 동적으로 설정
                    const skillName = this.querySelector("h4").textContent;
                    const skillData = getSkillData(skillName);
                    skillInfo.querySelector("h4").textContent = skillData.name;
                    skillInfo.querySelector("p").textContent = skillData.description;
                    clickedHexagon.classList.add("active");
                    skillInfo.classList.add("active"); 
                    console.log(skillName)

                    ing = false
                }, 400)
                
               
            } else if (currentHexagon === clickedHexagon) {
                //console.log('동일한 스킬 누름')                
            } else {
                skillInfo.style.left = `${hexagonCenterX - 250 / 2 - col60SkillRect.left}px`;
                skillInfo.style.top = `${hexagonCenterY - 50 / 2 - col60SkillRect.top}px`;
                const skillName = this.querySelector("h4").textContent;
                const skillData = getSkillData(skillName);
                skillInfo.querySelector("h4").textContent = skillData.name;
                skillInfo.querySelector("p").textContent = skillData.description;
                clickedHexagon.classList.add("active");
                skillInfo.classList.add("active"); 
            }


        });
    });

    function getSkillData(skillName) {
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
            case "StyledComponents":
                return {
                    name: "Styled Components",
                    description: "React 애플리케이션에서 사용되는 CSS-in-JS 라이브러리로, JavaScript를 사용하여 스타일을 정의합니다. 컴포넌트 기반 스타일링을 간편하게 구현할 수 있습니다."
                };
            case "TypeScript":
                return {
                    name: "TypeScript",
                    description: "Microsoft에 의해 개발된 오픈 소스 프로그래밍 언어로, JavaScript에 정적 타입을 추가하여 코드의 가독성과 유지 보수성을 향상시킵니다."
                };
            case "React":
                return {
                    name: "React",
                    description: "Facebook에서 개발한 JavaScript 라이브러리로, 사용자 인터페이스를 구축하기 위한 선언적이고 효율적인 방법을 제공합니다."
                };
            case "ReactNative":
                return {
                    name: "React Native",
                    description: "React를 기반으로 하는 모바일 애플리케이션 개발 프레임워크로, 하나의 코드베이스로 iOS 및 Android 앱을 개발할 수 있습니다."
                };
            case "jQuery":
                return {
                    name: "jQuery",
                    description: "경량의 크로스 플랫폼 JavaScript 라이브러리로, HTML 문서 탐색, 이벤트 핸들링, 애니메이션 및 Ajax 상호 작용을 단순화합니다."
                };
            case "JavaScript":
                return {
                    name: "JavaScript",
                    description: "웹 개발에서 가장 널리 사용되는 프로그래밍 언어 중 하나로, 동적인 웹 페이지 및 웹 애플리케이션을 구축하는 데 사용됩니다."
                };
            case "Redux":
                return {
                    name: "Redux",
                    description: "React 애플리케이션의 상태를 관리하기 위한 상태 관리 라이브러리로, 예측 가능한 상태 컨테이너를 제공합니다."
                };
            case "Firebase":
                return {
                    name: "Firebase",
                    description: "Google에서 제공하는 모바일 및 웹 애플리케이션 개발 플랫폼으로, 클라우드 기반 데이터베이스, 인증, 호스팅 등을 제공합니다."
                };
            case "RestAPI":
                return {
                    name: "RestAPI",
                    description: "Representational State Transfer의 약자로, 네트워크 아키텍처를 위한 아주 간단한 표준을 나타냅니다. HTTP를 통해 데이터를 전송합니다."
                };
            case "Nextjs":
                return {
                    name: "Next.js",
                    description: "React 기반의 JavaScript 프레임워크로, 서버 사이드 렌더링 및 정적 사이트 생성을 지원하여 웹 애플리케이션의 성능을 향상시킵니다."
                };
            case "Server":
                return {
                    name: "Server",
                    description: "웹 애플리케이션 또는 모바일 애플리케이션에서 클라이언트에게 서비스를 제공하는 컴퓨터 시스템이나 프로그램을 가리킵니다."
                };
            case "AWS":
                return {
                    name: "AWS",
                    description: "Amazon Web Services의 약자로, 클라우드 컴퓨팅 서비스를 제공하는 아마존의 플랫폼입니다."
                };
            case "Nodejs":
                return {
                    name: "Node.js",
                    description: "Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임 환경으로, 서버 사이드에서 JavaScript 코드를 실행할 수 있게 해줍니다."
                };
            case "Spring":
                return {
                    name: "Spring",
                    description: "Java 플랫폼을 위한 오픈 소스 프레임워크로, 기업급 Java 애플리케이션을 개발하기 위한 다양한 모듈을 제공합니다."
                };
            case "JAVA":
                return {
                    name: "JAVA",
                    description: "Sun Microsystems에서 개발한 객체 지향 프로그래밍 언어로, 다양한 플랫폼에서 실행될 수 있도록 설계되었습니다."
                };
            case "Expressjs":
                return {
                    name: "Express.js",
                    description: "Node.js 웹 애플리케이션을 위한 간결하고 유연한 웹 애플리케이션 프레임워크로, 빠른 개발을 위해 설계되었습니다."
                };
            case "MySQL":
                return {
                    name: "MySQL",
                    description: "오픈 소스 관계형 데이터베이스 관리 시스템(RDBMS)으로, 다양한 응용 프로그램을 위해 데이터를 저장 및 관리합니다."
                };
            case "Figma":
                return {
                    name: "Figma",
                    description: "웹 기반의 인터페이스 및 그래픽 디자인 도구로, 팀원과 함께 협업하며 디자인을 생성 및 수정할 수 있습니다."
                };
            default:
                return {
                    name: "알 수 없는 스킬",
                    description: "해당 스킬에 대한 정보가 없습니다."
                };
        }
    }

    // 문서 전체를 클릭했을 때 열린 헥사곤이 있으면 닫음
    document.addEventListener("click", function (e) {
        const currentHexagon = document.querySelector(".hexagon-wrap.active")

        if (currentHexagon) {
            skillInfo.classList.remove("active");
            currentHexagon.classList.remove("active");
        }
    });
});