//creation image

// récupération id
const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");

async function kanapApi() {
  let response = await fetch(`http://localhost:3000/api/products/${id}`);
  return response.json();
}

async function monProduit() {
  const insertion = await kanapApi().then((detail) => {
    const couleur = detail.colors;
    const monId = detail._id;

    const packShot = document.createElement("img");
    document.querySelector(".item__img").appendChild(packShot);
    packShot.src = detail.imageUrl;
    packShot.alt = detail.altTxt;

    const title = document.getElementById("title");
    title.innerHTML = detail.name;

    const prix = document.getElementById("price");
    prix.innerHTML = detail.price;

    const description = document.getElementById("description");
    description.innerHTML = detail.description;
  });
}

kanapApi();
monProduit();
