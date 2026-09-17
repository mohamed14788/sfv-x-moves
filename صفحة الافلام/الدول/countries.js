"use strict";

/* =========================================================
   SFV-X MOVIES — COUNTRIES → GENRES
   File: countries.js

   المسار:
   القسم → الدولة → التصنيف → النتائج
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           GET COUNTRY CARDS
        ===================================================== */

        const countryCards =
            document.querySelectorAll(
                ".country-card"
            );


        /* =====================================================
           GET SELECTED CATEGORY
        ===================================================== */

        const selectedCategory =
            localStorage.getItem(
                "sfvx_selected_category"
            );

        const selectedCategoryName =
            localStorage.getItem(
                "sfvx_selected_category_name"
            );


        /* =====================================================
           DEBUG — CATEGORY
        ===================================================== */

        console.log(
            "SFV-X — القسم المختار:",
            selectedCategory ||
            "غير محدد"
        );

        console.log(
            "SFV-X — اسم القسم:",
            selectedCategoryName ||
            "غير محدد"
        );


        /* =====================================================
           CHECK COUNTRY CARDS
        ===================================================== */

        if (!countryCards.length) {

            console.error(
                "SFV-X: لم يتم العثور على بطاقات الدول."
            );

            return;

        }


        /* =====================================================
           COUNTRY CLICK
        ===================================================== */

        countryCards.forEach(
            (card) => {


                card.addEventListener(
                    "click",
                    () => {


                        /* =====================================
                           GET COUNTRY DATA
                        ===================================== */

                        const countryCode =
                            card.dataset.country;

                        const countryName =
                            card.dataset.countryName;


                        /* =====================================
                           CHECK COUNTRY DATA
                        ===================================== */

                        if (!countryCode) {

                            console.error(
                                "SFV-X: data-country غير موجود."
                            );

                            return;

                        }


                        /* =====================================
                           COUNTRY NAME FALLBACK
                        ===================================== */

                        const finalCountryName =
                            countryName ||
                            countryCode;


                        /* =====================================
                           SAVE COUNTRY
                        ===================================== */

                        localStorage.setItem(
                            "sfvx_selected_country",
                            countryCode
                        );

                        localStorage.setItem(
                            "sfvx_selected_country_name",
                            finalCountryName
                        );


                        /* =====================================
                           VISUAL SELECTION
                        ===================================== */

                        countryCards.forEach(
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
                            "SFV-X — الدولة:",
                            countryCode
                        );

                        console.log(
                            "SFV-X — اسم الدولة:",
                            finalCountryName
                        );

                        console.log(
                            "SFV-X — المسار:",
                            `${selectedCategoryName || "قسم"} → ${finalCountryName}`
                        );


                        /* =====================================
                           GO TO GENRES
                        ===================================== */

                        setTimeout(
                            () => {

                                window.location.href =
                                    "../التصنيفات/genres.html";

                            },
                            250
                        );


                    }
                );


            }
        );


        /* =====================================================
           PAGE READY
        ===================================================== */

        console.log(
            "SFV-X Countries — الربط مع التصنيفات جاهز."
        );


    }
);