const movies = window.movies;

// upon page load
addEventListener("DOMContentLoaded", function () {
    //Banner slides
    const swiper = new Swiper('.banner', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
        autoplay: {
          delay: 3000,
        },
    });

    //Populate "All Movies" List and Special Presentations
    populateDefault();

    let movBtn = document.querySelectorAll("#category ul .left li");
    movBtn.forEach(function (target, i) {
        target.addEventListener("click", function (e) {
            e.preventDefault();
            movBtn.forEach(function (b) {
                b.classList.remove("active"); //remove class "active" from all buttons in #category
            });
            target.classList.add("active"); //add class "active" to the one that was clicked
            populateMovies(i);
        });
    });

    let menuBtn = document.querySelector("#header-menu a");
    menuBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(document.getElementById("menu_contents").style.display === "block") {
            document.getElementById("menu_contents").style.display = "none";
            menuBtn.innerHTML = `<i class="fa-solid fa-bars"></i>Menu`;
        }
        else {
            document.getElementById("menu_contents").style.display = "block";
            menuBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        }
    });
});

function populateDefault() {
    //"All Movies"
    populateMovies(0);

    //"Special Presentations"
    results = movies.filter(function (item) {
        return item.special === true;
    });

    cardWrapper = document.querySelector(".special .card-wrapper");
    results.forEach(function (item) {
        cardWrapper.prepend(createCard(item));
    });
}

function populateMovies(ind) {
    let cat = "all";
    if(ind === 1) 
        cat = "now";
    else if(ind === 2)
        cat = "soon";

    let results = movies.filter(function (item) {
        return item.special === false && item.category.includes(cat);
    });

    let cardWrapper = document.querySelector(".movies .card-wrapper");
    cardWrapper.innerHTML = "";
    results.forEach(function (item) {
        cardWrapper.appendChild(createCard(item));
    });
}

function createCard(item) {
    // Create a <div> to hold the card
    const card = document.createElement("div");
    // Add the .card class to the <div>
    card.classList.add("card");

    const cardfig = document.createElement("a");
    cardfig.href = "#";
    cardfig.classList.add("card-image");

    // Create a poster image
    const cardImage = document.createElement("img");
    cardImage.src = item.imageUrl;
    cardImage.alt = item.title;
    cardfig.appendChild(cardImage);

    // Create movie title
    const cardTitle = document.createElement("p");
    cardTitle.innerHTML = item.title;
    cardfig.appendChild(cardTitle);

    card.appendChild(cardfig);

    const cardDetails = document.createElement("div");
    let icon, text;
    // Create option: trailer
    if(item.trailer === true) {
        const trailer = document.createElement("a");
        trailer.href = "#";
        trailer.classList.add("trailer");

        icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-circle-play");
        trailer.appendChild(icon);

        text = document.createTextNode(" Trailer");
        trailer.appendChild(text);

        cardDetails.appendChild(trailer);
    }

    // Create option: showtimes
    if(item.showtimes === true) {
        const showtimes = document.createElement("a");
        showtimes.href = "#";
        showtimes.classList.add("showtimes");

        icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-clock");
        showtimes.appendChild(icon);
        
        text = document.createTextNode(" Showtimes");
        showtimes.appendChild(text);

        cardDetails.appendChild(showtimes);
    }

    // Create option: advance
    if(item.advance === true) {
        const advance = document.createElement("a");
        advance.href = "#";
        advance.classList.add("advance");

        icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-ticket");
        advance.appendChild(icon);

        text = document.createTextNode(" Advance Tickets");
        advance.appendChild(text);

        cardDetails.appendChild(advance);

        //release date
        const date = document.createElement("span");
        date.innerHTML = item.date;
        date.classList.add("date");
        cardDetails.appendChild(date);
    }

    // Create option: tickets
    if(item.tickets === true) {
        const tickets = document.createElement("a");
        tickets.href = "#";
        tickets.classList.add("tickets");

        icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-ticket");
        tickets.appendChild(icon);

        text = document.createTextNode(" Tickets");
        tickets.appendChild(text);

        cardDetails.appendChild(tickets);
    }
    card.appendChild(cardDetails);

    // Return the card’s <div> element to the caller
    return card;
}