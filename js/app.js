var puntos=0;
var movimientos=0;
var encontre=0;
var minutos=2;
var segundos=0;
var tiempoPuntos=0;
var finalizado=0;
var vaciasXcolumna=[0,0,0,0,0,0,0,0];
//////////////////////////////////////////////
function animacionTitulo(){
  setInterval(function(){
    var color=$(".main-titulo").css("color");
    if(color=="rgb(220, 255, 14)"){
      $(".main-titulo").css("color","white");
    }else{
      $(".main-titulo").css("color","#DCFF0E");
    }},2000);
}
///////////////////////////////////////////////////////////
function cronometro(){
  var tiempo='';
  var vCron=setInterval(function(){
    if(minutos==0 && segundos==0){
      animacionFinal();
      clearInterval(vCron);
    }else{
      if(segundos==0){
        segundos=59;
        minutos--;
      }else{
        segundos--;
      }
      if(segundos>=10){
        tiempo=minutos+":"+segundos;
      }else{
        tiempo=minutos+':'+'0'+segundos;
      }
      $('#timer').text(tiempo);
    }
  },1000);
}
//////////////////////////
function sumaSegundos(){
  if(segundos<60-tiempoPuntos){
    segundos=segundos+tiempoPuntos;
  }else{
    minutos++;
    segundos=segundos+tiempoPuntos-60;
  }
}
//////////////////////////
function animacionFinal(){
  $(".panel-tablero").hide("slow")
      $(".panel-score").animate({
        width: "100%",
      }, "slow")
      finalizado=1;
}
//////////////////////////
function inicializaTablero(){
  vaciasXcolumna=[0,0,0,0,0,0,0,0];
  for(var k=1;k<=7;k++){
     var columna='.columna'+k;
     $(columna).empty();
  }
   //Función que carga una imágen aleatoria
   for(var j=1;j<=7;j++){
     for(var i=1;i<=5;i++){

       $(this).attr("src",function(){
         var numero = Math.floor((Math.random() * 4) + 1);
         var ruta = "image/"+numero+".png";
         return ruta;
       });
       var ruta = $(this).attr("src");
       var columna='.columna'+j;
       identificacion=i+'-'+j;
       $(columna).prepend('<img src='+ruta+' class=dulce'+' id='+identificacion+'>');
     }
   }
   interaccion();
   cronometro();
}
function interaccion(){
  var dulce1
     var dulce2
     var dulceSrc1
     var dulceSrc2
     $("img").draggable({
         revert: "valid",
         containment: ".panel-tablero",
         start: function (event, ui){
           dulce1 = this
           dulceSrc1 = $(this).attr("src")
         }
     })
     $("img").droppable({
       drop: function (event, ui){
         dulce2 = this
         dulceSrc2 = $(this).attr("src")
         $(dulce2).attr("src", dulceSrc1)
         $(dulce1).attr("src", dulceSrc2)
         movimientos ++;
         $("#movimientos-text").html(movimientos)
         tresEnLinea();
       }
     })
}
//////////////////////////////
function busquedaHorizontal(){
  var img=[];
  var posicion=[];
  encontre=0;
  for(var j=1;j<=5;j++){
    for(var i=1;i<=7;i++){ //barrido por columna
        posicion[i]='#'+j+'-'+i;
        img[i]=$(posicion[i]).attr('src');
      }
      for(var i=3;i<=7;i++){
        if(img[i]==img[i-1] && img[i]==img[i-2]){
          encontre=1;
          $(posicion[i]).addClass("identificada");
          $(posicion[i-1]).addClass("identificada");
          $(posicion[i-2]).addClass("identificada");
          puntos=puntos+10;
          sumaSegundos();
        }
      }
    }
  }
///////////////////////////////
function busquedaVertical(){
  var img=[];
  var posicion=[];
  for(var i=1;i<=7;i++){
    for(var j=1;j<=5;j++){ //barrido por columna
        posicion[j]='#'+j+'-'+i;
        img[j]=$(posicion[j]).attr('src');
      }
      for(var j=3;j<=5;j++){
        if(img[j]==img[j-1] && img[j]==img[j-2]){
          encontre=1;
          $(posicion[j]).addClass("identificada");
          $(posicion[j-1]).addClass("identificada");
          $(posicion[j-2]).addClass("identificada");
          puntos=puntos+10;
          sumaSegundos();
        }
      }
    }
}
///////////////////////////////////
function animacionParpadeo(){
  var contador=0;
    var myVar = setInterval(function(){         //revisar intervalo y cambiarlo por settimeout
      var estado=$(".identificada").css("opacity");
      if(estado==1){
        $(".identificada").css("opacity","0.2");
        contador++;
      }else{
        $(".identificada").css("opacity","1");
    }
    if(contador==5){
      clearInterval(myVar);
    }
  },100)
}
/////////////////////////////
function remueve(){
  var ids=[];
  var str=[];
  var fila=0;
  var columna=0;
  var posicion='';
    $(".identificada").each(function(i){
    ids[i]=$(this).attr("id");
  });
  for(var i=0;i<=ids.length-1;i++){
    str=ids[i];
    var res = str.split("-");
    fila=parseInt(res[0]);
    columna=parseInt(res[1]);
    for (var j=fila+1;j<=5;j++){
        posicion="#"+j+'-'+columna;
        var comparador=$(posicion).attr("class");
        if(comparador!="identificada"){
          var nuevoId=j-1+'-'+columna;
          $(posicion).attr("id",nuevoId);
        }
    }
    vaciasXcolumna[columna]++;
  }
  $(".identificada").remove();

}
//////////////////////////////////////////////
function rellena(){
  for(var j=1;j<=vaciasXcolumna.length;j++){
    if(vaciasXcolumna[j]!=0){
      for(var i=6-vaciasXcolumna[j];i<=5;i++){
        $(this).attr("src",function(){
          var numero = Math.floor((Math.random() * 4) + 1);
          var ruta = "image/"+numero+".png";
          return ruta;
        });
        var ruta = $(this).attr("src");
        var columna='.columna'+j;
        identificacion=i+'-'+j;
        $(columna).prepend('<img src='+ruta+' class=dulce'+' id='+identificacion+'>');
      }
    }
  }
  vaciasXcolumna=[0,0,0,0,0,0,0,0]; ////al final de la funcion OJO
  interaccion()
}
/////////////////////

/////////////// Busca 3 en linea//////////////////////////////
function tresEnLinea(){
  var detener=setInterval(function(){   ///revisar si un time out dentro de un set interval hace conficto
    busquedaHorizontal();
    busquedaVertical();
    $('#score-text').text(puntos);

    if(encontre==1){
      animacionParpadeo();   //No colocar Set time... adentro ya tiene set interval
      setTimeout(remueve,1000);
      setTimeout(rellena,1000);
    }else{
      clearInterval(detener);
    }
  },2000)
}

////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
$( document ).ready(function() {

  ///////////////Cambio de color titulo///////////////////////////
  animacionTitulo();
    ///////////Inicializa el tablero/////////////////////////

   $(document).on("click", ".buttons", function(){
     //limpia el tablero de dulces
     puntos=0;
     minutos=2;
     segundos=0;
     movimientos=0;
     $(".btn-reinicio").html('Reintentar');

     for(var i=0; i<100; i++){
       window.clearTimeout(i);
     }
     if(finalizado==1){
       $(".panel-tablero").show("slow")
           $(".panel-score").animate({
             width: "25%",
           }, "slow")
           finalizado=0;
     }
     animacionTitulo();
     inicializaTablero();
     tresEnLinea();
    });


////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
});
