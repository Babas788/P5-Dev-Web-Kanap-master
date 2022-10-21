//creation image

// récupération id
const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");

const api = `http://localhost:3000/api/products/${id}`;

fetch(api)
  .then((response) => response.json())
  .then((data) => create(data));

function create(api) {
  const image = document.createElement("img");

  const couleur = api.colors;

  function child() {
    document.querySelector(".item__img").appendChild(image);
  }

  function insert() {
    image.src = api.imageUrl;
    document.getElementById("title").innerHTML = api.name;
    document.getElementById("price").innerHTML = api.price;
    document.getElementById("description").innerHTML = api.description;
  }

  function color() {
    couleur.forEach((color) => {
      const option = document.createElement("option");
      console.log(option);
      document.getElementById("colors").appendChild(option);
      option.value = color;
      option.textContent = color;
    });
  }

  color();
  insert();
  child();
}
