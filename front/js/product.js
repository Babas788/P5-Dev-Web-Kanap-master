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
    const texte = detail.altTxt;
    const image = detail.imageUrl;
    const description = detail.description;
    const prix = detail.price;
    const couleur = detail.colors;
    const monId = detail._id;

    const packShot = document.createElement("img");
    document.querySelector(".item__img").appendChild(packShot);
    packShot.src = image;
    packShot.alt = texte;
  });
}

kanapApi();
monProduit();
