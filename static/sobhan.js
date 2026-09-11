const edge = document.querySelector(".edge");

if (edge) {
    edge.classList.add("animate");

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            edge.classList.remove("animate");
            void edge.offsetWidth;
            edge.classList.add("animate");
        }
    });
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const menuOverlay = document.querySelector(".menu-overlay");

let scrollPosition = 0;

menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("active");

    menuToggle.classList.toggle("active");
    menuOverlay.classList.toggle("active");

    if (isOpen) {

        // ذخیره موقعیت فعلی صفحه
        scrollPosition = window.scrollY;

        // قفل کامل صفحه
        document.body.classList.add("menu-open");

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";

    } else {

        // باز کردن صفحه
        document.body.classList.remove("menu-open");

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        // برگشت به همان جای قبلی
        window.scrollTo(0, scrollPosition);
    }
});


menuOverlay.addEventListener("click", () => {

    mainNav.classList.remove("active");
    menuToggle.classList.remove("active");
    menuOverlay.classList.remove("active");

    document.body.classList.remove("menu-open");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollPosition);
});


const header = document.querySelector(".site-header");
const sections = document.querySelectorAll("[data-theme]");

function changeHeaderTheme(section) {

    header.classList.remove("dark", "light");

    const theme = section.dataset.theme;

    if (theme === "dark") {
        header.classList.add("dark");
    }

    if (theme === "light") {
        header.classList.add("light");
    }
}


const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            changeHeaderTheme(entry.target);
        }

    });

}, {
    threshold: 0.7
});


sections.forEach(section => observer.observe(section));
if (sections.length > 0) {
    changeHeaderTheme(sections[0]);
}



const moreLink = document.querySelector(".about-logos");

if (moreLink) {
    moreLink.addEventListener("click", () => {
        sessionStorage.setItem(
            "homeScrollPosition",
            window.scrollY
        );
    });
}

if (window.location.pathname === "/") {

    window.history.scrollRestoration = "manual";

    window.addEventListener("load", () => {

        const savedPosition =
            sessionStorage.getItem("homeScrollPosition");

        if (savedPosition !== null) {

            window.scrollTo(0, 0);

            setTimeout(() => {

                window.scrollTo({
                    top: Number(savedPosition),
                    behavior : "smooth"
                });

                sessionStorage.removeItem("homeScrollPosition");

            },  300);
        }
    });
}

