// HAMBURGER MENU
$(".cross-btn").hide();
$("nav").hide();
$(".hamburg-btn").click(function () {
  $("nav").slideToggle("slow", function () {
    $(".hamburg-btn").hide();
    $(".cross-btn").show();
  });
});

$(".cross-btn").click(function () {
  $("nav").slideToggle("slow", function () {
    $(".cross-btn").hide();
    $(".hamburg-btn").show();
  });
});

// PRODUCT ARRAY
class Product {
  constructor(name, img, price, id) {
    this.name = name;
    this.img = img;
    this.price = price;
    this.id = id;
    this.inCart = 0;
  }
}

let products = [];
let shoppingCart = [];

let p1 = new Product("pearl earrings", "../img/pearl.png", 299, 1);
let p2 = new Product("rose watch", "../img/watch.png", 699, 2);
let p3 = new Product("drop earrings", "../img/diamond.png", 499, 3);
let p4 = new Product("flower ring", "../img/ring.png", 1299, 4);
let p5 = new Product("suave necklace", "../img/necklace.png", 399, 5);
let p6 = new Product("bracelet trio", "../img/bracelet.png", 799, 6);

products.push(p1, p2, p3, p4, p5, p6);

checkLocalStorage();
createShoppingCart();
createCheckOut();
checkEmptyCart();

let container = $("#products");

$.each(products, (i, product) => {
  let div = $("<div>").addClass("card").appendTo(container);
  var img = $("<img>");
  img.attr("src", product.img);
  img.appendTo(div);
  let flexContainer = $("<div>").addClass("flex-container").appendTo(div);
  let textContainer = $("<div>")
    .addClass("text-container")
    .appendTo(flexContainer);
  $("<h3>").html(product.name).appendTo(textContainer);
  $("<p>")
    .html(product.price + ":-")
    .appendTo(textContainer);

  $("<button>")
    .addClass("addButton")
    .attr("id", product.id)
    .html('<i class="fas fa-shopping-basket"></i> ADD')
    .appendTo(flexContainer)
    .on("click", { p: product }, function (e) {
      addCart(e.data.p);
    });
});

function addCart(product) {
  let isProductInCart = 0;

  for (let i = 0; i < shoppingCart.length; i++) {
    if (product.id === shoppingCart[i].id) {
      shoppingCart[i].inCart++;
      isProductInCart++;
    }
  }
  if (isProductInCart == 0) {
    product.inCart++;
    shoppingCart.push(product);
  }

  $(".shopping-bag").show();

  localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
  createShoppingCart(product);
  createCheckOut();
  calcPrice();
  calcProducts();
}

//   TOGGLE SHOW CART
$(".shopping-btn").click(() => {
  $(".shopping-bag").toggle();
});

function createShoppingCart() {
  let shoppingBag = $(".shopping-bag");
  shoppingBag.html("");
  $.each(shoppingCart, (i, product) => {
    let mainDiv = $("<div>")
      .addClass("shopping-container")
      .appendTo(shoppingBag);
    let imgContainer = $("<div>").addClass("img-container").appendTo(mainDiv);
    let img = $("<img>");
    img.attr("src", product.img);
    img.appendTo(imgContainer);
    let infoDiv = $("<div>").addClass("info-container").appendTo(mainDiv);
    $("<h4>").html(product.name).appendTo(infoDiv);
    $("<p>")
      .html(product.price + ":-")
      .appendTo(infoDiv);
    let inputDiv = $("<div>").addClass("input-div").appendTo(infoDiv);
    $("<button>")
      .addClass("fas fa-plus")
      .attr("id", "add")
      .appendTo(inputDiv)
      .on("click", function () {
        increaseProduct(product);
      });
    $("<p>").attr("type", "number").appendTo(inputDiv).html(product.inCart);
    $("<button>")
      .addClass("fas fa-minus")
      .attr("id", "less")
      .appendTo(inputDiv)
      .on("click", function () {
        decreaseProduct(product);
      });
    $("<button>")
      .addClass("removeButton")
      .attr("id", product.id)
      .html("REMOVE")
      .appendTo(infoDiv)
      .on("click", { p: product }, function (e) {
        removeItem(e.data.p);
      });
  });
  $("<span>")
    .html("Price: " + calcPrice() + ":-")
    .appendTo(shoppingBag)
    .attr("id", "totalPrice");
  $("<button>")
    .html("PAY")
    .appendTo(shoppingBag)
    .attr("id", "cart-button")
    .on("click", () => {
      if (shoppingCart.length === 0) {
        alert("Your shoppingcart is empty");
      }
      if (shoppingCart.length > 0) {
        window.location.href = "../html/checkout.html";
      }
    });
  checkEmptyCart();
}
function removeItem(product) {
  for (let i = 0; i < shoppingCart.length; i++) {
    if (product.id == shoppingCart[i].id) {
      shoppingCart.splice(i, 1);
    }
  }

  if (shoppingCart.length == 0) {
    $(".shopping-bag").hide();
  }

  product.inCart = 0;
  calcPrice();
  calcProducts();
  localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
  createShoppingCart();
  createCheckOut();
}

