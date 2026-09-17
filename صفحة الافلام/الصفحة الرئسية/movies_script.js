/*
==================================================
مشروع : SFV-X Movies Empire
المطور : Muhammad Wael
الجزء : 1.1
الوصف : قاعدة البيانات + بيانات اللاعب + الإعدادات
==================================================
*/


// ==========================================
// 1) قاعدة بيانات الأفلام
// ==========================================

// ملاحظة:
// يمكنك إضافة آلاف الأفلام بنفس هذا الشكل.
// لا تغيّر أسماء الخصائص حتى تعمل جميع أجزاء الموقع.

const moviesDatabase = [

    {

        id: 1,

        title: "صرخة النيل: رعب مصري",

        category: "egypt",

        type: "movie",

        year: 2026,

        rating: 8.9,

        quality: "4K",

        xp: 50,

        poster: "images/movie1.jpg",

        description:
        "فيلم رعب مصري يدور حول أسطورة قديمة تعود للحياة داخل إحدى القرى."

    },



    {

        id: 2,

        title: "Dead Silence",

        category: "usa",

        type: "movie",

        year: 2007,

        rating: 8.7,

        quality: "FHD",

        xp: 20,

        poster: "images/movie2.jpg",

        description:
        "فيلم رعب أمريكي مشهور يعتمد على الدمى المسكونة."

    },



    {

        id: 3,

        title: "Demon Slayer",

        category: "japan",

        type: "anime",

        year: 2024,

        rating: 9.8,

        quality: "4K",

        xp: 35,

        poster: "images/movie3.jpg",

        description:
        "واحد من أشهر أعمال الأنمي الحديثة."

    }

];




// ==========================================
// 2) بيانات اللاعب
// ==========================================

// يتم تحميل البيانات من LocalStorage.
// وإذا لم توجد بيانات يتم إنشاء قيم افتراضية.

const sfvxUser = {

    name:

        localStorage.getItem("sfvx_name")
        || "Muhammad Wael",


    level:

        Number(
            localStorage.getItem("sfvx_level")
        ) || 1,


    xp:

        Number(
            localStorage.getItem("sfvx_xp")
        ) || 0,


    watched:

        Number(
            localStorage.getItem("sfvx_watched")
        ) || 0,


    favorites:

        JSON.parse(

            localStorage.getItem(
                "sfvx_favorites"
            )

        ) || []


};




// ==========================================
// 3) إعدادات المشروع
// ==========================================

// جميع القيم الثابتة توضع هنا.

const SFVX = {

    XP_PER_LEVEL: 1000,

    MAX_RENDER: 24,

    VERSION: "3.0"

};




// ==========================================
// 4) حفظ بيانات اللاعب
// ==========================================

// يتم استدعاؤها بعد أي تعديل.

function saveUserData() {

    localStorage.setItem(
        "sfvx_name",
        sfvxUser.name
    );

    localStorage.setItem(
        "sfvx_level",
        sfvxUser.level
    );

    localStorage.setItem(
        "sfvx_xp",
        sfvxUser.xp
    );

    localStorage.setItem(
        "sfvx_watched",
        sfvxUser.watched
    );

    localStorage.setItem(

        "sfvx_favorites",

        JSON.stringify(
            sfvxUser.favorites
        )

    );

}// ==========================================
// 5) حساب مستوى اللاعب
// ==========================================

// يتم حساب المستوى بناءً على نقاط XP.

function calculateLevel() {

    const newLevel =

        Math.floor(
            sfvxUser.xp / SFVX.XP_PER_LEVEL
        ) + 1;


    // إذا لم يتغير المستوى فلا داعي للتحديث.
    if (newLevel === sfvxUser.level) {

        return;

    }


    sfvxUser.level = newLevel;

    saveUserData();


    // عرض رسالة عند الترقية.
    showAchievementToast(

        "🎉 ترقية جديدة",

        "أصبحت الآن Level " + newLevel

    );


    updatePlayerInterface();

}




// ==========================================
// 6) إضافة XP للاعب
// ==========================================

// تستخدم عند مشاهدة فيلم أو تنفيذ مهمة.

function addXP(amount, reason = "") {

    if (amount <= 0) {

        return;

    }


    sfvxUser.xp += amount;


    saveUserData();

    calculateLevel();

    updatePlayerInterface();


    showAchievementToast(

        "+" + amount + " XP",

        reason

    );

}




// ==========================================
// 7) تحديث واجهة اللاعب
// ==========================================

// تحديث المستوى وشريط XP.

function updatePlayerInterface() {

    // المستوى

    const levelElement =

        document.getElementById(
            "user-level"
        );


    if (levelElement) {

        levelElement.textContent =
            "Level " + sfvxUser.level;

    }



    // قيمة XP الحالية

    const xpValue =

        document.getElementById(
            "current-xp-value"
        );


    if (xpValue) {

        xpValue.textContent =
            sfvxUser.xp.toLocaleString();

    }



    // شريط XP

    const xpBar =

        document.querySelector(
            ".xp-bar-inner"
        );


    if (xpBar) {

        const progress =

            (sfvxUser.xp % SFVX.XP_PER_LEVEL)

            /

            SFVX.XP_PER_LEVEL

            *

            100;


        xpBar.style.width =
            progress + "%";

    }


}




// ==========================================
// 8) نظام الإنجازات
// ==========================================

// رسالة صغيرة تظهر أسفل الشاشة.

function showAchievementToast(title, message) {

    const toast =

        document.createElement("div");


    toast.className =
        "achievement-toast";


    toast.innerHTML = `

        <div class="toast-icon">

            <i class="fas fa-trophy"></i>

        </div>

        <div class="toast-content">

            <h5>${title}</h5>

            <p>${message}</p>

        </div>

    `;


    document.body.appendChild(toast);


    // تشغيل الحركة

    setTimeout(() => {

        toast.classList.add("active");

    }, 50);


    // إخفاء الرسالة بعد 4 ثوانٍ

    setTimeout(() => {

        toast.classList.remove("active");


        setTimeout(() => {

            toast.remove();

        }, 500);

    }, 4000);

}




// ==========================================
// 9) مكافأة مشاهدة فيلم
// ==========================================

// تستدعى بعد بدء تشغيل الفيلم.

