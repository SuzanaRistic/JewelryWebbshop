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
  let shoppingCart = [];

  let p1 = new Product('earring', '../img/pearl.png', '299:-', 1);
  let p2 = new Product('watch', '../img/watch.png', '499:-', 2);
  let p3 = new Product('earring', '../img/diamond.png', '199:-', 3);

  products.push(p1, p2, p3);

 console.log(products);
 let container = $('#products');

  $.each(products, (i, product) => {
    let div = $('<div>').addClass('card').attr('id', product.id).appendTo(container);
    var img = $('<img>'); 
    img.attr('src', product.img);
    img.appendTo(div);
    let flexContainer = $('<div>').addClass('flex-container').appendTo(div)
    let textContainer = $('<div>').addClass('text-container').appendTo(flexContainer)
    $('<h3>').html(product.name).appendTo(textContainer)
    $('<p>').html(product.price).appendTo(textContainer);
    $('<button>').html('<i class="fas fa-shopping-basket"></i> ADD').appendTo(flexContainer)
  })





  
  





