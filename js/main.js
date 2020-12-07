// HAMBURGER MENU
$( ".cross-btn" ).hide();
$( "nav" ).hide();
$( ".hamburg-btn" ).click(function() {
$( "nav" ).slideToggle( "slow", function() {
$( ".hamburg-btn" ).hide();
$( ".cross-btn" ).show();
});
});

$( ".cross-btn" ).click(function() {
$( "nav" ).slideToggle( "slow", function() {
$( ".cross-btn" ).hide();
$( ".hamburg-btn" ).show();
});
});

// PRODUCT ARRAY
class Product {
    constructor(name, img, price, id) {
      this.name = name;
      this.img = img;
      this.price = price;
      this.id = id;
    }
  }

  let products = [];

  let newProduct = new Product('earring', '../img/pearl.png', '299:-', 1);
  let newProduct2 = new Product('watch', '../img/watch.png', '499:-', 2);
  let newProduct3 = new Product('earring', '../img/diamond.png', '199:-', 3);

  products.push(newProduct, newProduct2, newProduct3);

  console.log(products);
  
  