function rewardWatching(movie) {

    if (!movie) {

        return;

    }


    sfvxUser.watched++;

    saveUserData();


    addXP(

        movie.xp,

        "تمت مشاهدة " + movie.title

    );

}

/*
==========================================
15. نظام فتح وإغلاق السايد بار
==========================================
*/

// فتح وإغلاق القائمة الجانبية
function toggleSidebar() {

    const sidebar = document.getElementById("main-sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("active");

}



/*
==========================================
16. زر القائمة في الموبايل
==========================================
*/

function setupMobileMenu() {

    // يدعم الاسم القديم والجديد للزر
    const menuButton =
        document.querySelector(".mobile-menu-toggle") ||
        document.querySelector(".menu-trigger");

    if (!menuButton) return;

    menuButton.addEventListener("click", function (e) {

        e.stopPropagation();

        toggleSidebar();

    });

}



/*
==========================================
17. إغلاق القائمة عند الضغط خارجها
==========================================
*/

document.addEventListener("click", function (e) {

    const sidebar = document.getElementById("main-sidebar");

    if (!sidebar) return;

    const menuButton =
        document.querySelector(".mobile-menu-toggle") ||
        document.querySelector(".menu-trigger");

    if (
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        menuButton &&
        !menuButton.contains(e.target)
    ) {

        sidebar.classList.remove("active");

    }

});

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 2.1
الوصف : إنشاء كارت الفيلم
==================================================
*/

// ==========================================
// إنشاء كارت الفيلم
// ==========================================

function createMovieCard(movie) {

    // التأكد من وجود بيانات الفيلم
    if (!movie) return "";

    return `

        <div class="movie-card" data-id="${movie.id}">

            <div class="poster-container">

                <span class="quality-tag">
                    ${movie.quality}
                </span>

                <span class="episode-tag">
                    ${capitalize(movie.type)}
                </span>

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                    loading="lazy">

                <div class="poster-overlay">

                    <button
                        class="play-btn"
                        onclick="playMovie(${movie.id})">

                        <i class="fas fa-play"></i>

                    </button>

                    <button
                        class="favorite-btn"
                        onclick="toggleFavorite(${movie.id})">

                        <i class="fas fa-heart"></i>

                    </button>

                </div>

            </div>

            <div class="movie-info">

                <h4>${movie.title}</h4>

                <div class="movie-meta">

                    <span>${movie.year}</span>

                    <span>
                        ${capitalize(movie.type)}
                    </span>

                </div>

                <div class="movie-rating">

                    <i class="fas fa-star"></i>

                    ${movie.rating}

                </div>

                <div class="xp-reward">

                    +${movie.xp} XP

                </div>

            </div>

        </div>

    `;

}

// ==========================================
// تحويل أول حرف إلى Capital
// ==========================================

function capitalize(text) {

    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);

}

/*
// ==========================================
==================================================
مشروع : SFV-X Movies Empire
الجزء : 2.2
الوصف : عرض الأفلام داخل الشبكة
==================================================
*/

// ==========================================
// عدد الأفلام المعروضة في كل مرة
// ==========================================
let currentLimit = 12;

