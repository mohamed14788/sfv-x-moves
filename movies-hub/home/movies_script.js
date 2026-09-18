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

}


// ==========================================
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

    const mobileBtn =
        document.getElementById("mobile-menu-btn");

    const sidebar =
        document.getElementById("main-sidebar");


    if (!mobileBtn || !sidebar) return;


    mobileBtn.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });

}

/*
==================================================
17) نظام الإشعارات
==================================================
*/

function showNotification(title, message, icon = "fa-bell") {

    const container =
        document.getElementById("notification-container");

    if (!container) return;


    const notification =
        document.createElement("div");


    notification.className =
        "notification-item";


    notification.innerHTML = `

        <div class="notification-icon">

            <i class="fas ${icon}"></i>

        </div>

        <div class="notification-content">

            <strong>${title}</strong>

            <span>${message}</span>

        </div>

        <button
            class="notification-close"
            type="button"
            aria-label="Close"
        >

            <i class="fas fa-times"></i>

        </button>

    `;


    const closeButton =
        notification.querySelector(
            ".notification-close"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => notification.remove()
        );

    }


    container.appendChild(notification);


    setTimeout(() => {

        if (notification.parentElement) {

            notification.remove();

        }

    }, 5000);

}




/*
==================================================
18) فتح نافذة الإشعارات
==================================================
*/

function toggleNotifications() {

    const panel =
        document.getElementById(
            "notifications-panel"
        );


    if (!panel) return;


    panel.classList.toggle("active");

}




/*
==================================================
19) نظام البحث
==================================================
*/

let currentMovies = [...moviesDatabase];

let currentSearchTerm = "";

let currentPage = 1;

const moviesPerPage = 12;




/*
==================================================
20) البحث داخل قاعدة البيانات
==================================================
*/

function searchMovies(term = "") {

    const query =
        String(term)
            .trim()
            .toLowerCase();


    currentSearchTerm = query;


    if (!query) {

        currentMovies =
            [...moviesDatabase];

    }

    else {

        currentMovies =
            moviesDatabase.filter(movie => {

                const title =
                    String(movie.title || "")
                        .toLowerCase();


                const category =
                    String(movie.category || "")
                        .toLowerCase();


                const type =
                    String(movie.type || "")
                        .toLowerCase();


                const description =
                    String(movie.description || "")
                        .toLowerCase();


                const quality =
                    String(movie.quality || "")
                        .toLowerCase();


                const year =
                    String(movie.year || "")
                        .toLowerCase();


                return (

                    title.includes(query) ||

                    category.includes(query) ||

                    type.includes(query) ||

                    description.includes(query) ||

                    quality.includes(query) ||

                    year.includes(query)

                );

            });

    }


    currentPage = 1;


    renderDynamicMovies();


    updateContentCounter();

}




/*
==================================================
21) الحصول على فيلم بالـ ID
==================================================
*/

function findMovie(movieId) {

    return moviesDatabase.find(

        movie =>

            String(movie.id) ===
            String(movieId)

    );

}




/*
==================================================
22) الحصول على الأفلام حسب النوع
==================================================
*/

function getMoviesByType(type) {

    if (!type) {

        return [];

    }


    return moviesDatabase.filter(

        movie =>

            String(movie.type)
                .toLowerCase()

            ===

            String(type)
                .toLowerCase()

    );

}




/*
==================================================
23) الحصول على الأفلام حسب التصنيف
==================================================
*/

function getMoviesByCategory(category) {

    if (!category) {

        return [];

    }


    return moviesDatabase.filter(

        movie =>

            String(movie.category)
                .toLowerCase()

            ===

            String(category)
                .toLowerCase()

    );

}




/*
==================================================
24) أحدث الأفلام
==================================================
*/

function getLatestMovies(limit = 6) {

    return [...moviesDatabase]

        .sort(

            (a, b) =>

                Number(b.year || 0) -
                Number(a.year || 0)

        )

        .slice(0, limit);

}




/*
==================================================
25) الأعلى تقييماً
==================================================
*/

function getTopRated(limit = 6) {

    return [...moviesDatabase]

        .sort(

            (a, b) =>

                Number(b.rating || 0) -
                Number(a.rating || 0)

        )

        .slice(0, limit);

}




/*
==================================================
26) ترتيب الأفلام
==================================================
*/

