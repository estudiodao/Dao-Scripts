// Redimendisiona a altura da pagina de acordo com o único quadro de texto na página


var doc = app.activeDocument;


main();
function main(){


  var myOldXUnits = doc.viewPreferences.horizontalMeasurementUnits;
  var myOldYUnits = doc.viewPreferences.verticalMeasurementUnits;
  //Set the measurement units to points.
  doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
  doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;

  ajustarFrames();

  //Reset the transform content and measurement units to their original values.
  doc.viewPreferences.horizontalMeasurementUnits = myOldXUnits;
  doc.viewPreferences.verticalMeasurementUnits = myOldYUnits;
}



function ajustarFrames(){
	for(i = 0; i < doc.pages.length; i ++){
    pagina = doc.pages.item(i);
    pagina_margem_esquerda = pagina.marginPreferences.left;
    pagina_margem_topo = pagina.marginPreferences.top;
    pagina_margem_horizontal = pagina.marginPreferences.left + pagina.marginPreferences.right;
    pagina_margem_vertical = pagina.marginPreferences.top + pagina.marginPreferences.bottom;

    quadro = pagina.pageItems[0];
    
    quadro.fit(FitOptions.FRAME_TO_CONTENT);

    var frameY1 = pagina.pageItems[0].geometricBounds[0];
    var frameX1 = pagina.pageItems[0].geometricBounds[1];
    var frameY2 = pagina.pageItems[0].geometricBounds[2];
    var frameX2 = pagina.pageItems[0].geometricBounds[3];
    // var paginaLargura = doc.documentPreferences.pageWidth;
    var paginaLargura = Math.abs(frameX1 - frameX2) + pagina_margem_horizontal;
    var paginaNovaAltura = Math.abs(frameY1 - frameY2) + pagina_margem_vertical;

    pagina.resize(CoordinateSpaces.INNER_COORDINATES,
      AnchorPoint.CENTER_ANCHOR,
      ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
      [paginaLargura, paginaNovaAltura]);
    
    // doc.align(quadro, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.PAGE_BOUNDS);
    quadro.move([pagina_margem_esquerda, pagina_margem_topo])
	}
}


