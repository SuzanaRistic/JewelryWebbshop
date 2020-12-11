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
      this.inCart = 0;
    }
  }

  let products = [];
  let shoppingCart = [];

  let p1 = new Product('earring', '../img/pearl.png', 299, 1);
  let p2 = new Product('watch', '../img/watch.png', 499, 2);
  let p3 = new Product('earring', '../img/diamond.png', 199, 3);

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
    .on('click', {p:product}, function(e){addCart(e.data.p)})
  })
  
function addCart(product){
  let x = 0;

  for (let i = 0; i < shoppingCart.length; i++) {
    if(product.id === shoppingCart[i].id){
      product.inCart++;
      x++;
    }
  }
  if(x == 0){
    
    product.inCart = 1;
    shoppingCart.push(product);
  }
  calcPrice ();
   calcProducts();
    localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
      createShoppingCart(product);
      console.log(product);
}
//   TOGGLE SHOW CART
    $('.shopping-btn').click(()=> {
        $('.varukorg').toggle();
    })

    //$('.addButton').click((item)=>{ 
     //let itemId = item.target.id;
      //$.each(products, (i, product) => {
       //if (itemId == product.id) {
        //  shoppingCart.push(product);
       // }
      //})
      // $('#shopping-counter').html('Shoppingbag (' + shoppingCart.length + ')')
      // createShoppingCart();
      // localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
   

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
      $('<button>').html("+").attr('id', "add").appendTo(infoDiv).on('click', function(){
        increaseProduct(product);
      });
      $('<input>').attr('type', "number").appendTo(infoDiv).attr('value', product.inCart);
      $('<button>').html("-").attr('id', "less").appendTo(infoDiv).on('click', function(){
        decreaseProduct(product);
      });
      $('<button>').addClass('removeButton').attr('id', product.id).html("REMOVE").appendTo(infoDiv)
      .on('click', {p:product}, function(e){removeItem(e.data.p)});
      })
      $('<span>').html("Price:" + calcPrice()).appendTo(varukorg).attr('id', "totalPrice");
    };
    function removeItem(product){
       for (let i = 0; i < shoppingCart.length; i++) {
       if(product.id == shoppingCart[i].id){
        shoppingCart.splice(i, 1); 
       }
     }
     product.inCart = 0;
     console.log(product);
     calcPrice ();
     calcProducts();

     localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
    createShoppingCart();
    }

    function checkLocalStorage() {
        let savedValues = localStorage.getItem("shoppingcart");
        if (savedValues != null) {
            shoppingCart = JSON.parse(savedValues);
            calcPrice ();
            calcProducts();
        }
    }
    function increaseProduct(product){
      product.inCart++;
      console.log(product);
      createShoppingCart();
      calcPrice ();
      calcProducts();
    }
    function decreaseProduct(product){
      product.inCart--;
      console.log(product);
      createShoppingCart();
      
      if(product.inCart == 0){
        removeItem(product);
      }
      calcPrice ();
      calcProducts();
    }


    function calcPrice (){
      let totalPrice = 0;
      for (let i = 0; i < shoppingCart.length; i++) {
        totalPrice += shoppingCart[i].price * shoppingCart[i].inCart;
      }

    
    return totalPrice;
    }

    function calcProducts (){
      let totalProduct = 0;
      for (let i = 0; i < shoppingCart.length; i++) {
        totalProduct += shoppingCart[i].inCart;
      }

      $('#shopping-counter').html('Shoppingbag (' + totalProduct + ')');
    return totalProduct;
    }

      





  
  