function sortMovies(sortType) {

    const movies =
        [...currentMovies];


    switch (sortType) {


        case "rating-desc":

            movies.sort(

                (a, b) =>

                    Number(b.rating || 0) -
                    Number(a.rating || 0)

            );

            break;



        case "rating-asc":

            movies.sort(

                (a, b) =>

                    Number(a.rating || 0) -
                    Number(b.rating || 0)

            );

            break;



        case "year-desc":

        case "newest":

            movies.sort(

                (a, b) =>

                    Number(b.year || 0) -
                    Number(a.year || 0)

            );

            break;



        case "year-asc":

            movies.sort(

                (a, b) =>

                    Number(a.year || 0) -
                    Number(b.year || 0)

            );

            break;



        case "title-asc":

        case "az":

            movies.sort(

                (a, b) =>

                    String(a.title || "")
                        .localeCompare(
                            String(b.title || ""),
                            "ar"
                        )

            );

            break;



        case "rating":

            movies.sort(

                (a, b) =>

                    Number(b.rating || 0) -
                    Number(a.rating || 0)

            );

            break;



        default:

            break;

    }


    currentMovies =
        movies;


    currentPage = 1;


    renderDynamicMovies();


    updateContentCounter();

}




/*
==================================================
27) إنشاء بطاقة الفيلم
==================================================
*/

function createMovieCard(movie) {

    if (!movie) return null;


    const card =
        document.createElement("article");


    card.className =
        "movie-card";


    card.dataset.movieId =
        movie.id;


    const rating =
        Number(movie.rating || 0)
            .toFixed(1);


    const poster =
        movie.poster ||
        "images/logo.png";


    card.innerHTML = `

        <div class="movie-card-poster">

            <img
                src="${poster}"
                alt="${movie.title || "Movie"}"
                loading="lazy"
                onerror="this.onerror=null;this.src='images/logo.png';"
            >


            <div class="movie-card-overlay">

                <button
                    class="movie-play-btn"
                    type="button"
                    data-action="play"
                    data-id="${movie.id}"
                    title="تشغيل"
                >

                    <i class="fas fa-play"></i>

                </button>

            </div>


            <span class="movie-quality">

                ${movie.quality || "HD"}

            </span>


            <span class="movie-rating">

                <i class="fas fa-star"></i>

                ${rating}

            </span>


        </div>


        <div class="movie-card-info">

            <h3 class="movie-title">

                ${movie.title || "بدون عنوان"}

            </h3>


            <div class="movie-meta">

                <span>

                    ${movie.year || "----"}

                </span>


                <span>

                    ${movie.type || "movie"}

                </span>

            </div>


            <div class="movie-card-actions">

                <button
                    type="button"
                    class="favorite-btn"
                    data-action="favorite"
                    data-id="${movie.id}"
                    title="المفضلة"
                >

                    <i class="far fa-heart"></i>

                </button>


                <button
                    type="button"
                    class="details-btn"
                    data-action="details"
                    data-id="${movie.id}"
                >

                    التفاصيل

                </button>

            </div>

        </div>

    `;


    return card;

}




/*
==================================================
28) إضافة بطاقة إلى Container
==================================================
*/

function appendMovieCard(container, movie) {

    if (!container || !movie) {

        return;

    }


    const card =
        createMovieCard(movie);


    if (card) {

        container.appendChild(card);

    }

}




/*
==================================================
29) رسم مجموعة أفلام
==================================================
*/

function appendMovies(container, movies) {

    if (!container || !Array.isArray(movies)) {

        return;

    }


    movies.forEach(movie => {

        appendMovieCard(
            container,
            movie
        );

    });


    updateFavoriteButtons();

}




/*
==================================================
30) تنظيف Container
==================================================
*/

function clearContainer(container) {

    if (!container) return;


    container.innerHTML = "";

}




/*
==================================================
31) رسم النتائج الرئيسية
==================================================
*/