// ==========================================
// عرض الأفلام داخل الشبكة
// ==========================================
function renderMovies(list = currentMovies) {

    const grid = document.getElementById("dynamic-movie-grid");
    const counter = document.getElementById("total-movies-count");
    const loadMoreBtn = document.getElementById("load-more-trigger");

    if (!grid) return;

    grid.innerHTML = "";

    // تحديث عدد النتائج
    if (counter) {
        counter.textContent = list.length;
    }

    // في حالة عدم وجود نتائج
    if (list.length === 0) {

        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-film"></i>
                <h3>لا توجد نتائج</h3>
                <p>جرّب البحث أو تغيير التصنيف.</p>
            </div>
        `;

        if (loadMoreBtn) {
            loadMoreBtn.style.display = "none";
        }

        return;
    }

    // تحديد عدد الأفلام التي سيتم عرضها
    const moviesToShow = list.slice(0, currentLimit);

    moviesToShow.forEach(movie => {

        grid.insertAdjacentHTML(
            "beforeend",
            createMovieCard(movie)
        );

    });

    // التحكم في زر تحميل المزيد
    if (loadMoreBtn) {

        if (currentLimit >= list.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "inline-flex";
        }

    }

}

// ==========================================
// إعادة ضبط العرض
// ==========================================
function resetMoviesView() {

    currentLimit = 12;

    renderMovies(currentMovies);

}

// ==========================================
// تحميل المزيد
// ==========================================
function loadMoreMovies() {

    currentLimit += 12;

    renderMovies(currentMovies);

}

// ==========================================
// ربط زر تحميل المزيد
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    const loadMoreBtn =
        document.getElementById("load-more-trigger");

    if (loadMoreBtn) {

        loadMoreBtn.addEventListener(
            "click",
            loadMoreMovies
        );

    }

});

/*
==========================================
Part 2.3
البحث + الفلترة + الترتيب
==========================================
*/

// القائمة الحالية المعروضة
let currentMovies = [];

// ===============================
// البحث
// ===============================
function searchMovies(keyword) {

    keyword = keyword.trim().toLowerCase();

    currentLimit = 12;

    if (!keyword) {

        currentMovies = [...moviesDatabase];
        renderMovies(currentMovies);
        return;

    }

    currentMovies = moviesDatabase.filter(movie =>

        movie.title.toLowerCase().includes(keyword) ||
        movie.category.toLowerCase().includes(keyword) ||
        movie.type.toLowerCase().includes(keyword) ||
        String(movie.year).includes(keyword)

    );

    renderMovies(currentMovies);

}

// ===============================
// الفلترة حسب التصنيف
// ===============================
function filterMovies(category = "all") {

    currentLimit = 12;

    if (category === "all") {

        currentMovies = [...moviesDatabase];

    } else {

        currentMovies = moviesDatabase.filter(movie =>

            movie.category === category ||
            movie.type === category

        );

    }

    renderMovies(currentMovies);

}

// ===============================
// تهيئة البيانات عند فتح الموقع
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    currentMovies = [...moviesDatabase];

    renderMovies(currentMovies);

});

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 2.4
الوصف : تشغيل البحث وتحميل البيانات عند فتح الموقع
==================================================
*/

// ==========================================
// تشغيل الموقع بعد تحميل الصفحة
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // الحصول على حقل البحث
    const searchInput =
        document.getElementById("main-search-input");

    // تفعيل البحث المباشر أثناء الكتابة
    if (searchInput) {

        searchInput.addEventListener(
            "input",
            (event) => {

                searchMovies(event.target.value);

            }
        );

    }

    // تحميل جميع الأفلام لأول مرة
    currentMovies = [...moviesDatabase];

    renderMovies(currentMovies);

});

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 3.1
الوصف : القائمة الجانبية والتنقل العام
المطور : Muhammad Wael
==================================================
*/

/*=========================================
=            عناصر القائمة الجانبية
=========================================*/

const sidebar =
    document.getElementById("main-sidebar");

const menuButton =
    document.getElementById("menu-toggle");

const sidebarOverlay =
    document.getElementById("sidebar-overlay");


/*=========================================
=            فتح القائمة
=========================================*/

function openSidebar() {

    if (!sidebar) return;

    sidebar.classList.add("active");

    document.body.classList.add("sidebar-open");

    if (sidebarOverlay) {

        sidebarOverlay.classList.add("active");

    }

}


/*=========================================
=            إغلاق القائمة
=========================================*/

function closeSidebar() {

    if (!sidebar) return;

    sidebar.classList.remove("active");

    document.body.classList.remove("sidebar-open");

    if (sidebarOverlay) {

        sidebarOverlay.classList.remove("active");

    }

}


/*=========================================
=            تبديل حالة القائمة
=========================================*/

function toggleSidebar() {

    if (!sidebar) return;

    sidebar.classList.contains("active")
        ? closeSidebar()
        : openSidebar();

}


/*=========================================
=            إغلاق القائمة عند الضغط خارجها
=========================================*/

document.addEventListener("click", (event) => {

    if (!sidebar) return;

    if (!sidebar.classList.contains("active"))
        return;

    const clickedInside =
        sidebar.contains(event.target);

    const clickedMenu =
        menuButton &&
        menuButton.contains(event.target);

    if (!clickedInside && !clickedMenu) {

        closeSidebar();

    }

});


/*=========================================
=            ربط زر القائمة
=========================================*/

if (menuButton) {

    menuButton.addEventListener("click", function (event) {

        event.preventDefault();

        event.stopPropagation();

        toggleSidebar();

    });

}


/*=========================================
=            إغلاق القائمة بزر ESC
=========================================*/

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeSidebar();

    }

});


/*=========================================
=            إغلاق القائمة بعد الضغط على أي رابط
=========================================*/

if (sidebar) {

    sidebar.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            closeSidebar();

        });

    });

}


/*=========================================
=            تحديد الصفحة الحالية
=========================================*/

const currentPage = window.location.pathname;

document.querySelectorAll(".sidebar a").forEach(link => {

    if (link.href.includes(currentPage)) {

        link.classList.add("active");

    }

});

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 3.2
الوصف : زر العودة للأعلى + تأثيرات التمرير
المطور : Muhammad Wael
==================================================
*/

/*=========================================
=            زر العودة للأعلى
=========================================*/

const scrollTopButton =
    document.getElementById("scroll-to-top");

const footerScrollButton =
    document.getElementById("scrollTopFooter");


/*=========================================
=            إظهار وإخفاء الزر
=========================================*/

function toggleScrollButton() {

    const scrollPosition =
        window.scrollY;

    if (scrollTopButton) {

        if (scrollPosition >= 500) {

            scrollTopButton.classList.add("show");

        } else {

            scrollTopButton.classList.remove("show");

        }

    }

}


/*=========================================
=            الصعود لأعلى الصفحة
=========================================*/

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/*=========================================
=            ربط الأزرار
=========================================*/

if (scrollTopButton) {

    scrollTopButton.addEventListener(

        "click",

        scrollToTop

    );

}

if (footerScrollButton) {

    footerScrollButton.addEventListener(

        "click",

        scrollToTop

    );

}


/*=========================================
=            متابعة التمرير
=========================================*/

window.addEventListener(

    "scroll",

    toggleScrollButton

);


/*=========================================
=            تشغيل الحالة عند فتح الصفحة
=========================================*/

toggleScrollButton();


/*=========================================
=            Scroll Reveal بسيط للأقسام
=========================================*/

const revealElements =
    document.querySelectorAll("section");

function revealOnScroll() {

    const trigger =
        window.innerHeight - 120;

    revealElements.forEach(section => {

        const top =
            section.getBoundingClientRect().top;

        if (top < trigger) {

            section.classList.add("show");

        }

    });

}

window.addEventListener(

    "scroll",

    revealOnScroll

);

revealOnScroll();

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 3.3
الوصف : Loader + Notifications + Live Counters
المطور : Muhammad Wael
==================================================
*/


/*=========================================
=            Page Loader
=========================================*/

const pageLoader =
    document.getElementById("pageLoader");


window.addEventListener("load", () => {

    if (!pageLoader) return;

    setTimeout(() => {

        pageLoader.style.opacity = "0";

        pageLoader.style.pointerEvents = "none";

        setTimeout(() => {

            pageLoader.remove();

        }, 500);

    }, 400);

});


/*=========================================
=            Notification System
=========================================*/

const notificationBox =
    document.getElementById("notificationBox");


function showNotification(

    message,

    type = "success",

    duration = 3000

) {

    if (!notificationBox) return;

    notificationBox.innerHTML = `

        <div class="notification ${type}">

            <i class="fas fa-bell"></i>

            <span>${message}</span>

        </div>

    `;

    notificationBox.classList.add("show");

    setTimeout(() => {

        notificationBox.classList.remove("show");

    }, duration);

}


/*=========================================
=            العدادات المباشرة
=========================================*/

const liveCounters = {

    visitors: 1402,

    monthly: 45890,

    watching: 158,

    movies: moviesDatabase.length

};


function updateCounters() {

    const visitors =
        document.getElementById("daily-visitors");

    const monthly =
        document.getElementById("monthly-hits");

    const watching =
        document.getElementById("live-users-count");

    const movies =
        document.getElementById("movies-counter");


    if (visitors)
        visitors.textContent =
            liveCounters.visitors.toLocaleString();

    if (monthly)
        monthly.textContent =
            liveCounters.monthly.toLocaleString();

    if (watching)
        watching.textContent =
            liveCounters.watching.toLocaleString();

    if (movies)
        movies.textContent =
            liveCounters.movies.toLocaleString();

}


/*=========================================
=            تحديث المشاهدين أونلاين
=========================================*/

function updateOnlineUsers() {

    liveCounters.watching +=
        Math.floor(Math.random() * 7) - 3;

    if (liveCounters.watching < 80)
        liveCounters.watching = 80;

    updateCounters();

}


/*=========================================
=            بدء العدادات
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    updateCounters();

    setInterval(

        updateOnlineUsers,

        5000

    );

});

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 3.4
الوصف : الأصوات + التهيئة النهائية
المطور : Muhammad Wael
==================================================
*/


/*=========================================
=            صوت الضغط
=========================================*/

const clickSound =
    document.getElementById("clickSound");


function playClickSound() {

    if (!clickSound) return;

    clickSound.currentTime = 0;

    clickSound.play().catch(() => {});

}


/*=========================================
=            تشغيل الصوت لكل الأزرار
=========================================*/

document.addEventListener("click", (event) => {

    const element = event.target.closest(

        "button, a, .movie-card"

    );

    if (!element) return;

    playClickSound();

});


/*=========================================
=            اختصار لوحة المفاتيح
=========================================*/

document.addEventListener("keydown", (event) => {

    // Ctrl + /
    if (event.ctrlKey && event.key === "/") {

        event.preventDefault();

        const search =
            document.getElementById(
                "main-search-input"
            );

        if (search) {

            search.focus();

        }

    }

});


/*=========================================
=            تهيئة مكتبة AOS
=========================================*/

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 700,

        once: true,

        offset: 60

    });

}


/*=========================================
=            تهيئة Swiper
=========================================*/

if (

    typeof Swiper !== "undefined" &&

    document.querySelector(".swiper")

) {

    new Swiper(".swiper", {

        slidesPerView: 1,

        spaceBetween: 20,

        loop: true,

        autoplay: {

            delay: 5000

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true

        }

    });

}


/*=========================================
=            رسالة بدء التشغيل
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log(

        "%cSFV-X Movies Empire Started",

        "color:#8a2be2;font-size:16px;font-weight:bold"

    );

});

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 4.1
الوصف : تجهيز البيانات وتوزيع المحتوى
المطور : Muhammad Wael
==================================================
*/

/*=========================================
=            أقسام الصفحة
=========================================*/

const sections = {

    hero:
        document.getElementById("hero-slider"),

    trending:
        document.getElementById("trending-slider"),

    latestMovies:
        document.getElementById("latest-movies"),

    latestSeries:
        document.getElementById("latest-series"),

    anime:
        document.getElementById("anime-grid"),

    donghua:
        document.getElementById("donghua-grid"),

    cartoon:
        document.getElementById("cartoon-grid"),

    continueWatching:
        document.getElementById("continue-watching"),

    recommended:
        document.getElementById("recommended-grid")

};


/*=========================================
=            استخراج البيانات
=========================================*/

function getMoviesByType(type) {

    return moviesDatabase.filter(

        movie => movie.type === type

    );

}


function getMoviesByCategory(category) {

    return moviesDatabase.filter(

        movie => movie.category === category

    );

}


/*=========================================
=            أحدث الأفلام
=========================================*/

function getLatestMovies(limit = 12) {

    return [...moviesDatabase]

        .sort((a, b) => b.year - a.year)

        .slice(0, limit);

}


/*=========================================
=            الأعلى تقييماً
=========================================*/

function getTopRated(limit = 10) {

    return [...moviesDatabase]

        .sort((a, b) => b.rating - a.rating)

        .slice(0, limit);

}


/*=========================================
=            اقتراحات للمستخدم
=========================================*/

function getRecommended(limit = 12) {

    return [...moviesDatabase]

        .sort(() => Math.random() - 0.5)

        .slice(0, limit);

}


/*=========================================
=            المتابعة لاحقاً
=========================================*/

function getContinueWatching() {

    return moviesDatabase.slice(0, 6);

}


/*=========================================
=            تنظيف أي عنصر
=========================================*/

function clearContainer(container) {

    if (!container) return;

    container.innerHTML = "";

}


/*=========================================
=            إضافة مجموعة كروت
=========================================*/

function appendMovies(container, list) {

    if (!container) return;

    clearContainer(container);

    list.forEach(movie => {

        container.insertAdjacentHTML(

            "beforeend",

            createMovieCard(movie)

        );

    });

}

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 4.2
الوصف : Hero + Trending + Latest Movies
المطور : Muhammad Wael
==================================================
*/


/*=========================================
=            Hero Section
=========================================*/

function renderHeroMovies() {

    const heroContainer =
        document.getElementById("hero-slider");

    if (!heroContainer) return;

    const heroMovies =
        getTopRated(5);

    if (!heroMovies.length) return;

    clearContainer(heroContainer);

    heroMovies.forEach(movie => {

        heroContainer.insertAdjacentHTML(
            "beforeend",
            `
            <div class="swiper-slide hero-slide">

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                    loading="lazy"
                >

                <div class="hero-content">

                    <span class="hero-quality">
                        ${movie.quality}
                    </span>

                    <h2>
                        ${movie.title}
                    </h2>

                    <div class="hero-meta">

                        <span>
                            ${movie.year}
                        </span>

                        <span>
                            ⭐ ${movie.rating}
                        </span>

                        <span>
                            +${movie.xp} XP
                        </span>

                    </div>

                    <button
                        type="button"
                        onclick="openMovieDetails(${movie.id})"
                    >
                        <i class="fas fa-play"></i>
                        شاهد الآن
                    </button>

                </div>

            </div>
            `
        );

    });

}


/*=========================================
=            Trending
=========================================*/

function renderTrendingMovies() {

    const trendingContainer =
        document.getElementById("trending-slider");

    if (!trendingContainer) return;

    const trendingMovies =
        getTopRated(10);

    if (!trendingMovies.length) return;

    clearContainer(trendingContainer);

    trendingMovies.forEach((movie, index) => {

        trendingContainer.insertAdjacentHTML(
            "beforeend",
            `
            <div
                class="swiper-slide trending-card"
                data-id="${movie.id}"
            >

                <span class="trending-number">
                    ${index + 1}
                </span>

                ${createMovieCard(movie)}

            </div>
            `
        );

    });

}


/*=========================================
=            أحدث الأفلام
=========================================*/

function renderLatestMovies() {

    const container =
        document.getElementById("latest-movies");

    if (!container) return;

    const latestMovies =
        getLatestMovies(12);

    appendMovies(
        container,
        latestMovies
    );

}


/*=========================================
=            تشغيل القسم
=========================================*/

function initPart42() {

    renderHeroMovies();

    renderTrendingMovies();

    renderLatestMovies();

}


/*=========================================
=            تشغيل بعد تحميل الصفحة
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    initPart42
);

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 4.3
الوصف : المسلسلات + الأنمي + الدونغهوا + الكرتون
المطور : Muhammad Wael
==================================================
*/


/*=========================================
=            جلب العناصر حسب النوع
=========================================*/

function getContentByType(type, limit = 12) {

    return moviesDatabase
        .filter(movie => movie.type === type)
        .slice(0, limit);

}


/*=========================================
=            أحدث المسلسلات
=========================================*/

function renderLatestSeries() {

    const container =
        document.getElementById("latestSeries");

    if (!container) return;

    const series =
        getContentByType("series", 12);

    appendMovies(
        container,
        series
    );

}


/*=========================================
=            أحدث الأنمي
=========================================*/

function renderAnime() {

    const container =
        document.getElementById("animeContainer");

    if (!container) return;

    const anime =
        getContentByType("anime", 12);

    appendMovies(
        container,
        anime
    );

}


/*=========================================
=            أحدث الدونغهوا
=========================================*/

function renderDonghua() {

    const container =
        document.getElementById("donghuaContainer");

    if (!container) return;

    const donghua =
        getContentByType("donghua", 12);

    appendMovies(
        container,
        donghua
    );

}


/*=========================================
=            الكرتون والأنيميشن
=========================================*/

function renderCartoon() {

    const container =
        document.getElementById("cartoonContainer");

    if (!container) return;

    const cartoon =
        getContentByType("cartoon", 12);

    appendMovies(
        container,
        cartoon
    );

}


/*=========================================
=            تشغيل جميع الأقسام
=========================================*/

function initContentSections() {

    renderLatestSeries();

    renderAnime();

    renderDonghua();

    renderCartoon();

}


/*=========================================
=            تشغيل بعد تحميل الصفحة
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    initContentSections
);

 /*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 4.4
الوصف : ملخصات الأفلام + أكمل المشاهدة
المطور : Muhammad Wael
==================================================
*/


// ==========================================
// ملخصات الأفلام
// ==========================================

function renderMovieSummaries() {

    const container =
        document.getElementById("summaryContainer");

    if (!container) return;

    // اختيار مجموعة من الأفلام للملخصات
    const summaries =
        getTopRated(8);

    appendMovies(
        container,
        summaries
    );
}


// ==========================================
// قراءة قائمة أكمل المشاهدة
// ==========================================

function getContinueMovies() {

    const saved =
        localStorage.getItem("sfvx_continue_watching");

    if (!saved) return [];

    try {

        const ids = JSON.parse(saved);

        return ids
            .map(id =>
                moviesDatabase.find(
                    movie => movie.id === Number(id)
                )
            )
            .filter(Boolean);

    } catch (error) {

        console.warn(
            "تعذر قراءة قائمة المشاهدة:",
            error
        );

        return [];

    }
}


// ==========================================
// حفظ فيلم في أكمل المشاهدة
// ==========================================

function addToContinueWatching(movieId) {

    const movie =
        moviesDatabase.find(
            item => item.id === Number(movieId)
        );

    if (!movie) return;

    let continueMovies =
        getContinueMovies()
            .map(item => item.id);

    // إزالة الفيلم إذا كان موجودًا
    continueMovies =
        continueMovies.filter(
            id => id !== movie.id
        );

    // وضع الفيلم في البداية
    continueMovies.unshift(movie.id);

    // الاحتفاظ بآخر 12 فيلمًا فقط
    continueMovies =
        continueMovies.slice(0, 12);

    localStorage.setItem(
        "sfvx_continue_watching",
        JSON.stringify(continueMovies)
    );

    renderContinueWatching();
}


// ==========================================
// عرض أكمل المشاهدة
// ==========================================

function renderContinueWatching() {

    const container =
        document.getElementById("continueWatching");

    if (!container) return;

    const continueMovies =
        getContinueMovies();

    // لا توجد أفلام تمت مشاهدتها
    if (!continueMovies.length) {

        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-clock-rotate-left"></i>

                <h3>
                    لا توجد أفلام قيد المشاهدة
                </h3>

                <p>
                    ابدأ مشاهدة فيلم وسيظهر هنا.
                </p>
            </div>
        `;

        return;
    }

    appendMovies(
        container,
        continueMovies
    );
}