function checkLocalStorage() {
  let savedValues = localStorage.getItem("shoppingcart");
  if (savedValues != null) {
    shoppingCart = JSON.parse(savedValues);
    calcPrice();
    calcProducts();
  }
}
function increaseProduct(product) {
  product.inCart++;
  createShoppingCart();
  createCheckOut();
  calcPrice();
  calcProducts();
  localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
}
function decreaseProduct(product) {
  product.inCart--;

  if (product.inCart == 0) {
    removeItem(product);
  }

  createShoppingCart();
  createCheckOut();
  calcPrice();
  calcProducts();
  localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
}

function calcPrice() {
  let totalPrice = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    totalPrice += shoppingCart[i].price * shoppingCart[i].inCart;
  }

  return totalPrice;
}

function calcProducts() {
  let totalProduct = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    totalProduct += shoppingCart[i].inCart;
  }

  $("#shopping-counter").html("Shopping Bag (" + totalProduct + ")");
  return totalProduct;
}

function createCheckOut() {
  let checkoutContainer = $("#check-out");
  checkoutContainer.html("");

  $.each(shoppingCart, (i, product) => {
    let mainDiv = $("<div>")
      .addClass("shopping-container")
      .appendTo(checkoutContainer);
    let imgContainer = $("<div>").addClass("img-container").appendTo(mainDiv);
    let img = $("<img>");
    img.attr("src", product.img);
    img.appendTo(imgContainer);
    let infoDiv = $("<div>").addClass("info-container").appendTo(mainDiv);
    $("<h4>").html(product.name).appendTo(infoDiv);
    $("<p>")
      .html(product.price + ":-")
      .appendTo(infoDiv);
    let inputDiv = $("<div>").addClass("input-div").appendTo(infoDiv);
    $("<button>")
      .addClass("fas fa-plus")
      .attr("id", "add")
      .appendTo(inputDiv)
      .on("click", function () {
        increaseProduct(product);
      });
    $("<p>").appendTo(inputDiv).html(product.inCart);
    $("<button>")
      .addClass("fas fa-minus")
      .attr("id", "less")
      .appendTo(inputDiv)
      .on("click", function () {
        decreaseProduct(product);
      });
    $("<button>")
      .addClass("removeButton")
      .attr("id", product.id)
      .html("REMOVE")
      .appendTo(infoDiv)
      .on("click", { p: product }, function (e) {
        removeItem(e.data.p);
      });
  });
  $("<span>")
    .html("Price: " + calcPrice() + ":-")
    .appendTo(checkoutContainer)
    .attr("id", "totalPrice");
}

let form = $("form");
form.on("submit", (event) => {
  event.preventDefault();
  let checkoutContainer = $("#check-out");
  checkoutContainer.html("");
  let confirmContainer = $("<div>")
    .addClass("confirm-container")
    .appendTo(checkoutContainer);
  $("<h2>").addClass("fas fa-check-circle").appendTo(confirmContainer);
  $("<h3>")
    .html("Tack för ditt köp " + $("#first-name").val())
    .appendTo(confirmContainer)
    .addClass("thank-you");
  $("<p>")
    .html("Order number: " + Math.floor(Math.random() * 100000) + 1)
    .appendTo(confirmContainer)
    .addClass("confirmation");
  $("<button>")
    .html("Shop more")
    .appendTo(confirmContainer)
    .on("click", () => {
      window.location.href = "../index.html";
    });
  $("#form").hide();
  shoppingCart = [];
  localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
});

function checkEmptyCart() {
  if (shoppingCart.length === 0) {
    $("#totalPrice").html("Varukorgen är tom");
    $("#cart-button").hide();
  }
}
