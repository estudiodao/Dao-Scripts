// Para rodar no browser e obter a url das imagens originais

images = document.querySelectorAll("article img");

function extrair_url(lista, qtd = lista.length) {
  for(let i = 0; i < qtd; i++) {
    console.log(lista[i].src);
  }
}

extrair_url(images);

