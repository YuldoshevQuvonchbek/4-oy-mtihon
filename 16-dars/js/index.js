const info_box = document.querySelector(".info__item");
let boshqaruv = new URLSearchParams(document.location.search);
const data_URL = "https://fakestoreapi.com/products";

const pradact_id = boshqaruv.get("id");

const renderCart = async () => {
  try {
    const ren = await fetch(`${data_URL}/${pradact_id}`);
    const data = await ren.json();
    info_box.innerHTML = `
      
          <div class="info__item__cart">
                    <img class="info__item__cart__img" src="${data.image}" alt="">
                </div>
                <div class="info__item__cart2">
                    <p class="info__item__cart2_text1">${data.title}</p>
                    <p class="info__item__cart2_text2">${data.description}</p>
                  
                    <p class="info__item__cart2_text4"><span>price :</span> $${data.price}</p>
                    <p class="info__item__cart2_text5"><span>count :</span> ${data.rating.count}</p>

                </div>
        
   
        
        
        `;
  } catch (error) {
    console.log(Error);
  }
};
renderCart();