// ==========================================
// تهيئة أقسام Part 4.4
// ==========================================

function initPart44() {

    renderMovieSummaries();

    renderContinueWatching();

}


// ==========================================
// تشغيل بعد تحميل الصفحة
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initPart44
);

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 4.5
الوصف : التهيئة النهائية وربط أقسام المحتوى
المطور : Muhammad Wael
==================================================
*/


// ==========================================
// تهيئة Slider الخاص بـ Trending
// ==========================================

function initTrendingSlider() {

    const slider =
        document.querySelector("#trending-slider");

    if (!slider) return;

    // التأكد من وجود مكتبة Swiper
    if (typeof Swiper === "undefined") return;

    // منع إنشاء Slider أكثر من مرة
    if (slider.dataset.swiperReady === "true") {
        return;
    }

    const wrapper =
        slider.closest(".swiper");

    if (!wrapper) return;

    new Swiper(wrapper, {

        slidesPerView: 2,

        spaceBetween: 15,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        breakpoints: {

            480: {
                slidesPerView: 2
            },

            768: {
                slidesPerView: 3
            },

            1024: {
                slidesPerView: 5
            },

            1400: {
                slidesPerView: 6
            }

        }

    });

    slider.dataset.swiperReady = "true";

}


// ==========================================
// تهيئة Hero Slider
// ==========================================

