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

//   let savedVaues = localStorage.getItem("shoppingcart");
//   $('.varukorg').html(localStorage.getItem("shoppingcart"))
checkLocalStorage();
createShoppingCart();



 console.log(products);
 let container = $('#products');

  $.each(products, (i, product) => {
    let div = $('<div>').addClass('card').appendTo(container);
    var img = $('<img>'); 
    img.attr('src', product.img);
    img.appendTo(div);
    let flexContainer = $('<div>').addClass('flex-container').appendTo(div)
    let textContainer = $('<div>').addClass('text-container').appendTo(flexContainer)
    $('<h3>').html(product.name).appendTo(textContainer)
    $('<p>').html(product.price).appendTo(textContainer);
    $('<button>').addClass('addButton').attr('id', product.id).html('<i class="fas fa-shopping-basket"></i> ADD').appendTo(flexContainer)
  })

//   TOGGLE SHOW CART
    $('.shopping-btn').click(()=> {
        $('.varukorg').toggle();
    })

    $('.addButton').click((item)=>{ 
     let itemId = item.target.id;
      $.each(products, (i, product) => {
        if (itemId == product.id) {
          shoppingCart.push(product);
        }
      })
      $('#shopping-counter').html('Shoppingbag (' + shoppingCart.length + ')')
      createShoppingCart();
      localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
     })

     function createShoppingCart() {
      let varukorg = $('.varukorg');
      varukorg.html('');
      $.each(shoppingCart, (i, product) => {
      let mainDiv = $('<div>').addClass('shopping-container').appendTo(varukorg)
      let img = $('<img>');
      img.attr('src', product.img);
      img.appendTo(mainDiv);
      let infoDiv = $('<div>').addClass('info-container').appendTo(mainDiv);
      $('<h4>').html(product.name).appendTo(infoDiv);
      $('<p>').html(product.price).appendTo(infoDiv);
      $('<button>').addClass('removeButton').attr('id', product.id).html("REMOVE").appendTo(infoDiv);
      })

      $('.removeButton').click((item)=>{ 
      let itemId = item.target.id;
       $.each(products, (i, product) => {
         if (itemId == product.id) {
           shoppingCart.splice(i, 1);
         }
       })
       createShoppingCart();
       $('#shopping-counter').html('Shoppingbag (' + shoppingCart.length + ')')
       localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
      })
    };

    function checkLocalStorage() {
        let savedValues = localStorage.getItem("shoppingcart");
        if (savedValues != null) {
            shoppingCart = JSON.parse(savedValues);
        }
    }

      





  
  





