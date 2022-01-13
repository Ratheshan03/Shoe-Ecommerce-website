/*================ JQuery =================*/

$(document).ready(function () {
  $(".default_option").click(function () {
    $(".dropdown ul").addClass("active");
  });

  $(".dropdown ul li").click(function () {
    var text = $(this).text();
    $(".default_option").text(text);
    $(".dropdown ul").removeClass("active");
  });

  $(function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 300,
      values: [50, 200],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - $" +
        $("#slider-range").slider("values", 1)
    );
  });

  //* Retrieving Results *//
  $("#submit-btn").on("click", function (e) {
    var style = $("#style").val();
    var gender = $("#gender").val();
    var size = $("#size").val();
    var color = $("#color").val();
    var minPrice = $("#slider-range").slider("option", "values")[0];
    var maxPrice = $("#slider-range").slider("option", "values")[1];

    var output = " <div class='products__container grid'>";
    $.getJSON("../shoes.json", function (data) {
      for (var i in data.shoes) {
        if (gender == data.shoes[i].gender || gender == "Any")
          if (style == data.shoes[i].style || style == "Any")
            if (size == data.shoes[i].sizes || size == "Any")
              if (color == data.shoes[i].color || color == "Any")
                if (
                  data.shoes[i].price >= minPrice &&
                  data.shoes[i].price <= maxPrice
                ) {
                  {
                    {
                      {
                        {
                          output +=
                            "<article class='products__card'><img class='products__img' alt='product' src=" +
                            data.shoes[i].picture +
                            ">" +
                            "<h3 class='products__title'>" +
                            data.shoes[i].name +
                            "</h3>" +
                            "<p class='products__price'>" +
                            "$" +
                            data.shoes[i].price +
                            "</p>" +
                            "<button class='button more-detail-btn'><a class='more-detail-link' href='" +
                            data.shoes[i].url +
                            "'>More Details</a></button></article>";
                        }
                      }
                    }
                  }
                }
      }
      output += "</div>";
      document.getElementById("products_list").innerHTML = output;
    });
  });

  //* JQuery UI  Tabs *//
  $(function () {
    $("#tabs").tabs();
  });

  $(".show-image").on("click", function (e) {
    //* Photoviewer Plugin *//
    var options = {
      // options here
      // Enable modal to drag
      draggable: true,

      // Enable modal to resize
      resizable: true,

      // Enable image to move
      movable: true,

      // Enable keyboard navigation
      keyboard: true,

      // Shows the title
      title: true,

      // Min width of modal
      modalWidth: 920,

      // Min height of modal
      modalHeight: 520,
    };

    var viewer = new PhotoViewer(photos, options);
  });

  //* ---------- Add to Favorites ------------*//

  $(function () {
    $("#fav-btn").on("click", function () {
      try {
        $(this).attr("disabled", true);
        var shoeIdToAdd = $(this).closest("div").attr("id");
        var myFavouriteShoe = JSON.parse(localStorage.getItem("favShoes"));

        if (myFavouriteShoe == null) {
          myFavouriteShoe = [];
        }

        if (myFavouriteShoe != null) {
          for (var j = 0; j < myFavouriteShoe.length; j++) {
            if (shoeIdToAdd == myFavouriteShoe[j]) {
              alert("This shoe is already added to your favourites");
              myFavouriteShoe = [];
            }
          }
        }

        myFavouriteShoe.push(shoeIdToAdd);
        localStorage.setItem("favShoes", JSON.stringify(myFavouriteShoe));
      } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
          console.log("Error: Local storage limit exceeds");
        } else {
          console.log("ERROR: Saving to local storge.");
        }
      }
    });
  });

  //Remove item from favourites.......................................................
  $(function () {
    $(".remove-btn").on("click", function () {
      $(this).attr("disabled", true);

      var shoeIdToRemove = $(this).closest("div").attr("id");

      myFavouriteShoe = JSON.parse(localStorage.getItem("favShoes"));

      console.log(shoeIdToRemove);
      if (myFavouriteShoe != null) {
        for (var j = 0; j < myFavouriteShoe.length; j++) {
          if (shoeIdToRemove == myFavouriteShoe[j]) {
            alert("This Shoe has been removed from your favourites");

            delete myFavouriteShoe[j];

            localStorage.setItem("favShoes", JSON.stringify(myFavouriteShoe));

            myFavouriteShoe[j] = [];
          }
        }
      }

      if (myFavouriteShoe == null) {
        alert("You have no favourite items");
      }
    });
  });

  //View all items in favourites.......................................................
  $(function () {
    $(".viewFavourites").on("click", function () {
      console.log("Restoring array data from local storage");
      myFavouriteShoe = JSON.parse(localStorage.getItem("favShoes"));

      var output = "<div class='fav-div'>";
      if (myFavouriteShoe != null) {
        $.getJSON("../shoes.json", function (data) {
          for (var i = 0; i < data.shoes.length; i++) {
            for (j = 0; j < myFavouriteShoe.length; j++) {
              if (data.shoes[i].id == myFavouriteShoe[j]) {
                output +=
                  "<article class='fav-item cart__card'> <div class='fav-box cart__box'><img src='" +
                  data.shoes[i].picture +
                  "' class='cart__img'> </div> <div class='cart__details'> <h3 class='cart__title'>" +
                  data.shoes[i].name +
                  "</h3><span class='cart__price'> $" +
                  data.shoes[i].price +
                  ".00</span><div class='cart__amount'><button class='button fav-more-btn more-detail-btn'><a class=' more-detail-link' href='" +
                  data.shoes[i].url +
                  "'>More Details</a></button>" +
                  "<div id='" +
                  data.shoes[i].id +
                  "'> <button type='button' class='remove-btn' id='remove-fav'> <i class='bx bx-trash-alt cart__amount-trash'></i></button></div></div></div></article>";
              }
            }
          }
          output += "</div>";
          document.getElementById("favourite_list").innerHTML = output;
        });
      }
    });
  });

  //Clear all items in favourites.......................................................
  $(function () {
    $(".clearFavourites").on("click", function () {
      $("#favourite_list").remove();
      myFavouriteShoe = JSON.parse(localStorage.getItem("favshoes"));
      localStorage.clear();
    });
  });
});

//* -------------------- Shoe Page ------------------- *//

const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
  imgItem.addEventListener("click", (event) => {
    event.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});

function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;

  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}

window.addEventListener("resize", slideImage);

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
  spaceBetween: 30,
  loop: "true",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 24,
  loop: "true",

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== SHOW CART ===============*/
const cart = document.getElementById("cart"),
  cartShop = document.getElementById("cart-shop"),
  cartClose = document.getElementById("cart-close");

/*===== CART SHOW =====*/
/* Validate if constant exists */
if (cartShop) {
  cartShop.addEventListener("click", () => {
    cart.classList.add("show-cart");
  });
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if (cartClose) {
  cartClose.addEventListener("click", () => {
    cart.classList.remove("show-cart");
  });
}
