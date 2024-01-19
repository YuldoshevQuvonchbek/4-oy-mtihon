const carzinka__cart = document.querySelector(".carzinka__cart");
let boshqaruv = new URLSearchParams(document.location.search);
const deleteBtn = document.querySelector(".delete_btn");
const data_URL = "https://fakestoreapi.com/products";

const pradact_id = boshqaruv.get("id");
console.log(pradact_id);

let prodact = null;
let prodacts = JSON.parse(localStorage.getItem("prodacts"));

let oldPradackt = prodacts ? prodacts : [];

const renderCart = async () => {
  try {
    const ren = await fetch(`${data_URL}/${pradact_id}`);
    prodact = await ren.json();

    carzinka__cart.innerHTML = `


       <div class="carzinka_cart_box12">
                <div class="carzinka_cart_box123">
                    <button id="delete" class="delete_btn"><img src="./img/delet_btn.svg" alt="delete"></button>
                    <img  class="carzinka_cart_box_praduct111" src="${prodact.image}" alt="${prodact.id}">
               
                    <p class="carzinka_cart_box_praduct">${prodact.title}</p>
                </div>
            
                <div class="carzinka_cart_box1">
                    <p id="totalPrice" class="carzinka_cart_box1_text"></p>
                    <div class="carzinka_cart_box1_text">

                        <button id="increment" class="carzinka_cart_box1_text_btn_dek">+</button>
                      <span  id="caout" class="carzinka_cart_box1_text_nummer">0</span>
                       <button   id="dincrement" class="carzinka_cart_box1_text_btn_in">-</button>
                    
                    </div>
                    <p class="carzinka_cart_box1_text">$${prodact.price}</p>
                </div>
            </div>

             <div class="carzinka__cart__box">
                <p class="carzinka__cart__box__text">TOTAL</p>
                <p id="totalPrice1"  class="carzinka__cart__box__text"></p>
            </div>
                 
                `;
  } catch (error) {
    console.log(Error);
  }
};
renderCart();

carzinka__cart.addEventListener("click", (e) => {
  let id = e.target.id;
  console.log(id);
  if (id === "increment") {
    mahsulotniKupaytir();
  }
  if (id === "dincrement") {
    mahsulotniKamaytir();
  }
  if (id === "delete") {
    mahsulotniOchir();
  }
});

function mahsulotniKupaytir() {
  let caout = document.querySelector("#caout");

  let el = oldPradackt.find((item) => item.id == prodact.id);

  if (!el) {
    oldPradackt.push({
      ...prodact,
      userPrice: prodact.price,
      userCount: 1,
    });
    caout.textContent = 1;
  } else {
    el.userCount += 1;
    el.userPrice = el.userCount * el.price;
    caout.textContent = el.userCount;
  }
  updateTotalPrice();
}

function mahsulotniKamaytir() {
  let caout = document.querySelector("#caout");

  let el = oldPradackt.find((item) => item.id == prodact.id);

  if (el) {
    if (el.userCount > 1) {
      el.userCount -= 1;
      el.userPrice = el.userCount * el.price;
      caout.textContent = el.userCount;
    } else {
      oldPradackt = oldPradackt.filter((item) => item.id !== prodact.id);
      caout.textContent = 0;
    }
  }
  updateTotalPrice();
  localStorage.setItem("prodacts", JSON.stringify(oldPradackt));
}

function updateTotalPrice() {
  let totalPriceElement = document.getElementById("totalPrice");
  let totalPriceElement1 = document.getElementById("totalPrice1");
  let totalAmount = calculateTotalAmount();
  totalPriceElement.textContent = formatCurrency(totalAmount);
  totalPriceElement1.textContent = formatCurrency(totalAmount);
}

function calculateTotalAmount() {
  let totalAmount = 0;
  if (oldPradackt.length > 0) {
    const selectedProduct = oldPradackt.find((item) => item.id === prodact.id);
    if (selectedProduct) {
      totalAmount = selectedProduct.userCount * selectedProduct.price;
    }
  }

  return totalAmount;
}

function formatCurrency(amount) {
  return `$${Math.trunc(amount)}`;
}