function initHeroSlider() {

    const slider =
        document.querySelector("#hero-slider");

    if (!slider) return;

    if (typeof Swiper === "undefined") return;

    const wrapper =
        slider.closest(".swiper");

    if (!wrapper) return;

    if (slider.dataset.swiperReady === "true") {
        return;
    }

    new Swiper(wrapper, {

        slidesPerView: 1,

        spaceBetween: 0,

        loop: true,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }

    });

    slider.dataset.swiperReady = "true";

}


// ==========================================
// تحديث عدد المحتوى
// ==========================================

function updateContentCounter() {

    const counter =
        document.getElementById("movies-counter");

    if (!counter) return;

    counter.textContent =
        moviesDatabase.length.toLocaleString();

}


// ==========================================
// تشغيل Part 4 بالكامل
// ==========================================

function initPart4() {

    // تحديث عدد المحتوى
    updateContentCounter();

    // إعادة عرض الأقسام الرئيسية
    renderHeroMovies();

    renderTrendingMovies();

    renderLatestMovies();

    renderLatestSeries();

    renderAnime();

    renderDonghua();

    renderCartoon();

    renderMovieSummaries();

    renderContinueWatching();

    // تشغيل الـ Sliders بعد إنشاء المحتوى
    initHeroSlider();

    initTrendingSlider();

}


