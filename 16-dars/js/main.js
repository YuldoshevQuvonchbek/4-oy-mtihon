const URLdata = "https://fakestoreapi.com/products";

const hero_pradackt = document.querySelector(".hero_list");
const catigore = document.querySelector(".seller_list");
const catigore_cart = document.querySelector(".product_list");
const btn_more = document.querySelector(".product_btn");
const input = document.querySelector(".header_top_select_box__input");
const carts = document.querySelector(".carts");

const render_cart = async () => {
  try {
    let response = await fetch("https://fakestoreapi.com/products?limit=3");
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const show_pradakt = async () => {
  let dishs = await render_cart();

  hero_pradackt.innerHTML = dishs
    ?.map(
      (item) => `

      
                    <li class="hero_item  ">
                        <h3 class="hero_title">${item.title}</h3>
                        <span class="hero_text">$${item.price}</span>
                        <img class="hero_img" src="${item.image}" alt="">
                        <div class="hero_moniy_box">
                            <p class="hero_mony1">$${Math.trunc(
                              (item.price * 100) / 24
                            )}</p>
                            <p class="hero_mony">24% Off</p>
                             <a href="http://127.0.0.1:5500/16-dars/info.html?id=${
                               item.id
                             }" ><img class="product_item_btn" src="./img/icons8-info-100.png" alt=""></a>
                        </div>
                    </li>

  `
    )
    .join("");
};

show_pradakt();

const render_cart_ptadact = async () => {
  try {
    let response = await fetch("https://fakestoreapi.com/products/categories");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
(async () => {
  const data = await render_cart_ptadact();
  catigore.innerHTML = data
    ?.map(
      (item) =>
        `
      <li> <button  data-filter="${item}" class="seller_link" >${item} </button>  </li>

    `
    )
    .join("");
})();

const show_pradakt_cart = async () => {
  try {
    let response = await fetch("https://fakestoreapi.com/products?limit=20");
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const render_list = async () => {
  let dishs = await show_pradakt_cart();

  catigore_cart.innerHTML = dishs
    ?.map(
      (item) => `
      <li data-catigory="${item.category}"class="product_item">
                            <div class="product_contianer">
                                <div class="Product_img">
                                    <img class="product_img2" src="${
                                      item.image
                                    }" alt="img">
                                </div>
                                <div>
                                    <h3 class="Product_title">${item.title}</h3>
                                    <img class="Product_img1" src="./img/product_img.svg" alt="img">
                                    <div class="Product_box">
                                        <p class="Product_mony">$${
                                          item.price
                                        }</p>
                                        <p class="Product_mony2">$${Math.trunc(
                                          (item.price * 100) / 24
                                        )}</p>
                                        <p class="Product_mony3">24% Off</p>

                                        <a href="http://127.0.0.1:5500/16-dars/info.html?id=${
                                          item.id
                                        }" >
                                        <img class="product_item_btn" src="./img/icons8-info-100.png" alt="">
                                      
                                        </a>
                                        
                                        <a href="http://127.0.0.1:5500/16-dars/abaut.html?id=${
                                          item.id
                                        } ">
                                        <img class="product_item_btn2" src="./img/karzinka.png" alt="">
                                      
                                        </a>


                                    </div>
                                </div>
                            </div>
                        </li>
  `
    )
    .join("");
};
render_list();
show_pradakt_cart();

const search = async () => {
  try {
    const res = await fetch(URLdata);
    const data = await res.json();
    return data;
  } catch (error) {}
};

input.addEventListener("keydown", async (e) => {
  let data = await search();
  if ((carts.innerHTML = e.target.value)) {
    carts.innerHTML = data
      ?.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      ?.map(
        (item) => `
              <div class="search_box">
                      <div>
                         <img width="100" src="${item.image}" alt="${item.id}" />
                      </div>

                      <div class="search_box2">
                       <p class="search_title">${item.title}</p>
                       <p class="search_price">Price : ${item.price}$</p>
                 
                 </div>
                
               </div>
            `
      )
      .join("");
    carts.style.height = "500px";
  } else {
    carts.textContent = "";
    if (!e.target.value) {
      carts.style.height = "0px";
      carts.className = "display : none";
    }
  }
});
