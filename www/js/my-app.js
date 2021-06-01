// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        name: 'index',
        path: '/index/',
        url: 'index.html',
      },
       {
        name: 'anotador',
        path: '/anotador/',
        url: 'anotador.html',
      },
      {
        name: 'fin',
        path: '/fin/',
        url: 'fin.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

/*      VARIABLES GLOBALES      */
var nombreJugador1 = '';
var nombreJugador2 = '';
var ganador = '';
var puntajeJ1 = 0;
var puntajeJ2 = 0;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    $$('#jugador1').val('');
    $$('#jugador2').val('');
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    nombreJugador1 = '';
    nombreJugador2 = '';

    $$('#iniciar').on('click', function(){
      nombreJugador1 = $$('#jugador1').val();
      nombreJugador2 = $$('#jugador2').val();
      app.views.main.router.navigate("/anotador/");
    })

    $$('#finProvisorio').on('click', function(){
      app.views.main.router.navigate("/fin/");
    })
})

$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    console.log(e);
    $$('#jug1').val(nombreJugador1);
    $$('#jug2').val(nombreJugador2);

    /*      VARIABLES     */
    var idSoloNro = '';
    var id = '';

    /*      EVENTOS     */
    
    /* 1A */
    $$('.btnIngresaValor').on('click', function(){
      id = $$(this).attr('id');
      idSoloNro = id.replace (/(j1-|j2-)/g, '');
      idSoloNro = parseInt(idSoloNro);
      if (idSoloNro>0 && idSoloNro<7) {
        console.log(idSoloNro);
        fnMuestraMultiplos();
      }
    })

    /* 2A */
    $$('.eligeAnotacion').on('click', function(){ 
      var valorElegido = $$(this).val();
      console.log(valorElegido);

      fnGuardaValor(valorElegido);  
    })

    $$('.btnFinaliza').on('click', function(){
      var opcion = $$(this).val();
        console.log('opcion'+opcion);
      if (opcion == 'Limpiar') {
        fnLimpiar();
      } 
      if (opcion == 'Terminar') {
        fnTerminar();
      }
    })

    $$('.cancela').on('click', function(){
      app.popup.close('.my-popup-fig', true);
      app.popup.close('.my-popup-nro', true);
      app.popup.close('.my-popup-finalizar',true);
    })
  
    /*      FUNCIONES     */
    function fnMuestraMultiplos() {
      $$('#op1Dado').val(idSoloNro*1);
      $$('#op2Dado').val(idSoloNro*2);
      $$('#op3Dado').val(idSoloNro*3);
      $$('#op4Dado').val(idSoloNro*4);
      $$('#op5Dado').val(idSoloNro*5);
    }

    function fnGuardaValor(valor) {
      var nro = 0;
      switch (idSoloNro) {
        case 7:
          if (valor == 'Servida') {
            nro = 25;
          } else if (valor == 'No servida') {
            nro = 20;
          } else if (valor == 'Tachar') {
            nro = '---';
          }
          break;
  
        case 8:
          if (valor == 'Servida') {
            nro = 35;
          } else if (valor == 'No servida') {
            nro = 30;
          } else if (valor == 'Tachar') {
            nro = '---';
          }
          break;
  
        case 9:
          if (valor == 'Servida') {
            nro = 45;
          } else if (valor == 'No servida') {
            nro = 40;
          } else if (valor == 'Tachar') {
            nro = '---';
          }
          break;
  
        case 10:
          if (valor == 'Servida') {
            nro = 55;
          } else if (valor == 'No servida') {
            nro = 50;
          } else if (valor == 'Tachar') {
            nro = '---';
          }
          break;
  
        case 11:
          if (valor == 'Servida') {
            nro = 105;
          } else if (valor == 'No servida') {
            nro = 100;
          } else if (valor == 'Tachar') {
            nro = '---';
          }
          break;
  
        default:
          if (valor == 'Tachar') {
            nro = '---';
          } else {
            nro = valor;
          } 
        }
        $$('#'+id).val(nro);
        app.popup.close('.my-popup-fig', true);
        app.popup.close('.my-popup-nro', true);
        fnSumaTotales();
      }

    function fnSumaTotales() {  
      var puntaje = 0;
      var finDeJuego = true;
      for (var j=1; j<3; j++) {
        puntaje = 0;
        for (var i=1; i<12; i++) {
          if ($$('#j'+j+'-'+i).val() == '---') {} 
          else  if ($$('#j'+j+'-'+i).val() == "") {
            finDeJuego = false;
          }
          else {  
            var p = $$('#j'+j+'-'+i).val();
            puntaje += parseInt(p);
          }
        }
        $$('#totalJ'+j).val(puntaje);  
      } 
      fnControlFinDeJuego(finDeJuego);
    }

    function fnControlFinDeJuego(finDeJuego) {
      if (finDeJuego == false ) {
          console.log('FIN')
        puntajeJ1 = $$('#totalJ1').val();
        puntajeJ2 = $$('#totalJ2').val();
        if (puntajeJ1>puntajeJ2) {
          ganador = nombreJugador1;
          console.log(ganador);
        } else {
          ganador = nombreJugador2;
        }
        app.views.main.router.navigate("/anotador/");
      } else {
        console.log('NO FIN')
      }
    }

    function fnLimpiar() {
        console.log('fnLimpiar');
      for (var j=1; j<3; j++) {
        for (var i=1; i<12; i++) {
          $$('#j'+j+'-'+i).val("");
        }   
      }
      $$('#totalJ1').val("0");
      $$('#totalJ2').val("0"); 
      app.popup.close('.my-popup-finalizar', true);
    }

    function fnTerminar(){
      console.log('fnTerminar');
      fnLimpiar();
      app.views.main.router.navigate("/fin/");
    }
})

$$(document).on('page:init', '.page[data-name="fin"]', function (e) {
  $$("#felicitaciones").html("¡¡Felicitaciones" + " "+ ganador + " has ganado!!");
  $$("#puntuacionFinal1").html(nombreJugador1 +": " + puntajeJ1);
  $$("#puntuacionFinal2").html(nombreJugador2 + ": " + puntajeJ2);
  
  $$('#opCancelar').on('click', function(){
    app.views.main.router.navigate("/index/");
  })
})