function renderDynamicMovies() {

    const container =

        document.getElementById(
            "dynamic-movie-grid"
        );


    if (!container) return;


    clearContainer(container);


    const start =
        0;


    const end =
        currentPage *
        moviesPerPage;


    const moviesToRender =
        currentMovies.slice(
            start,
            end
        );


    if (!moviesToRender.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-film"></i>

                <h3>لا توجد نتائج</h3>

                <p>
                    جرّب البحث بكلمة أخرى.
                </p>

            </div>

        `;


        return;

    }


    appendMovies(
        container,
        moviesToRender
    );

}




/*
==================================================
32) تحميل المزيد
==================================================
*/

function loadMoreMovies() {

    const total =
        currentMovies.length;


    if (
        currentPage *
        moviesPerPage
        >= total
    ) {

        showNotification(

            "انتهت النتائج",

            "لا توجد أفلام إضافية لعرضها.",

            "fa-check"

        );


        return;

    }


    currentPage++;


    renderDynamicMovies();

}




/*
==================================================
33) عداد المحتوى
==================================================
*/

function updateContentCounter() {

    const counter =

        document.getElementById(
            "content-counter"
        );


    if (!counter) return;


    counter.textContent =

        currentMovies.length.toLocaleString();

}




/*
==================================================
34) التعامل مع الضغط على بطاقات الأفلام
==================================================
*/

function setupMovieCardEvents() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-action]"
                );


            if (!button) return;


            const action =
                button.dataset.action;


            const movieId =
                button.dataset.id;


            const movie =
                findMovie(movieId);


            if (!movie) return;


            if (action === "play") {

                playMovie(movieId);

            }


            else if (action === "details") {

                openMovieDetails(movieId);

            }


            else if (action === "favorite") {

                toggleFavorite(movieId);

            }

        }

    );

}

/*
==================================================
35) نظام المفضلة
==================================================
*/

function getFavorites() {

    try {

        const saved =
            localStorage.getItem(
                "sfvx_favorites"
            );


        if (!saved) {

            return [];

        }


        const parsed =
            JSON.parse(saved);


        return Array.isArray(parsed)
            ? parsed
            : [];

    }

    catch (error) {

        console.warn(
            "تعذر قراءة المفضلة:",
            error
        );


        return [];

    }

}




/*
==================================================
36) حفظ المفضلة
==================================================
*/

function saveFavorites(favorites) {

    if (!Array.isArray(favorites)) {

        favorites = [];

    }


    sfvxUser.favorites =
        favorites;


    localStorage.setItem(

        "sfvx_favorites",

        JSON.stringify(favorites)

    );

}




/*
==================================================
37) التحقق هل الفيلم في المفضلة
==================================================
*/

function isFavorite(movieId) {

    const favorites =
        getFavorites();


    return favorites.some(

        id =>

            String(id) ===
            String(movieId)

    );

}




/*
==================================================
38) إضافة / إزالة فيلم من المفضلة
==================================================
*/

function toggleFavorite(movieId) {

    const favorites =
        getFavorites();


    const index =
        favorites.findIndex(

            id =>

                String(id) ===
                String(movieId)

        );


    if (index !== -1) {

        // إزالة

        favorites.splice(
            index,
            1
        );


        saveFavorites(
            favorites
        );


        showNotification(

            "تمت الإزالة",

            "تمت إزالة الفيلم من المفضلة.",

            "fa-heart-broken"

        );

    }

    else {

        // إضافة

        favorites.push(
            movieId
        );


        saveFavorites(
            favorites
        );


        const movie =
            findMovie(movieId);


        showNotification(

            "تمت الإضافة ❤️",

            movie

                ? `تمت إضافة ${movie.title} إلى المفضلة.`

                : "تمت إضافة الفيلم إلى المفضلة.",

            "fa-heart"

        );

    }


    updateFavoriteButtons();


    renderFavorites();

}




/*
==================================================
39) تحديث أزرار المفضلة
==================================================
*/

function updateFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-action='favorite']"
        );


    buttons.forEach(button => {

        const movieId =
            button.dataset.id;


        const favorite =
            isFavorite(movieId);


        const icon =
            button.querySelector("i");


        if (favorite) {

            button.classList.add(
                "active"
            );


            if (icon) {

                icon.classList.remove(
                    "far"
                );


                icon.classList.add(
                    "fas"
                );

            }

        }

        else {

            button.classList.remove(
                "active"
            );


            if (icon) {

                icon.classList.remove(
                    "fas"
                );


                icon.classList.add(
                    "far"
                );

            }

        }

    });

}




/*
==================================================
40) عرض المفضلة
==================================================
*/

function renderFavorites() {

    const container =
        document.getElementById(
            "favorites-grid"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const favorites =
        getFavorites();


    const movies =
        favorites

            .map(id =>
                findMovie(id)
            )

            .filter(Boolean);


    if (!movies.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="far fa-heart"></i>

                <h3>
                    قائمة المفضلة فارغة
                </h3>

                <p>
                    أضف الأفلام التي تريد الرجوع
                    إليها لاحقاً.
                </p>

            </div>

        `;


        return;

    }


    appendMovies(
        container,
        movies
    );

}




