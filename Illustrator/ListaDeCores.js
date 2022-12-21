// Script baseado na postagem de Silly-V:
// https://community.adobe.com/t5/illustrator-discussions/adobe-illustrator-cc-script-to-export-ase-swatches-to-excel/td-p/8889753
//
// O script irá ler todas as cores que estão na amostra do documento, 
// então é recomendável:
//  - Deletar todas as cores não utilizadas.
//  - Nomear as cores para fácil identificação.
//
// Para leitura das cores em RGB e CMYK é necessário que a amostra 
// não esteja como "Global"
 

function gerar_lista() {
  var doc = app.activeDocument, amostra, cor_espaco, texto = [];

  alert()
  
  if (doc.documentColorSpace == DocumentColorSpace.CMYK) {
    cor_espaco = "CMYK"
    texto.push(cor_espaco)
  } else {
    cor_espaco = "RGB"
    texto.push(cor_espaco)
  }
  texto.push("");

  for (var i = 0; i < doc.swatches.length; i++) {
    amostra = doc.swatches[i];

    if (amostra.name == "[None]" || amostra.name == "[Registration]" || (amostra.color.typename != "CMYKColor" && amostra.color.typename != "RGBColor")) {
      continue;
    }

    texto.push(amostra.name);
    
    if (doc.documentColorSpace == DocumentColorSpace.CMYK) {

      var C = Math.floor(amostra.color.cyan);
      var M = Math.floor(amostra.color.magenta);
      var Y = Math.floor(amostra.color.yellow);
      var K = Math.floor(amostra.color.black);

      var CMYK_valor = C + ", " + M + ", " + Y + ", " + K;

      texto.push(CMYK_valor);
      texto.push("");

    } else {

      var R = amostra.color.red;
      var G = amostra.color.green;
      var B = amostra.color.blue;

      var RGB_valor = R + ", " + G + ", " + B;
      var RGB_Hex = R.toString(16) + G.toString(16) + B.toString(16);
      texto.push(RGB_valor);
      texto.push(RGB_Hex);
      texto.push("");

    }

  }
  
  //Define path and file name
  var caminho = "~/Desktop/";
  var arquivo_nome = "Cores-" + cor_espaco + ".txt";

  //Create File object
  var file = new File(caminho + arquivo_nome);

  file.encoding = 'UTF-8';
  file.open('w');
  for(i = 0; i < texto.length; i++) {
    file.write(texto[i] + "\n");
  }
  file.close();
}

gerar_lista();
