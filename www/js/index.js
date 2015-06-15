var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        this.cargarImagenes();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    //Situa el logo al centro de la pantalla
    cargarImagenes: function(){

        //Obtiene el alto de la ventana y el ancho del documento para poder centrar adecuadamente nuestra Ventana Modal
            var ventanaAltura = $(document).height(); 
            var ventanaAncho = $(document).width(); 
                   
            //Coloca la Ventana Modal en el centro de nuestra Ventana general
            $('.imagenes').css('top',  ventanaAltura/2-$('.imagenes').height()/2); 
            $('.imagenes').css('left', ventanaAncho/2-$('.imagenes').width()/2);
        
         $(window).resize(function(){                   
            //Obtiene el alto de la ventana y el ancho del documento para poder centrar adecuadamente nuestra Ventana Modal
            var ventanaAltura = $(document).height(); 
            var ventanaAncho = $(document).width(); 
                   
            //Coloca la Ventana Modal en el centro de nuestra Ventana general
            $('.imagenes').css('top',  ventanaAltura/2-$('.imagenes').height()/2); 
            $('.imagenes').css('left', ventanaAncho/2-$('.imagenes').width()/2);
        });
    }
};