/*
==================================================
41) نظام سجل المشاهدة
==================================================
*/

// نخزن آخر الأفلام التي شاهدها المستخدم.

function getWatchHistory() {

    try {

        const saved =
            localStorage.getItem(
                "sfvx_watch_history"
            );


        if (!saved) {

            return [];

        }


        const parsed =
            JSON.parse(saved);


        return Array.isArray(parsed)
            ? parsed
            : [];

    }

    catch (error) {

        console.warn(
            "تعذر قراءة سجل المشاهدة:",
            error
        );


        return [];

    }

}




/*
==================================================
42) حفظ سجل المشاهدة
==================================================
*/

function saveWatchHistory(history) {

    if (!Array.isArray(history)) {

        history = [];

    }


    localStorage.setItem(

        "sfvx_watch_history",

        JSON.stringify(history)

    );

}




/*
==================================================
43) إضافة فيلم إلى سجل المشاهدة
==================================================
*/

function addToWatchHistory(movieId) {

    const movie =
        findMovie(movieId);


    if (!movie) return;


    let history =
        getWatchHistory();


    // حذف النسخة القديمة
    history =
        history.filter(

            id =>

                String(id) !==
                String(movieId)

        );


    // وضع الفيلم في البداية
    history.unshift(
        movieId
    );


    // الاحتفاظ بآخر 30 فيلماً
    history =
        history.slice(
            0,
            30
        );


    saveWatchHistory(
        history
    );


    sfvxUser.watched =
        Math.max(
            sfvxUser.watched,
            0
        );


    saveUserData();

}




/*
==================================================
44) عرض سجل المشاهدة
==================================================
*/

