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

  $(function () {
    $("#tabs").tabs();
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
                            "<span class='products__price'>" +
                            "$" +
                            data.shoes[i].price +
                            "</span>" +
                            "<button class='button button--gray button--small'><a href='" +
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
});
// $("#reset-btn").on("click", function (e) {
//   document.getElementById("form-search").reset();
//   document.getElementById("new__data").innerHTML = "";
//   document.getElementById("new__card").innerHTML = "";
//   var imgList = "<img class='new__img' src='" + f.src + "' />";
//   var titleOutput = "<h3 class='new__title' >" + f.name + "</h3>";
//   var priceOutput = "<span class='new__price'>" + f.price + "<span>";

//   $(imgList).appendTo("#new__card");
//   $(titleOutput).appendTo("#new__data");
//   $(priceOutput).appendTo("#new__data");
// });

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
