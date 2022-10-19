//récupération de l'API
kanapApi();

creationProduit();

async function kanapApi() {
  let produits = await fetch("http://localhost:3000/api/products");
  return produits.json();
}

//injection de mes cartes avec reprise d'API

async function creationProduit() {
  const style = await kanapApi().then((mesProduits) => {
    //  Boucle pour chaque élément
    for (let i = 0; i < mesProduits.length; i += 1) {
      const lien = document.createElement("a");
      document.getElementById("items").appendChild(lien);
      lien.href = `./product.html?id=${mesProduits[i]._id}`;

      const mesArticles = document.createElement("article");
      lien.appendChild(mesArticles);

      const mesImages = document.createElement("img");
      mesArticles.appendChild(mesImages);
      mesImages.src = mesProduits[i].imageUrl;
      mesImages.alt = mesProduits[i].altTxt;

      const mesTitres = document.createElement("h3");
      mesArticles.appendChild(mesTitres);
      mesTitres.innerHTML = mesProduits[i].name;

      const mesDescriptions = document.createElement("p");
      mesArticles.appendChild(mesDescriptions);
      mesDescriptions.innerHTML = mesProduits[i].description;
    }
  });
}
