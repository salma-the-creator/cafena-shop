let search = document.querySelector(".search-form");
document.getElementById("search-btn").onclick = () => {
  search.classList.toggle("active");
  cartItem.classList.remove("active");
  responsiveNavbar.classList.remove("active");
};

let cartItem = document.querySelector(".cart-items-container");
document.getElementById("cart-btn").onclick = () => {
  cartItem.classList.toggle("active");
  search.classList.remove("active");
  responsiveNavbar.classList.remove("active");
};

let responsiveNavbar = document.querySelector(".navbar");
document.getElementById("menu-btn").onclick = () => {
  responsiveNavbar.classList.toggle("active");
  cartItem.classList.remove("active");
  search.classList.remove("active");
};

document.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  if (document.documentElement.scrollTop > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});


let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "flex";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// AOS function
AOS.init();


//shopping besket
document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.querySelector('.cart-list');
    const totalPriceEl = document.getElementById('total-price');

    function updateTotal() {
      let total = 0;
      cartList.querySelectorAll('.price').forEach(p => {
        total += parseFloat(p.textContent.replace('$', ''));
      });
      totalPriceEl.textContent = `$${total.toFixed(2)}`;
    }

    function ajouterProduit(nom, prix, image) {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span class="fas fa-times"></span>
        <img src="${image}" alt="">
        <div class="content">
          <h3>${nom}</h3>
          <div class="price">$${parseFloat(prix).toFixed(2)}</div>
        </div>
      `;

      cartItem.querySelector('.fa-times').addEventListener('click', () => {
        cartItem.remove();
        updateTotal();
      });

      cartList.appendChild(cartItem);
      updateTotal();
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        const produit = this.closest('.shop1');
        const nom = produit.querySelector('.product-name').textContent;
        const prix = produit.querySelector('.product-price').textContent.replace('$', '');
        const image = produit.querySelector('.product-img').getAttribute('src');

        ajouterProduit(nom, prix, image);
      });
    });
  });
// shopping besket end

document.querySelector('.checkout-btn').addEventListener('click', function (e) {
  e.preventDefault();

  const cartItems = document.querySelectorAll('.cart-list .cart-item');
  if (cartItems.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  const printItems = document.getElementById('print-items');
  const printTotal = document.getElementById('print-total');
  printItems.innerHTML = "";

  let total = 0;

  cartItems.forEach(item => {
    const imgSrc = item.querySelector('img').getAttribute('src');
    const prix = parseFloat(item.querySelector('.price').textContent.replace('$', ''));

    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = "80px";
    img.style.margin = "10px";

    printItems.appendChild(img);
    total += prix;
  });

  printTotal.textContent = `$${total.toFixed(2)}`;

  
  const printArea = document.getElementById('print-area');
  printArea.style.display = 'block';

  window.print();

  printArea.style.display = 'none';
});




// mettre a jour la quantité du panier
function updateCartQuantity() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
  });

  document.querySelector(".quantity").textContent = totalQuantity;
}

// Mettre à jour dès que la page se charge
document.addEventListener("DOMContentLoaded", updateCartQuantity);
