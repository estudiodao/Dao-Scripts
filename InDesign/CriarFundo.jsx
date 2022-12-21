// Cria um retangulo preenchendo todo fundo da pagina
// incluindo sangria e margem

var doc = app.activeDocument;

main();
function main(){

  var myOldXUnits = doc.viewPreferences.horizontalMeasurementUnits;
  var myOldYUnits = doc.viewPreferences.verticalMeasurementUnits;
  //Set the measurement units to points.
  doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
  doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;

  criarRetangulo();

  //Reset the transform content and measurement units to their original values.
  doc.viewPreferences.horizontalMeasurementUnits = myOldXUnits;
  doc.viewPreferences.verticalMeasurementUnits = myOldYUnits;
}



function criarRetangulo(){

  var sangria_esq = doc.documentPreferences.documentBleedInsideOrLeftOffset;
  var sangria_dir = doc.documentPreferences.documentBleedOutsideOrRightOffset;
  var sangria_topo = doc.documentPreferences.documentBleedTopOffset;
  var sangria_base = doc.documentPreferences.documentBleedBottomOffset;

	for(i = 0; i < doc.pages.length; i ++){
    pagina = doc.pages.item(i);

    pagina_margem_esq = pagina.marginPreferences.left;
    pagina_margem_dir = pagina.marginPreferences.right;
    pagina_margem_topo = pagina.marginPreferences.top;
    pagina_margem_base = pagina.marginPreferences.bottom;

    var frameY1 = pagina.pageItems[0].geometricBounds[0] - sangria_topo - pagina_margem_topo;
    var frameX1 = pagina.pageItems[0].geometricBounds[1] - sangria_esq - pagina_margem_esq;
    var frameY2 = pagina.pageItems[0].geometricBounds[2] + sangria_base + pagina_margem_base;
    var frameX2 = pagina.pageItems[0].geometricBounds[3] + sangria_dir + pagina_margem_esq;

    retangulo = pagina.rectangles.add({geometricBounds:[frameY1, frameX1, frameY2, frameX2]});
    
	}
}


