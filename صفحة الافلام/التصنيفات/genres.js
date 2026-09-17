/* =========================================================
   SFV-X MOVIES — GENRES PAGE
   File: genres.js
   المسار:
   القسم → الدولة → التصنيف → النتائج
========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           GET GENRE CARDS
        ===================================================== */

        const genreCards =
            document.querySelectorAll(
                ".genre-card"
            );


        /* =====================================================
           GET PREVIOUS SELECTIONS
        ===================================================== */

        const selectedCategory =
            localStorage.getItem(
                "sfvx_selected_category"
            );

        const selectedCategoryName =
            localStorage.getItem(
                "sfvx_selected_category_name"
            );

        const selectedCountry =
            localStorage.getItem(
                "sfvx_selected_country"
            );

        const selectedCountryName =
            localStorage.getItem(
                "sfvx_selected_country_name"
            );


        /* =====================================================
           DEBUG INFORMATION
        ===================================================== */

        console.log(
            "SFV-X — القسم:",
            selectedCategoryName ||
            "غير محدد"
        );

        console.log(
            "SFV-X — الدولة:",
            selectedCountryName ||
            "غير محددة"
        );


        /* =====================================================
           CHECK PREVIOUS SELECTIONS
        ===================================================== */

        if (!selectedCategory) {

            console.warn(
                "SFV-X: لم يتم اختيار قسم."
            );

        }


        if (!selectedCountry) {

            console.warn(
                "SFV-X: لم يتم اختيار دولة."
            );

        }


        /* =====================================================
           SELECT GENRE
        ===================================================== */

        genreCards.forEach(
            (card) => {


                card.addEventListener(
                    "click",
                    () => {


                        /* =====================================
                           GET GENRE DATA
                        ===================================== */

                        const genreKey =
                            card.dataset.genre;

                        const genreName =
                            card.dataset.genreName;


                        if (!genreKey) {

                            console.error(
                                "SFV-X: مفتاح التصنيف غير موجود."
                            );

                            return;

                        }


                        /* =====================================
                           SAVE GENRE
                        ===================================== */

                        localStorage.setItem(
                            "sfvx_selected_genre",
                            genreKey
                        );


                        localStorage.setItem(
                            "sfvx_selected_genre_name",
                            genreName ||
                            genreKey
                        );


                        /* =====================================
                           VISUAL SELECTION
                        ===================================== */

                        genreCards.forEach(
                            (item) => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                        card.classList.add(
                            "selected"
                        );


                        /* =====================================
                           DEBUG
                        ===================================== */

                        console.log(
                            "SFV-X — التصنيف:",
                            genreName ||
                            genreKey
                        );


                        console.log(
                            "SFV-X — المسار:",
                            `${selectedCategoryName || "قسم"} → ${
                                selectedCountryName || "دولة"
                            } → ${
                                genreName || genreKey
                            }`
                        );


                        /* =====================================
                           NEXT PAGE
                           التصنيف → النتائج
                        ===================================== */

                        setTimeout(
                            () => {

                                window.location.href =
                                    "../النتائج/results.html";

                            },
                            250
                        );


                    }
                );


            }
        );


        /* =====================================================
           KEYBOARD SUPPORT
        ===================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    document.activeElement?.blur();

                }

            }
        );


        /* =====================================================
           PAGE READY
        ===================================================== */

        console.log(
            "SFV-X Genres — جاهزة للعمل."
        );


    }
);