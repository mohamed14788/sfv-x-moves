"use strict";

/* =========================================================
   SFV-X MOVIES — CATEGORIES NAVIGATION
   File: categories.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GET CATEGORY BUTTONS
    ===================================================== */

    const moviesButton =
        document.getElementById("moviesCategory");

    const seriesButton =
        document.getElementById("seriesCategory");

    const animeButton =
        document.getElementById("animeCategory");

    const dilingoButton =
        document.getElementById("dilingoCategory");

    const cartoonsButton =
        document.getElementById("cartoonsCategory");

    const summariesButton =
        document.getElementById("summariesCategory");


    /* =====================================================
       SAVE CATEGORY
    ===================================================== */

    function saveCategory(key, name) {

        localStorage.setItem(
            "sfvx_selected_category",
            key
        );

        localStorage.setItem(
            "sfvx_selected_category_name",
            name
        );

    }


    /* =====================================================
       MOVIES → COUNTRIES
    ===================================================== */

    moviesButton?.addEventListener("click", () => {

        saveCategory(
            "movies",
            "أفلام"
        );

        window.location.href =
            "../الدول/countries.html";

    });


    /* =====================================================
       SERIES → COUNTRIES
    ===================================================== */

    seriesButton?.addEventListener("click", () => {

        saveCategory(
            "series",
            "مسلسلات"
        );

        window.location.href =
            "../الدول/countries.html";

    });


    /* =====================================================
       CARTOONS → COUNTRIES
    ===================================================== */

    cartoonsButton?.addEventListener("click", () => {

        saveCategory(
            "cartoons",
            "كرتون وأنيميشن"
        );

        window.location.href =
            "../الدول/countries.html";

    });


    /* =====================================================
       SUMMARIES → COUNTRIES
    ===================================================== */

    summariesButton?.addEventListener("click", () => {

        saveCategory(
            "summaries",
            "ملخصات أفلام"
        );

        window.location.href =
            "../الدول/countries.html";

    });


    /* =====================================================
       ANIME → GENRES DIRECTLY
    ===================================================== */

    animeButton?.addEventListener("click", () => {

        saveCategory(
            "anime",
            "أنمي"
        );

        window.location.href =
            "../التصنيفات/genres.html";

    });


    /* =====================================================
       DILINGO → GENRES DIRECTLY
    ===================================================== */

    dilingoButton?.addEventListener("click", () => {

        saveCategory(
            "dilingo",
            "ديلينغو"
        );

        window.location.href =
            "../التصنيفات/genres.html";

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    console.log(
        "SFV-X Categories — Navigation Ready."
    );

});