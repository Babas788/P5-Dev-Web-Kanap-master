let url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((products) => create(products));

function create(products) {
  products.forEach((products) => {
    const id = products._id;
    const imageUrl = products.imageUrl;
    const alt = products.altTxt;
    const title = products.name;
    const description = products.description;

    const child = myLink(id);
    const article = myArticle();
    const image = myPicture(imageUrl, alt);
    const thisTitle = myTitle(title);
    const thisDescription = myDescription(description);
    myChild(child, article, image, thisTitle, thisDescription);
  });
}

function myLink(id) {
  const link = document.createElement("a");
  link.href = `./product.html?id=${id}`;
  return link;
}

function myChild(child, article, image, thisTitle, thisDescription) {
  const items = document.getElementById("items");
  items.appendChild(child);
  child.appendChild(article);
  article.appendChild(image);
  article.appendChild(thisTitle);
  article.appendChild(thisDescription);
}

function myArticle() {
  const article = document.createElement("article");
  return article;
}

function myPicture(imageUrl, alt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = alt;
  return image;
}

function myTitle(title) {
  const prodTitle = document.createElement("h3");
  prodTitle.innerHTML = title;
  return prodTitle;
}

function myDescription(description) {
  const prodDescription = document.createElement("p");
  prodDescription.innerHTML = description;
  return prodDescription;
}
