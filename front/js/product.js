//creation image

// récupération id
const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");
const myUrl = `http://localhost:3000/api/products/${id}`;

// récupération de mon prix
let myPrice = 0;

fetch(myUrl)
  .then((response) => response.json())
  .then((data) => create(data));

function create(product) {
  myPicture(product);
  insert(product);
  const color = product.colors;

  //récup prix
  myPrice = product.price;

  function myPicture(product) {
    const image = document.createElement("img");
    document.querySelector(".item__img").appendChild(image);
    image.src = product.imageUrl;
  }

  function insert(product) {
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
  }

  color.forEach((color) => {
    const option = document.createElement("option");
    document.getElementById("colors").appendChild(option);
    option.value = color;
    option.textContent = color;
  });
}

// récupération données bouton panier

const addBasket = document.getElementById("addToCart");

// creation d'un message d'alerte

addBasket.addEventListener("click", (e) => {
  const productColor = document.getElementById("colors").value;
  const productQuantity = document.getElementById("quantity").value;
  if (
    productColor == null ||
    productColor == "" ||
    productQuantity == null ||
    productQuantity == 0
  ) {
    alert("veuillez selectionner une couleur et une quantité valide!");
  }

  //récupération des données

  let myData = {
    id: id,
    color: productColor,
    price: myPrice,
    quantity: productQuantity,
  };

  localStorage.setItem(productColor, JSON.stringify(myData));
});
