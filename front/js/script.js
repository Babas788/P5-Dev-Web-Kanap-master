// récupération des données de l'api avec méthode fetch
let url = "http://localhost:3000/api/products";
fetch(url)
  .then((response) => response.json())
  .then((products) => create(products))
  .catch((error) => {
    console.log(error);
  });

// création html pour chaque produit à l'aide d'une boucle
function create(products) {
  products.forEach((products) => {
    const anchor = createElement("a", `./product.html?id=${products._id}`);
    const article = createElement("article");
    const title = createElement("h3", "none", "none", "none", products.name);
    const image = createElement(
      "img",
      "none",
      products.imageUrl,
      products.altTxt
    );
    const description = createElement(
      "p",
      "none",
      "none",
      "none",
      products.description
    );
    document.getElementById("items").appendChild(anchor);
    anchor.appendChild(article);
    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(description);
    return anchor;
  });
}

// définition d'une fonction réutilisable
function createElement(balise, href, src, alt, text) {
  const created = document.createElement(balise);
  created.href = href;
  created.src = src;
  created.alt = alt;
  created.textContent = text;
  return created;
}