function renderWatchHistory() {

    const container =
        document.getElementById(
            "history-grid"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const history =
        getWatchHistory();


    const movies =
        history

            .map(id =>
                findMovie(id)
            )

            .filter(Boolean);


    if (!movies.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-history"></i>

                <h3>
                    لا يوجد سجل مشاهدة
                </h3>

                <p>
                    الأفلام التي تشاهدها ستظهر هنا.
                </p>

            </div>

        `;


        return;

    }


    appendMovies(
        container,
        movies
    );

}




/*
==================================================
45) Continue Watching
==================================================
*/

function getContinueWatching() {

    try {

        const saved =
            localStorage.getItem(
                "sfvx_continue_watching"
            );


        if (!saved) {

            return [];

        }


        const parsed =
            JSON.parse(saved);


        if (!Array.isArray(parsed)) {

            return [];

        }


        return parsed

            .map(id =>
                findMovie(id)
            )

            .filter(Boolean);

    }

    catch (error) {

        console.warn(
            "تعذر قراءة Continue Watching:",
            error
        );


        return [];

    }

}




/*
==================================================
46) إضافة فيلم إلى Continue Watching
==================================================
*/

function addToContinueWatching(movieId) {

    const movie =
        findMovie(movieId);


    if (!movie) return;


    let ids;


    try {

        ids =
            JSON.parse(

                localStorage.getItem(
                    "sfvx_continue_watching"
                )

            ) || [];

    }

    catch {

        ids = [];

    }


    if (!Array.isArray(ids)) {

        ids = [];

    }


    ids =
        ids.filter(

            id =>

                String(id) !==
                String(movieId)

        );


    ids.unshift(
        movieId
    );


    // آخر 12 فيلماً فقط
    ids =
        ids.slice(
            0,
            12
        );


    localStorage.setItem(

        "sfvx_continue_watching",

        JSON.stringify(ids)

    );


    renderContinueWatching();

}




/*
==================================================
47) عرض Continue Watching
==================================================
*/

function renderContinueWatching() {

    const container =
        document.getElementById(
            "continue-watching"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const movies =
        getContinueWatching();


    if (!movies.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-play-circle"></i>

                <h3>
                    لا يوجد محتوى للمتابعة
                </h3>

                <p>
                    ابدأ مشاهدة أحد الأفلام
                    وسيظهر هنا.
                </p>

            </div>

        `;


        return;

    }


    appendMovies(
        container,
        movies
    );

}




/*
==================================================
48) فتح تفاصيل الفيلم
==================================================
*/

function openMovieDetails(movieId) {

    const movie =
        findMovie(movieId);


    if (!movie) {

        return;

    }


    const overlay =
        document.getElementById(
            "movie-details-overlay"
        );


    if (!overlay) {

        // إذا لم توجد النافذة في الصفحة
        // نستخدم المشغل مباشرة.

        playMovie(movieId);

        return;

    }


    updateMovieOverlay(
        movie
    );


    overlay.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    syncSelectedMovie(
        movie
    );

}




/*
==================================================
49) تحديث نافذة التفاصيل
==================================================
*/

function updateMovieOverlay(movie) {

    if (!movie) return;


    const title =
        document.getElementById(
            "overlay-movie-title"
        );


    const description =
        document.getElementById(
            "overlay-movie-description"
        );


    const poster =
        document.getElementById(
            "overlay-movie-poster"
        );


    const year =
        document.getElementById(
            "overlay-movie-year"
        );


    const rating =
        document.getElementById(
            "overlay-movie-rating"
        );


    const quality =
        document.getElementById(
            "overlay-movie-quality"
        );


    if (title) {

        title.textContent =
            movie.title || "بدون عنوان";

    }


    if (description) {

        description.textContent =
            movie.description ||
            "لا يوجد وصف متاح.";

    }


    if (poster) {

        poster.src =
            movie.poster ||
            "images/logo.png";


        poster.onerror = () => {

            poster.src =
                "images/logo.png";

        };

    }


    if (year) {

        year.textContent =
            movie.year || "----";

    }


    if (rating) {

        rating.textContent =
            Number(movie.rating || 0)
                .toFixed(1);

    }


    if (quality) {

        quality.textContent =
            movie.quality || "HD";

    }


    updateOverlayButtons(
        movie
    );

}




/*
==================================================
50) إغلاق نافذة التفاصيل
==================================================
*/

function closeMovieOverlay() {

    const overlay =
        document.getElementById(
            "movie-details-overlay"
        );


    if (!overlay) return;


    overlay.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}




/*
==================================================
51) تشغيل الفيلم
==================================================
*/

function playMovie(movieId) {

    const movie =
        findMovie(movieId);


    if (!movie) {

        showNotification(

            "خطأ",

            "لم يتم العثور على الفيلم.",

            "fa-exclamation-triangle"

        );


        return;

    }


    // إضافة إلى السجل
    addToWatchHistory(
        movie.id
    );


    // إضافة إلى Continue Watching
    addToContinueWatching(
        movie.id
    );


    // مكافأة المشاهدة
    rewardWatching(
        movie
    );


    // البحث عن المشغل
    const player =
        document.getElementById(
            "cinema-player"
        );


    if (player) {

        openCinemaPlayer(
            movie
        );

        return;

    }


    // إذا لم يوجد المشغل
    // نعرض رسالة مؤقتة.

    showNotification(

        "🎬 تشغيل الفيلم",

        movie.title,

        "fa-play"

    );

}




/*
==================================================
52) فتح مشغل السينما
==================================================
*/

function openCinemaPlayer(movie) {

    if (!movie) return;


    const player =
        document.getElementById(
            "cinema-player"
        );


    if (!player) return;


    const title =
        player.querySelector(
            ".player-title"
        );


    const poster =
        player.querySelector(
            ".player-poster"
        );


    if (title) {

        title.textContent =
            movie.title || "";

    }


    if (poster) {

        poster.src =
            movie.poster ||
            "images/logo.png";


        poster.onerror = () => {

            poster.src =
                "images/logo.png";

        };

    }


    player.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    // حفظ الفيلم الحالي
    window.currentSelectedMovie =
        movie;

}




/*
==================================================
53) إغلاق مشغل السينما
==================================================
*/

function closeCinemaPlayer() {

    const player =
        document.getElementById(
            "cinema-player"
        );


    if (!player) return;


    player.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}




/*
==================================================
54) تحديث أزرار نافذة الفيلم
==================================================
*/

function updateOverlayButtons(movie) {

    if (!movie) return;


    const favoriteButton =
        document.querySelector(
            "[data-overlay-favorite]"
        );


    if (!favoriteButton) return;


    const favorite =
        isFavorite(movie.id);


    favoriteButton.classList.toggle(
        "active",
        favorite
    );


    const icon =
        favoriteButton.querySelector(
            "i"
        );


    if (icon) {

        icon.classList.toggle(
            "fas",
            favorite
        );


        icon.classList.toggle(
            "far",
            !favorite
        );

    }

}




/*
==================================================
55) الفيلم المحدد حالياً
==================================================
*/

function syncSelectedMovie(movie) {

    if (!movie) return;


    window.currentSelectedMovie =
        movie;


    updateOverlayButtons(
        movie
    );

}




/*
==================================================
56) إغلاق جميع النوافذ
==================================================
*/

function closeAllMovieWindows() {

    closeMovieOverlay();

    closeCinemaPlayer();


    const trailer =
        document.getElementById(
            "trailer-modal"
        );


    if (trailer) {

        trailer.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "modal-open"
    );

}




/*
==================================================
57) زر الرجوع لأعلى
==================================================
*/

function setupBackToTop() {

    const button =
        document.getElementById(
            "back-to-top"
        );


    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "active"
                );

            }

            else {

                button.classList.remove(
                    "active"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}

/*
==================================================
58) نظام الـ Hero
==================================================
*/

function renderHeroMovies() {

    const container =
        document.getElementById(
            "hero-slider"
        );


    if (!container) return;


    const movies =
        getTopRated(5);


    container.innerHTML = "";


    movies.forEach(movie => {

        const slide =
            document.createElement("div");


        slide.className =
            "hero-slide";


        slide.dataset.movieId =
            movie.id;


        slide.innerHTML = `

            <div
                class="hero-slide-background"
                style="
                    background-image:
                    url('${movie.poster || "images/logo.png"}');
                "
            ></div>


            <div class="hero-slide-content">

                <span class="hero-badge">

                    <i class="fas fa-fire"></i>

                    الأكثر مشاهدة

                </span>


                <h2>

                    ${movie.title || "بدون عنوان"}

                </h2>


                <div class="hero-meta">

                    <span>

                        <i class="fas fa-star"></i>

                        ${Number(movie.rating || 0).toFixed(1)}

                    </span>


                    <span>

                        ${movie.year || "----"}

                    </span>


                    <span>

                        ${movie.quality || "HD"}

                    </span>

                </div>


                <p>

                    ${
                        movie.description ||
                        "استمتع بمشاهدة هذا العمل داخل SFV-X."
                    }

                </p>


                <div class="hero-actions">

                    <button
                        type="button"
                        class="hero-play-btn"
                        data-action="play"
                        data-id="${movie.id}"
                    >

                        <i class="fas fa-play"></i>

                        شاهد الآن

                    </button>


                    <button
                        type="button"
                        class="hero-details-btn"
                        data-action="details"
                        data-id="${movie.id}"
                    >

                        <i class="fas fa-info-circle"></i>

                        التفاصيل

                    </button>

                </div>

            </div>

        `;


        container.appendChild(
            slide
        );

    });

}




/*
==================================================
59) Trending
==================================================
*/

function renderTrendingMovies() {

    const container =
        document.getElementById(
            "trending-slider"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const movies =
        getTopRated(10);


    appendMovies(
        container,
        movies
    );

}




/*
==================================================
60) أحدث الأفلام
==================================================
*/

function renderLatestMovies() {

    const container =
        document.getElementById(
            "latest-movies"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const movies =
        getLatestMovies(8);


    appendMovies(
        container,
        movies
    );

}




/*
==================================================
61) أحدث المسلسلات
==================================================
*/

function renderLatestSeries() {

    const container =
        document.getElementById(
            "latest-series"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const movies =
        moviesDatabase

            .filter(movie => {

                const type =
                    String(
                        movie.type || ""
                    ).toLowerCase();


                return (

                    type === "series" ||

                    type === "tv" ||

                    type === "مسلسل"

                );

            })

            .sort(

                (a, b) =>

                    Number(b.year || 0) -
                    Number(a.year || 0)

            )

            .slice(0, 8);


    appendMovies(
        container,
        movies
    );

}




/*
==================================================
62) Anime
==================================================
*/

function renderAnime() {

    const container =
        document.getElementById(
            "anime-grid"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const anime =
        getMoviesByType(
            "anime"
        );


    appendMovies(
        container,
        anime.slice(
            0,
            8
        )
    );

}




/*
==================================================
63) Donghua
==================================================
*/

function renderDonghua() {

    const container =
        document.getElementById(
            "donghua-grid"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const donghua =
        getMoviesByType(
            "donghua"
        );


    appendMovies(
        container,
        donghua.slice(
            0,
            8
        )
    );

}




/*
==================================================
64) Cartoon / Animation
==================================================
*/

function renderCartoon() {

    const container =
        document.getElementById(
            "cartoon-grid"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const cartoon =
        moviesDatabase.filter(movie => {

            const type =
                String(
                    movie.type || ""
                ).toLowerCase();


            return (

                type === "cartoon" ||

                type === "animation" ||

                type === "animated"

            );

        });


    appendMovies(
        container,
        cartoon.slice(
            0,
            8
        )
    );

}




/*
==================================================
65) الملخصات
==================================================
*/

function renderMovieSummaries() {

    const container =
        document.getElementById(
            "summary-grid"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const summaries =
        moviesDatabase.filter(movie => {

            const type =
                String(
                    movie.type || ""
                ).toLowerCase();


            return (

                type === "summary" ||

                type === "summaries" ||

                type === "ملخص"

            );

        });


    appendMovies(
        container,
        summaries.slice(
            0,
            8
        )
    );

}




/*
==================================================
66) التوصيات
==================================================
*/

function getRecommended(limit = 8) {

    const favorites =
        getFavorites();


    const continueMovies =
        getContinueWatching();


    const continueIds =
        continueMovies.map(
            movie =>
                String(movie.id)
        );


    const favoriteMovies =
        favorites

            .map(id =>
                findMovie(id)
            )

            .filter(Boolean);


    const favoriteCategories =
        favoriteMovies.map(
            movie =>
                String(
                    movie.category || ""
                ).toLowerCase()
        );


    let recommended =
        moviesDatabase

            .filter(movie => {

                if (
                    continueIds.includes(
                        String(movie.id)
                    )
                ) {

                    return false;

                }


                return true;

            })

            .map(movie => {

                let score =
                    Number(
                        movie.rating || 0
                    );


                const category =
                    String(
                        movie.category || ""
                    ).toLowerCase();


                if (
                    favoriteCategories.includes(
                        category
                    )
                ) {

                    score += 3;

                }


                if (
                    favoriteMovies.some(
                        favorite =>
                            favorite.type ===
                            movie.type
                    )
                ) {

                    score += 1;

                }


                return {

                    movie,

                    score

                };

            })

            .sort(

                (a, b) =>
                    b.score -
                    a.score

            )

            .map(
                item =>
                    item.movie
            );


    return recommended.slice(
        0,
        limit
    );

}




/*
==================================================
67) عرض التوصيات
==================================================
*/

function renderRecommended() {

    const container =
        document.getElementById(
            "recommended-grid"
        );


    if (!container) return;


    clearContainer(
        container
    );


    const movies =
        getRecommended(8);


    appendMovies(
        container,
        movies
    );

}




/*
==================================================
68) تشغيل Trailer
==================================================
*/

function openTrailer(movieId) {

    const movie =
        findMovie(movieId);


    if (!movie) return;


    const modal =
        document.getElementById(
            "trailer-modal"
        );


    if (!modal) {

        showNotification(

            "Trailer",

            "لا يوجد مشغل Trailer في الصفحة.",

            "fa-film"

        );


        return;

    }


    const title =
        modal.querySelector(
            ".trailer-title"
        );


    const iframe =
        modal.querySelector(
            "iframe"
        );


    if (title) {

        title.textContent =
            movie.title || "";

    }


    if (
        iframe &&
        movie.trailer
    ) {

        iframe.src =
            movie.trailer;

    }


    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );

}




/*
==================================================
69) إغلاق Trailer
==================================================
*/

function closeTrailer() {

    const modal =
        document.getElementById(
            "trailer-modal"
        );


    if (!modal) return;


    const iframe =
        modal.querySelector(
            "iframe"
        );


    if (iframe) {

        iframe.src = "";

    }


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}




/*
==================================================
70) تحديث كل أنظمة الفيلم
==================================================
*/

function refreshMovieCards() {

    renderDynamicMovies();

    renderLatestMovies();

    renderLatestSeries();

    renderAnime();

    renderDonghua();

    renderCartoon();

    renderMovieSummaries();

    renderContinueWatching();

    renderRecommended();

    renderTrendingMovies();

    renderHeroMovies();




    updateFavoriteButtons();

}




/*
==================================================
71) تحديث نافذة الفيلم
==================================================
*/

function refreshMovieOverlay() {

    const movie =
        window.currentSelectedMovie;


    if (!movie) return;


    updateMovieOverlay(
        movie
    );

}




/*
==================================================
72) تحديث النظام بالكامل
==================================================
*/

function refreshMovieSystems() {

    refreshMovieCards();

    refreshMovieOverlay();

    updatePlayerInterface();

    updateContentCounter();

}




/*
==================================================
73) تشغيل زر البحث
==================================================
*/

function setupSearch() {

    const input =
        document.getElementById(
            "main-search-input"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        event => {

            searchMovies(
                event.target.value
            );

        }
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();


                searchMovies(
                    input.value
                );

            }

        }
    );

}




/*
==================================================
74) نظام الفرز
==================================================
*/

function setupMovieSort() {

    const select =
        document.getElementById(
            "movie-sort"
        );


    if (!select) return;


    select.addEventListener(
        "change",
        event => {

            sortMovies(
                event.target.value
            );

        }
    );

}




/*
==================================================
75) زر Load More
==================================================
*/

function setupLoadMore() {

    const trigger =
        document.getElementById(
            "load-more-trigger"
        );


    if (!trigger) return;


    trigger.addEventListener(
        "click",
        event => {

            event.preventDefault();


            loadMoreMovies();

        }
    );

}




/*
==================================================
76) اختصار البحث
==================================================
*/

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            // Ctrl + /

            if (
                event.ctrlKey &&
                event.key === "/"
            ) {

                event.preventDefault();


                const input =
                    document.getElementById(
                        "main-search-input"
                    );


                if (input) {

                    input.focus();

                }

            }


            // Escape

            if (
                event.key === "Escape"
            ) {

                closeAllMovieWindows();

            }

        }
    );

}




/*
==================================================
77) تشغيل الصفحة الرئيسية
==================================================
*/

function initHomePage() {

    currentMovies =
        [...moviesDatabase];


    currentPage = 1;


    renderDynamicMovies();


    renderHeroMovies();

    renderTrendingMovies();

    renderLatestMovies();

    renderLatestSeries();

    renderAnime();

    renderDonghua();

    renderCartoon();

    renderMovieSummaries();

    renderContinueWatching();

    renderRecommended();


    updatePlayerInterface();

    updateContentCounter();

    updateFavoriteButtons();


    setupSearch();

    setupMovieSort();

    setupLoadMore();

    setupKeyboardShortcuts();

    setupMobileMenu();

    setupBackToTop();

    setupMovieCardEvents();

}




/*
==================================================
78) DOM Ready
==================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initHomePage();

    }
);




/*
==================================================
79) تصدير الدوال المهمة
==================================================
*/

// جعل الدوال متاحة لباقي أجزاء الموقع.

window.searchMovies =
    searchMovies;


window.findMovie =
    findMovie;


window.playMovie =
    playMovie;


window.openMovieDetails =
    openMovieDetails;


window.closeMovieOverlay =
    closeMovieOverlay;


window.toggleFavorite =
    toggleFavorite;


window.getFavorites =
    getFavorites;


window.addToWatchHistory =
    addToWatchHistory;


window.getWatchHistory =
    getWatchHistory;


window.getContinueWatching =
    getContinueWatching;


window.addToContinueWatching =
    addToContinueWatching;


window.renderContinueWatching =
    renderContinueWatching;


window.renderRecommended =
    renderRecommended;


window.getRecommended =
    getRecommended;


window.closeCinemaPlayer =
    closeCinemaPlayer;


window.openCinemaPlayer =
    openCinemaPlayer;


window.openTrailer =
    openTrailer;


window.closeTrailer =
    closeTrailer;


window.toggleNotifications =
    toggleNotifications;


window.toggleSidebar =
    toggleSidebar;


window.refreshMovieSystems =
    refreshMovieSystems;

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
