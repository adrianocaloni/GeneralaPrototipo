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
var nombreJugador1 = 'Jugador 1';
var nombreJugador2 = 'Jugador 2';
var nombreJugador3 = 'Jugador 3';
var nombreJugador4 = 'Jugador 4';
var ganador = '';
var puntajeJ1 = 0;
var puntajeJ2 = 0;
var puntajeJ3 = 0;
var puntajeJ4 = 0;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    $$('#jugador1').val(nombreJugador1);
    $$('#jugador2').val(nombreJugador2);
    $$('#jugador3').val(nombreJugador3);
    $$('#jugador4').val(nombreJugador4);
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {

    //nombreJugador1 = '';
    //nombreJugador2 = '';
    //nombreJugador3 = '';
    //nombreJugador4 = '';

    //fnMostrarMasJugadores(); (Para revisar, no borrar)

    $$('#iniciar').on('click', function(){
      nombreJugador1 = $$('#jugador1').val();
      nombreJugador2 = $$('#jugador2').val();
      nombreJugador3 = $$('#jugador3').val();
      nombreJugador4 = $$('#jugador4').val();
      ganador = '';
      puntajeJ1 = 0;
      puntajeJ2 = 0;
      puntajeJ3 = 0;
      puntajeJ4 = 0;

      if ($$('#cantJugadores').val() == 2 && nombreJugador1 != '' && nombreJugador2 != '') {
        app.views.main.router.navigate("/anotador/");
      }
      if ($$('#cantJugadores').val() == 3 && nombreJugador1 != '' && nombreJugador2 != '' && nombreJugador3 != '') {
        app.views.main.router.navigate("/anotador/");
      }
      if ($$('#cantJugadores').val() == 4 && nombreJugador1 != '' && nombreJugador2 != '' && nombreJugador3 != '' && nombreJugador4 != '') {
        app.views.main.router.navigate("/anotador/");
      }

    })

    $$('#finProvisorio').on('click', function(){
      app.views.main.router.navigate("/fin/");
    })
})

$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    console.log(e);
    $$('#jug1').val(nombreJugador1);
    $$('#jug2').val(nombreJugador2);
    $$('#jug3').val(nombreJugador3);
    $$('#jug4').val(nombreJugador4);

    /*      VARIABLES     */
    var idSoloNro = '';
    var id = '';

    /*      EVENTOS     */

    /* 1A */
    $$('.btnIngresaValor').on('click', function(){
      id = $$(this).attr('id');
      idSoloNro = id.replace (/(j1-|j2-|j3-|j4-)/g, '');
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

    /* (Para revisar!)
    function fnMostrarMasJugadores() {
      if ($$('#cantJugadores').val() == 3) {
        $$('#inputNombre3').removeClass('hidden').addClass('visible');
        $$('#colPuntosJ3').removeClass('hidden').addClass('visible');
        $$('#puntuacionFinal3').removeClass('hidden').addClass('visible');
      }
      if ($$('#cantJugadores').val() == 4) {
        $$('#inputNombre3').removeClass('hidden').addClass('visible');
        $$('#inputNombre4').removeClass('hidden').addClass('visible');
        $$('#colPuntosJ3').removeClass('hidden').addClass('visible');
        $$('#colPuntosJ4').removeClass('hidden').addClass('visible');
        $$('#puntuacionFinal3').removeClass('hidden').addClass('visible');
        $$('#puntuacionFinal4').removeClass('hidden').addClass('visible');
      }
    }*/


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
          } else if (valor == 'Borrar') {
            nro = '';
          }
          break;

        case 8:
          if (valor == 'Servida') {
            nro = 35;
          } else if (valor == 'No servida') {
            nro = 30;
          } else if (valor == 'Tachar') {
            nro = '---';
          } else if (valor == 'Borrar') {
            nro = '';
          }
          break;

        case 9:
          if (valor == 'Servida') {
            nro = 45;
          } else if (valor == 'No servida') {
            nro = 40;
          } else if (valor == 'Tachar') {
            nro = '---';
          } else if (valor == 'Borrar') {
            nro = '';
          }
          break;

        case 10:
          if (valor == 'Servida') {
            nro = 55;
          } else if (valor == 'No servida') {
            nro = 50;
          } else if (valor == 'Tachar') {
            nro = '---';
          } else if (valor == 'Borrar') {
            nro = '';
          }
          break;

        case 11:
          if (valor == 'Servida') {
            nro = 105;
          } else if (valor == 'No servida') {
            nro = 100;
          } else if (valor == 'Tachar') {
            nro = '---';
          } else if (valor == 'Borrar') {
            nro = '';
          }
          break;

        default:
          if (valor == 'Tachar') {
            nro = '---';
          } else if (valor == 'Borrar') {
            nro = '';
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
        puntajeJ3 = $$('#totalJ3').val();
        puntajeJ4 = $$('#totalJ4').val();
        if (puntajeJ1>puntajeJ2 && puntajeJ1>puntajeJ3 && puntajeJ1>puntajeJ4) {
          ganador = nombreJugador1;
          console.log(ganador);
        }
        if (puntajeJ2>puntajeJ1 && puntajeJ2>puntajeJ3 && puntajeJ2>puntajeJ4) {
          ganador = nombreJugador2;
          console.log(ganador);
        }
        if (puntajeJ3>puntajeJ1 && puntajeJ3>puntajeJ2 && puntajeJ3>puntajeJ4) {
          ganador = nombreJugador3;
          console.log(ganador);
        }
        if (puntajeJ4>puntajeJ1 && puntajeJ4>puntajeJ2 && puntajeJ4>puntajeJ3) {
          ganador = nombreJugador4;
          console.log(ganador);
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
      $$('#totalJ3').val("0");
      $$('#totalJ4').val("0");
      app.popup.close('.my-popup-finalizar', true);
    }

    function fnTerminar(){
      console.log('fnTerminar');
      fnLimpiar();
      app.views.main.router.navigate("/fin/");
    }
})

$$(document).on('page:init', '.page[data-name="fin"]', function (e) {
  $$("#felicitaciones").html("????Felicitaciones" + " "+ ganador + " has ganado!!");
  $$("#puntuacionFinal1").html(nombreJugador1 +": " + puntajeJ1);
  $$("#puntuacionFinal2").html(nombreJugador2 + ": " + puntajeJ2);
  $$("#puntuacionFinal3").html(nombreJugador2 + ": " + puntajeJ3);
  $$("#puntuacionFinal4").html(nombreJugador2 + ": " + puntajeJ4);

  $$('#opCancelar').on('click', function(){
    app.views.main.router.navigate("/index/");
  })
})