// ==========================================
// تشغيل بعد تحميل الصفحة
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initPart4
);

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 5.1
الوصف : نظام تفاصيل الفيلم وفتح الـ Movie Overlay
المطور : Muhammad Wael
==================================================
*/


// ==========================================
// بيانات الفيلم المحدد حاليًا
// ==========================================

let selectedMovie = null;


// ==========================================
// عناصر الـ Overlay
// ==========================================

function getMovieOverlay() {

    return document.querySelector(".movie-overlay");

}


// ==========================================
// البحث عن فيلم بواسطة ID
// ==========================================

function findMovie(movieId) {

    return moviesDatabase.find(
        movie => movie.id === Number(movieId)
    );

}


// ==========================================
// فتح تفاصيل الفيلم
// ==========================================

function openMovieDetails(movieId) {

    const movie =
        findMovie(movieId);

    if (!movie) {

        showNotification(
            "الفيلم غير موجود",
            "error"
        );

        return;

    }

    selectedMovie = movie;

    const overlay =
        getMovieOverlay();

    if (!overlay) {

        console.warn(
            "Movie overlay غير موجود في HTML"
        );

        return;

    }

    // تعبئة بيانات الفيلم
    updateMovieOverlay(movie);

    // إظهار الـ Overlay
    overlay.style.display = "flex";

    // منع تمرير الصفحة خلف النافذة
    document.body.classList.add(
        "overlay-open"
    );

}


// ==========================================
// تحديث بيانات الـ Overlay
// ==========================================

function updateMovieOverlay(movie) {

    const title =
        document.querySelector(".overlay-title");

    const description =
        document.querySelector(".overlay-description");

    const poster =
        document.querySelector(".overlay-poster img");


    if (title) {

        title.textContent =
            movie.title;

    }


    if (description) {

        description.textContent =
            movie.description ||
            "استمتع بمشاهدة هذا العمل بجودة عالية على SFV-X.";

    }


    if (poster) {

        poster.src =
            movie.poster;

        poster.alt =
            movie.title;

    }


    // تحديث بيانات إضافية إن كانت موجودة
    const quality =
        document.querySelector(".overlay-quality");

    const rating =
        document.querySelector(".overlay-rating");

    const year =
        document.querySelector(".overlay-year");


    if (quality) {

        quality.textContent =
            movie.quality;

    }


    if (rating) {

        rating.textContent =
            `⭐ ${movie.rating}`;

    }


    if (year) {

        year.textContent =
            movie.year;

    }

}


// ==========================================
// إغلاق الـ Overlay
// ==========================================

function closeMovieOverlay() {

    const overlay =
        getMovieOverlay();

    if (!overlay) return;

    overlay.style.display =
        "none";

    document.body.classList.remove(
        "overlay-open"
    );

    selectedMovie = null;

}


// ==========================================
// ربط زر الإغلاق
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const closeButton =
            document.querySelector(".close-overlay");

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeMovieOverlay
            );

        }

    }
);


// ==========================================
// إغلاق عند الضغط على خلفية الـ Overlay
// ==========================================

document.addEventListener(
    "click",
    event => {

        const overlay =
            getMovieOverlay();

        if (!overlay) return;

        if (event.target === overlay) {

            closeMovieOverlay();

        }

    }
);


// ==========================================
// إغلاق باستخدام زر ESC
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            selectedMovie
        ) {

            closeMovieOverlay();

        }

    }
);

/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 5.2
الوصف : تشغيل الفيلم + XP + أكمل المشاهدة
المطور : Muhammad Wael
==================================================
*/


// ==========================================
// حالة المشاهدة الحالية
// ==========================================

let currentPlayingMovie = null;

let movieRewardGiven = false;


// ==========================================
// تشغيل الفيلم
// ==========================================

function playMovie(movieId = null) {

    const id =
        movieId !== null
            ? movieId
            : selectedMovie?.id;

    if (!id) {

        showNotification(
            "اختر فيلمًا أولًا",
            "error"
        );

        return;

    }


    const movie =
        findMovie(id);

    if (!movie) {

        showNotification(
            "تعذر العثور على الفيلم",
            "error"
        );

        return;

    }


    currentPlayingMovie = movie;

    movieRewardGiven = false;


    // حفظ الفيلم في أكمل المشاهدة
    if (
        typeof addToContinueWatching ===
        "function"
    ) {

        addToContinueWatching(movie.id);

    }


    // مكافأة بداية المشاهدة
    rewardMovieWatch(movie);


    // إغلاق نافذة التفاصيل
    closeMovieOverlay();


    // فتح مشغل السينما
    openCinemaPlayer(movie);

}


// ==========================================
// مكافأة المشاهدة
// ==========================================

