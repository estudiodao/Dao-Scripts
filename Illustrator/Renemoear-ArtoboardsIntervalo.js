if (app.documents.length == 0) {  
    alert("No Open / Active Document Found");  
} else {  

  var document_active = app.activeDocument;

  var w = new Window("dialog");
  // w.orientation="column";
  w.alignChildren = "left";
    var interval_group = w.add("group");
      interval_group.add("statictext", undefined, "Intervalo de artboards separado por - e sem espaços:");
      var user_artboards_interval = interval_group.add ("edittext", undefined, "3-5");
      user_artboards_interval.characters = 20;

    var basename_group = w.add("group");
      basename_group.add("statictext", undefined, "Nome base");
      var user_basename = basename_group.add ("edittext", undefined, "Nome do Artboard");
      user_basename.characters = 20;

    var separator_group = w.add("group");
      separator_group.add("statictext", undefined, "Separador");
      var user_separator = separator_group.add ("edittext", undefined, "-");
      user_separator.characters = 5;

    var start_group = w.add("group");
      start_group.add("statictext", undefined, "Contagem incia em:");
      var user_start_counter = start_group.add ("edittext", undefined, "1");
      user_start_counter.characters = 5;

    var radio_group = w.add("group");
      radio_group.alignChildren = "left";
      var radio_start = radio_group.add("radiobutton", undefined, "No início");
      var radio_end = radio_group.add("radiobutton", undefined, "No fim");
      radio_end.value = true;
    
    var button_group = w.add("group");
      button_group.add("button", undefined, "OK");
      button_group.add ("button", undefined, "Cancel");
  w.show();
  var artboards_list = user_artboards_interval.text.split("-");

  // var user_artboards_interval = prompt( "Intervalo de artboards separado por - e sem espaços:" + "\n", "3-5" );
  // var user_basename = prompt( "Nome base. O nome base não inclui separador." + "\n", "Nome do Artboard" );
  // var user_start_counter = prompt( "Contagem incia em", "1" );
  
  var counter = user_start_counter.text;
  for(var i = artboards_list[0]-1; i < artboards_list[1]; i++ ) {
    
    var name_counter = counter
    if (counter < 10) {
      name_counter = "0" + counter; 
    }
    if (radio_end.value ) {
      var artboard_name = user_basename.text + user_separator.text + name_counter; 
      document_active.artboards[i].name = artboard_name;
    }

    if (radio_start.value) {
      var artboard_name = name_counter + user_separator.text + user_basename.text; 
      document_active.artboards[i].name = artboard_name;
    }
    
    counter++;  
  }

	alert("Renomear artboards finalizado!");
  
}  

