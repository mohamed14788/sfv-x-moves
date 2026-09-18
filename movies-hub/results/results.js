"use strict";

/* =========================================================
   SFV-X MOVIES — RESULTS ENGINE
   الدولة → التصنيف → النتائج → المشاهدة
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const resultsGrid =
        document.getElementById("resultsGrid");

    const resultsCount =
        document.getElementById("resultsCount");

    const resultsTitle =
        document.getElementById("resultsTitle");

    const resultsDescription =
        document.getElementById("resultsDescription");

    const selectedCountryElement =
        document.getElementById("selectedCountry");

    const selectedCategoryElement =
        document.getElementById("selectedCategory");

    const selectedGenreElement =
        document.getElementById("selectedGenre");

    const emptyResults =
        document.getElementById("emptyResults");

    const backButton =
        document.getElementById("backButton");

    const changeSelectionButton =
        document.getElementById(
            "changeSelectionButton"
        );

    const movieModal =
        document.getElementById("movieModal");

    const modalBackdrop =
        document.getElementById("modalBackdrop");

    const closeModal =
        document.getElementById("closeModal");

    const youtubePlayer =
        document.getElementById("youtubePlayer");

    const watchMovieTitle =
        document.getElementById("watchMovieTitle");

    const watchMovieMeta =
        document.getElementById("watchMovieMeta");


    /* =====================================================
       READ LOCAL STORAGE
    ===================================================== */

    const selectedCountryKey =
        localStorage.getItem(
            "sfvx_selected_country"
        );

    const selectedCountryName =
        localStorage.getItem(
            "sfvx_selected_country_name"
        );

    const selectedCategoryKey =
        localStorage.getItem(
            "sfvx_selected_category"
        );

    const selectedCategoryName =
        localStorage.getItem(
            "sfvx_selected_category_name"
        );

    const selectedGenreKey =
        localStorage.getItem(
            "sfvx_selected_genre"
        );

    const selectedGenreName =
        localStorage.getItem(
            "sfvx_selected_genre_name"
        );


    /* =====================================================
       TEMP MOVIES DATABASE
    ===================================================== */

    const moviesDatabase = [

        /* =================================================
           COMEDY
        ================================================= */

        {
            id: 1,
            title: "صابر جوجل",
            year: 2016,
            country: "egypt",
            category: "movies",
            genre: "comedy",
            genreName: "كوميدي",
            rating: 6.0,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=Saber+Google",
            youtubeId: "dG-6BhiICSM"
        },

        {
            id: 2,
            title: "عسل أسود",
            year: 2010,
            country: "egypt",
            category: "movies",
            genre: "comedy",
            genreName: "كوميدي",
            rating: 7.3,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=Asal+Eswed",
            youtubeId: ""
        },

        {
            id: 3,
            title: "طير إنت",
            year: 2009,
            country: "egypt",
            category: "movies",
            genre: "comedy",
            genreName: "كوميدي",
            rating: 7.0,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=Tayir+Enta",
            youtubeId: ""
        },

        {
            id: 4,
            title: "إكس لارج",
            year: 2011,
            country: "egypt",
            category: "movies",
            genre: "comedy",
            genreName: "كوميدي",
            rating: 7.4,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=XLarge",
            youtubeId: ""
        },

        {
            id: 5,
            title: "لا تراجع ولا استسلام",
            year: 2010,
            country: "egypt",
            category: "movies",
            genre: "comedy",
            genreName: "كوميدي",
            rating: 7.5,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=La+Terage",
            youtubeId: ""
        },

        {
            id: 6,
            title: "البدلة",
            year: 2018,
            country: "egypt",
            category: "movies",
            genre: "comedy",
            genreName: "كوميدي",
            rating: 6.4,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=El+Badla",
            youtubeId: ""
        },


        /* =================================================
           DRAMA
        ================================================= */

        {
            id: 7,
            title: "الفيل الأزرق",
            year: 2014,
            country: "egypt",
            category: "movies",
            genre: "drama",
            genreName: "دراما",
            rating: 8.0,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=El+Feel+El+Azraq",
            youtubeId: ""
        },

        {
            id: 8,
            title: "تراب الماس",
            year: 2018,
            country: "egypt",
            category: "movies",
            genre: "drama",
            genreName: "دراما",
            rating: 7.2,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=Turab+El+Mas",
            youtubeId: ""
        },

        {
            id: 9,
            title: "الفيل الأزرق 2",
            year: 2019,
            country: "egypt",
            category: "movies",
            genre: "drama",
            genreName: "دراما",
            rating: 7.7,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=El+Feel+2",
            youtubeId: ""
        },


        /* =================================================
           ROMANCE
        ================================================= */

        {
            id: 10,
            title: "هيبتا",
            year: 2016,
            country: "egypt",
            category: "movies",
            genre: "romance",
            genreName: "رومانسي",
            rating: 7.0,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=Hepta",
            youtubeId: ""
        },

        {
            id: 11,
            title: "عن العشق والهوى",
            year: 2006,
            country: "egypt",
            category: "movies",
            genre: "romance",
            genreName: "رومانسي",
            rating: 6.8,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=Love",
            youtubeId: ""
        },


        /* =================================================
           ACTION
        ================================================= */

        {
            id: 12,
            title: "الخلية",
            year: 2017,
            country: "egypt",
            category: "movies",
            genre: "action",
            genreName: "أكشن",
            rating: 6.8,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=El+Khaleya",
            youtubeId: ""
        },


        /* =================================================
           WAR
        ================================================= */

        {
            id: 13,
            title: "الممر",
            year: 2019,
            country: "egypt",
            category: "movies",
            genre: "war",
            genreName: "حرب",
            rating: 7.6,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=El+Mamar",
            youtubeId: ""
        },


        /* =================================================
           HORROR
        ================================================= */

        {
            id: 14,
            title: "122",
            year: 2019,
            country: "egypt",
            category: "movies",
            genre: "horror",
            genreName: "رعب",
            rating: 6.2,
            quality: "HD",
            poster:
                "https://via.placeholder.com/400x600?text=122",
            youtubeId: ""
        }

    ];


    /* =====================================================
       FALLBACKS
    ===================================================== */

    const country =
        selectedCountryKey || "egypt";

    const category =
        selectedCategoryKey || "movies";


    /* =====================================================
       FILTER
    ===================================================== */

    const filteredMovies =
        moviesDatabase.filter((movie) => {

            const countryMatch =
                movie.country === country;

            const categoryMatch =
                movie.category === category;

            const genreMatch =
                selectedGenreKey
                    ? movie.genre === selectedGenreKey
                    : true;

            return (
                countryMatch &&
                categoryMatch &&
                genreMatch
            );

        });


    /* =====================================================
       DISPLAY NAMES
    ===================================================== */

    const countryDisplay =
        selectedCountryName || "مصر";

    const categoryDisplay =
        selectedCategoryName || "أفلام";

    const genreDisplay =
        selectedGenreName || "كل التصنيفات";


    /* =====================================================
       UPDATE FILTER UI
    ===================================================== */

    if (selectedCountryElement) {
        selectedCountryElement.textContent =
            countryDisplay;
    }

    if (selectedCategoryElement) {
        selectedCategoryElement.textContent =
            categoryDisplay;
    }

    if (selectedGenreElement) {
        selectedGenreElement.textContent =
            genreDisplay;
    }


    /* =====================================================
       UPDATE PAGE TITLE
    ===================================================== */

    if (resultsTitle) {

        resultsTitle.textContent =
            `${categoryDisplay} ${countryDisplay}`;

    }


    if (resultsDescription) {

        resultsDescription.textContent =
            selectedGenreKey
                ? `${genreDisplay} — اختر فيلمًا للمشاهدة`
                : "اختر فيلمًا للمشاهدة";

    }


    if (resultsCount) {

        resultsCount.textContent =
            filteredMovies.length;

    }


    /* =====================================================
       RENDER MOVIES
    ===================================================== */

    function renderMovies(movies) {

        if (!resultsGrid) {
            return;
        }

        resultsGrid.innerHTML = "";


        if (!movies.length) {

            resultsGrid.style.display =
                "none";

            if (emptyResults) {
                emptyResults.hidden = false;
            }

            return;

        }


        resultsGrid.style.display =
            "grid";

        if (emptyResults) {
            emptyResults.hidden = true;
        }


        movies.forEach((movie) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "movie-card";


            card.innerHTML = `

                <div class="movie-poster">

                    <img
                        src="${movie.poster}"
                        alt="${movie.title}"
                        loading="lazy">

                    <span class="movie-badge">
                        ${movie.quality}
                    </span>

                </div>


                <div class="movie-content">

                    <h2 class="movie-title">
                        ${movie.title}
                    </h2>

                    <p class="movie-meta">
                        🇪🇬 مصر • ${movie.year}
                    </p>

                    <div class="movie-rating">
                        ⭐ ${movie.rating}
                    </div>

                    <button
                        type="button"
                        class="watch-button"
                        data-movie-id="${movie.id}">

                        ▶ مشاهدة الآن

                    </button>

                </div>

            `;


            resultsGrid.appendChild(card);

        });


        attachWatchButtons();

    }


    /* =====================================================
       WATCH BUTTONS
    ===================================================== */

    function attachWatchButtons() {

        const buttons =
            resultsGrid.querySelectorAll(
                ".watch-button"
            );


        buttons.forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const movieId =
                        Number(
                            button.dataset.movieId
                        );

                    const movie =
                        moviesDatabase.find(
                            (item) =>
                                item.id === movieId
                        );


                    if (!movie) {
                        return;
                    }


                    openMovie(movie);

                }
            );

        });

    }


    /* =====================================================
       OPEN MOVIE
    ===================================================== */

    function openMovie(movie) {

        if (watchMovieTitle) {

            watchMovieTitle.textContent =
                movie.title;

        }


        if (watchMovieMeta) {

            watchMovieMeta.textContent =
                `🇪🇬 مصر • ${movie.year} • ${movie.genreName}`;

        }


        if (youtubePlayer) {

            if (movie.youtubeId) {

                youtubePlayer.src =
                    `https://www.youtube.com/embed/${movie.youtubeId}`;

            } else {

                youtubePlayer.src = "";

                console.log(
                    `SFV-X: لا يوجد فيديو مضاف حاليًا لـ ${movie.title}`
                );

            }

        }


        if (movieModal) {

            movieModal.classList.add(
                "active"
            );

            movieModal.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE MOVIE
    ===================================================== */

    function closeMovie() {

        if (movieModal) {

            movieModal.classList.remove(
                "active"
            );

            movieModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (youtubePlayer) {

            youtubePlayer.src = "";

        }


        document.body.style.overflow =
            "";

    }


    /* =====================================================
       CLOSE EVENTS
    ===================================================== */

    closeModal?.addEventListener(
        "click",
        closeMovie
    );

    modalBackdrop?.addEventListener(
        "click",
        closeMovie
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMovie();

            }

        }
    );


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    backButton?.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );


    /* =====================================================
       CHANGE SELECTION
    ===================================================== */

    changeSelectionButton?.addEventListener(
        "click",
        () => {

            window.location.href =
                "../التصنيفات/genres.html";

        }
    );


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderMovies(
        filteredMovies
    );


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "===================================="
    );

    console.log(
        "SFV-X RESULTS"
    );

    console.log(
        "Country:",
        country
    );

    console.log(
        "Category:",
        category
    );

    console.log(
        "Genre:",
        selectedGenreKey || "all"
    );

    console.log(
        "Results:",
        filteredMovies.length
    );

    console.log(
        "===================================="
    );

});