function rewardMovieWatch(movie) {

    if (!movie) return;

    if (movieRewardGiven) return;

    movieRewardGiven = true;


    if (
        typeof rewardWatching ===
        "function"
    ) {

        rewardWatching(movie);

        return;

    }


    // حماية في حالة عدم وجود نظام XP
    if (
        typeof updateXP ===
        "function"
    ) {

        updateXP(
            movie.xp || 0,
            `شاهدت ${movie.title}`
        );

    }

}


// ==========================================
// فتح وضع السينما
// ==========================================

function openCinemaPlayer(movie) {

    const cinemaOverlay =
        document.querySelector(
            ".cinema-overlay"
        );

    if (!cinemaOverlay) {

        showNotification(
            `بدأ تشغيل: ${movie.title}`,
            "success"
        );

        return;

    }


    cinemaOverlay.style.display =
        "flex";

    document.body.classList.add(
        "cinema-mode-active"
    );


    // تحديث عنوان المشغل إن وجد
    const playerTitle =
        cinemaOverlay.querySelector(
            ".cinema-title"
        );

    if (playerTitle) {

        playerTitle.textContent =
            movie.title;

    }


    // تحديث صورة الفيلم إن وجدت
    const playerImage =
        cinemaOverlay.querySelector(
            "img"
        );

    if (playerImage) {

        playerImage.src =
            movie.poster;

        playerImage.alt =
            movie.title;

    }


    showNotification(
        `جاري تشغيل: ${movie.title}`,
        "success"
    );

}


// ==========================================
// إغلاق وضع السينما
// ==========================================

function closeCinemaPlayer() {

    const cinemaOverlay =
        document.querySelector(
            ".cinema-overlay"
        );

    if (cinemaOverlay) {

        cinemaOverlay.style.display =
            "none";

    }


    document.body.classList.remove(
        "cinema-mode-active"
    );


    currentPlayingMovie = null;

}


// ==========================================
// إغلاق السينما بزر ESC
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            currentPlayingMovie
        ) {

            closeCinemaPlayer();

        }

    }
);


// ==========================================
// ربط زر التشغيل
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const playButton =
            document.querySelector(
                ".play-now-btn"
            );

        if (playButton) {

            playButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    playMovie();

                }
            );

        }

    }
);


/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 5.3
الوصف : نظام المفضلة وحفظها في LocalStorage
المطور : Muhammad Wael
==================================================
*/


// ==========================================
// مفتاح تخزين المفضلة
// ==========================================

const FAVORITES_KEY =
    "sfvx_favorites";


// ==========================================
// قراءة المفضلة
// ==========================================

function getFavorites() {

    const saved =
        localStorage.getItem(
            FAVORITES_KEY
        );

    if (!saved) return [];

    try {

        const favorites =
            JSON.parse(saved);

        return Array.isArray(favorites)
            ? favorites.map(Number)
            : [];

    } catch (error) {

        console.warn(
            "تعذر قراءة المفضلة",
            error
        );

        return [];

    }

}


// ==========================================
// حفظ المفضلة
// ==========================================

function saveFavorites(ids) {

    localStorage.setItem(

        FAVORITES_KEY,

        JSON.stringify(ids)

    );

}


// ==========================================
// التحقق من وجود فيلم في المفضلة
// ==========================================

function isFavorite(movieId) {

    return getFavorites().includes(
        Number(movieId)
    );

}


// ==========================================
// إضافة / إزالة فيلم من المفضلة
// ==========================================

function toggleFavorite(movieId) {

    const id =
        Number(movieId);

    const movie =
        findMovie(id);

    if (!movie) {

        showNotification(
            "الفيلم غير موجود",
            "error"
        );

        return;

    }


    let favorites =
        getFavorites();


    if (favorites.includes(id)) {

        // إزالة الفيلم
        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

        saveFavorites(favorites);

        showNotification(
            "تمت إزالة الفيلم من المفضلة",
            "success"
        );

    } else {

        // إضافة الفيلم
        favorites.unshift(id);

        saveFavorites(favorites);

        showNotification(
            "تمت إضافة الفيلم إلى المفضلة",
            "success"
        );

        // مكافأة بسيطة للمهمة
        if (
            typeof updateXP ===
            "function"
        ) {

            updateXP(
                10,
                "إضافة فيلم إلى المفضلة"
            );

        }

    }


    updateFavoriteButtons();

}


// ==========================================
// تحديث شكل أزرار القلب
// ==========================================

function updateFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            ".favorite-btn"
        );

    const favorites =
        getFavorites();


    buttons.forEach(button => {

        const onclick =
            button.getAttribute(
                "onclick"
            );

        if (!onclick) return;


        const match =
            onclick.match(
                /toggleFavorite\((\d+)\)/
            );

        if (!match) return;


        const movieId =
            Number(match[1]);


        const active =
            favorites.includes(
                movieId
            );


        button.classList.toggle(
            "active",
            active
        );


        const icon =
            button.querySelector("i");


        if (icon) {

            icon.classList.toggle(
                "fas",
                active
            );

            icon.classList.toggle(
                "far",
                !active
            );

        }

    });

}


// ==========================================
// عرض المفضلة
// ==========================================

function renderFavorites() {

    const container =
        document.getElementById(
            "favorites-grid"
        );

    if (!container) return;


    const favoriteIds =
        getFavorites();


    const favoriteMovies =
        favoriteIds

            .map(id =>
                findMovie(id)
            )

            .filter(Boolean);


    if (!favoriteMovies.length) {

        container.innerHTML = `

            <div class="no-results">

                <i class="fas fa-heart"></i>

                <h3>
                    لا توجد أفلام في المفضلة
                </h3>

                <p>
                    أضف الأفلام التي تحبها
                    وستظهر هنا.
                </p>

            </div>

        `;

        return;

    }


    appendMovies(
        container,
        favoriteMovies
    );

}


// ==========================================
// تهيئة نظام المفضلة
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateFavoriteButtons();

        renderFavorites();

    }
);


/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 5.4
الوصف : Trailer + أزرار الـOverlay والتحكم
المطور : Muhammad Wael
==================================================
*/


// ==========================================
// فتح التريلر
// ==========================================

