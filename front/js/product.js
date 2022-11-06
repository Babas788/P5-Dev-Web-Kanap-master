// récupération id
const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");
const myUrl = `http://localhost:3000/api/products/${id}`;

fetch(myUrl)
  .then((response) => response.json())
  .then((data) => create(data));

function create(product) {
  picture(product);
  title(product);
  price(product);
  description(product);
  myColor(product);
  cart(product);
}

function picture(product) {
  const image = document.createElement("img");
  document.querySelector(".item__img").appendChild(image);
  image.src = product.imageUrl;
  image.alt = product.altTxt;
}

function title(product) {
  const title = document.getElementById("title");
  title.innerHTML = product.name;
}

function price(product) {
  const price = document.getElementById("price");
  price.innerHTML = product.price;
}

function description(product) {
  const description = document.getElementById("description");
  description.innerHTML = product.description;
}

function myColor(product) {
  const color = product.colors;
  color.forEach((color) => {
    const option = document.createElement("option");
    document.getElementById("colors").appendChild(option);
    option.value = color;
    option.textContent = color;
  });
}

function cart(product) {
  const myBasket = document.getElementById("addToCart");
  myBasket.addEventListener("click", () => {
    const quantity = document.getElementById("quantity").value;
    const colors = document.getElementById("colors").value;

    let basket = {
      myId: id,
      quantity,
      colors,
      productPrice: product.price,
      image: product.imageUrl,
      productDescription: product.description,
      productName: product.name,
      alt: product.altTxt,
    };

    let data = JSON.parse(localStorage.getItem("basket"));
    if (data) {
      data.push(basket);
      localStorage.setItem("basket", JSON.stringify(data));
    } else {
      data = [];
      data.push(basket);
      localStorage.setItem("basket", JSON.stringify(data));
    }
    window.location.href = "cart.html";
  });
}
