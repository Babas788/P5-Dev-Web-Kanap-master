let url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((products) => create(products));

function createdElement(balise, href, src, alt, text) {
  const created = document.createElement(balise);
  created.href = href;
  created.src = src;
  created.alt = alt;
  created.textContent = text;
  return created;
}

function create(products) {
  products.forEach((products) => {
    const anchor = createdElement("a", `./product.html?id=${products._id}`);
    const article = createdElement("article");
    const title = createdElement("h3", "none", "none", "none", products.name);
    const image = createdElement(
      "img",
      "none",
      products.imageUrl,
      products.altTxt
    );
    const description = createdElement(
      "p",
      "none",
      "none",
      "none",
      products.description
    );
    document.getElementById("items").appendChild(anchor);
    anchor.appendChild(article);
    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(description);
    return anchor;
  });
}