function openTrailer(movieId = null) {

    const id =
        movieId !== null
            ? Number(movieId)
            : selectedMovie?.id;

    if (!id) {

        showNotification(
            "اختر فيلمًا أولًا",
            "error"
        );

        return;

    }


    const movie =
        findMovie(id);

    if (!movie) {

        showNotification(
            "الفيلم غير موجود",
            "error"
        );

        return;

    }


    /*
    ------------------------------------------
    البحث عن نافذة Trailer موجودة مسبقًا
    ------------------------------------------
    */

    let trailerOverlay =
        document.getElementById(
            "trailerOverlay"
        );


    /*
    ------------------------------------------
    إذا لم تكن موجودة ننشئها
    ------------------------------------------
    */

    if (!trailerOverlay) {

        trailerOverlay =
            document.createElement("div");

        trailerOverlay.id =
            "trailerOverlay";

        trailerOverlay.className =
            "trailer-overlay";

        trailerOverlay.innerHTML = `

            <div class="trailer-content">

                <button
                    type="button"
                    class="trailer-close"
                    aria-label="إغلاق التريلر">

                    <i class="fas fa-times"></i>

                </button>

                <div class="trailer-placeholder">

                    <i class="fas fa-film"></i>

                    <h3>
                        Trailer
                    </h3>

                    <p>
                        لا يوجد رابط Trailer
                        لهذا الفيلم حاليًا.
                    </p>

                    <strong>
                        ${movie.title}
                    </strong>

                </div>

            </div>

        `;

        document.body.appendChild(
            trailerOverlay
        );

    }


    // إظهار التريلر
    trailerOverlay.style.display =
        "flex";


    document.body.classList.add(
        "trailer-open"
    );


    // زر الإغلاق
    const closeButton =
        trailerOverlay.querySelector(
            ".trailer-close"
        );


    if (closeButton) {

        closeButton.onclick =
            closeTrailer;

    }


    // إغلاق عند الضغط على الخلفية
    trailerOverlay.onclick =
        event => {

            if (
                event.target ===
                trailerOverlay
            ) {

                closeTrailer();

            }

        };


    showNotification(
        `Trailer: ${movie.title}`,
        "success"
    );

}


// ==========================================
// إغلاق Trailer
// ==========================================

function closeTrailer() {

    const trailerOverlay =
        document.getElementById(
            "trailerOverlay"
        );

    if (!trailerOverlay) return;


    trailerOverlay.style.display =
        "none";


    document.body.classList.remove(
        "trailer-open"
    );

}


// ==========================================
// ربط زر Trailer
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const trailerButton =
            document.querySelector(
                ".trailer-btn"
            );


        if (trailerButton) {

            trailerButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openTrailer();

                }
            );

        }

    }
);


// ==========================================
// إغلاق Trailer بواسطة ESC
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            const trailer =
                document.getElementById(
                    "trailerOverlay"
                );

            if (
                trailer &&
                trailer.style.display ===
                "flex"
            ) {

                closeTrailer();

            }

        }

    }
);


// ==========================================
// تحديث أزرار الـOverlay
// ==========================================

function updateOverlayButtons() {

    const playButton =
        document.querySelector(
            ".play-now-btn"
        );

    const trailerButton =
        document.querySelector(
            ".trailer-btn"
        );


    if (playButton) {

        playButton.disabled =
            !selectedMovie;

    }


    if (trailerButton) {

        trailerButton.disabled =
            !selectedMovie;

    }

}


// ==========================================
// تحديث الأزرار عند فتح الفيلم
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    updateOverlayButtons
);


/*
==================================================
مشروع : SFV-X Movies Empire
الجزء : 5.5
الوصف : الربط النهائي لنظام تفاصيل وتشغيل الفيلم
المطور : Muhammad Wael
==================================================
*/


// ==========================================
// تحديث حالة الفيلم المحدد
// ==========================================

function syncSelectedMovie() {

    if (!selectedMovie) return;

    const movie =
        findMovie(selectedMovie.id);

    if (!movie) {

        selectedMovie = null;

        return;

    }

    selectedMovie = movie;

}


// ==========================================
// إعادة تحديث الكارت الحالي
// ==========================================

function refreshMovieCards() {

    if (
        typeof renderMovies ===
        "function"
    ) {

        renderMovies(
            currentMovies || moviesDatabase
        );

    }


    if (
        typeof updateFavoriteButtons ===
        "function"
    ) {

        updateFavoriteButtons();

    }

}


// ==========================================
// تحديث بيانات الـOverlay
// ==========================================

function refreshMovieOverlay() {

    syncSelectedMovie();

    if (!selectedMovie) return;

    if (
        typeof updateMovieOverlay ===
        "function"
    ) {

        updateMovieOverlay(
            selectedMovie
        );

    }

    if (
        typeof updateOverlayButtons ===
        "function"
    ) {

        updateOverlayButtons();

    }

}


// ==========================================
// تنظيف جميع النوافذ
// ==========================================

function closeAllMovieWindows() {

    if (
        typeof closeMovieOverlay ===
        "function"
    ) {

        closeMovieOverlay();

    }


    if (
        typeof closeTrailer ===
        "function"
    ) {

        closeTrailer();

    }


    if (
        typeof closeCinemaPlayer ===
        "function"
    ) {

        closeCinemaPlayer();

    }

}


// ==========================================
// التعامل مع زر Back في المتصفح
// ==========================================

window.addEventListener(
    "popstate",
    () => {

        closeAllMovieWindows();

    }
);


// ==========================================
// تحديث الأنظمة بعد تغيير البيانات
// ==========================================

function refreshMovieSystems() {

    refreshMovieOverlay();

    updateFavoriteButtons();

    renderContinueWatching();

}


// ==========================================
// تهيئة Part 5
// ==========================================

function initPart5() {

    updateFavoriteButtons();

    renderFavorites();

    renderContinueWatching();

    updateOverlayButtons();

}


// ==========================================
// التشغيل بعد تحميل الصفحة
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initPart5
);


document.addEventListener("DOMContentLoaded", () => {

    const startNowBtn =
        document.getElementById("startNowBtn");

    if (startNowBtn) {

        startNowBtn.addEventListener("click", () => {

            window.location.href =
                "../خيارات الدخول/movie-entry.html";

        });

    }

});
