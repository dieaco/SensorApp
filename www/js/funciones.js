$(document).ready(function() {

  $('td span.ui-btn-text').css('font-size', '1em');

  $('div.ui-input-text').css('display', 'none');
  $('input').css('display', 'none');
  $('.ui-select').css('display', 'none');
  //Se obtiene id de usuario local para hacer la petición
  var idUsuarioLocal = localStorage.getItem('idUsuarioLocal');
  //Se crea objeto con los parametros que se enviaran en la petición
  var parametros = {
    "user" : 2
  };
  //Se crea array asociativo para poder definir el estilo del span dependiento el status del empleado
  var status = new Array();
  status['Activo'] = 'btnAct';
  status['Inactivo'] = 'btnIna';
  //Se obtiene detalles del empleado por medio de JSON
  $.post('http://sensorsafe.com.mx/phonegap/getUserDetails.php', parametros, function(data, textStatus, xhr) {
     //Se recorre el Objeto para extraer cada elemento que viene dentro de este
     $.each(data, function(index, item) {

        //Se almacenan variables para su uso posterior en la carga de los Combos
        localStorage.setItem('idEdoLocal', item.idEdo);
        localStorage.setItem('idMunicipioLocal', item.idMunicipio);
        localStorage.setItem('idAreaLocal', item.idArea);
        localStorage.setItem('idBancoLocal', item.idBanco);

        //Se asigna nombre de empleado
        $('table tbody tr:nth-child(1) td p').append(item.nombreEmpleado);
        //Se asigna apellidos de empleado
        $('table tbody tr:nth-child(2) td p').append(item.apellidosEmpleado);
        //Se asigna RFC de empleado
        $('table tbody tr:nth-child(3) td p').append(item.RFC);
        //Se asigna teléfono de empleado
        $('table tbody tr:nth-child(4) td p').append(item.telEmpleado);
        //Se asigna email de empleado
        $('table tbody tr:nth-child(5) td p').append(item.emailEmpleado);
        //Se asigna Banco de empleado
        $('table tbody tr:nth-child(6) td p').append(item.nomBanco);
        //Se asigna # de cuenta de empleado
        $('table tbody tr:nth-child(7) td p').append(item.numCta);
        //Se asigna # de seguro social de empleado
        $('table tbody tr:nth-child(8) td p').append(item.numSeguro);
        //Se asigna dirección de empleado
        $('table tbody tr:nth-child(9) td p').append(item.direccionEmpleado);
        //Se asigna Estado de empleado
        $('table tbody tr:nth-child(10) td p').append(item.nombreEdo);
        //Se asigna Municipio de empleado
        $('table tbody tr:nth-child(11) td p').append(item.nombreMunicipio);
        //Se asigna Área de empleado
        $('table tbody tr:nth-child(12) td p').append(item.nombreArea);

        //Se asigna status de empleado y se le asigna la clase correspondiente segun el status
        var auxStatus = status[item.statusEmpleado];
        //$('table tbody tr:nth-child(13) td span').addClass(auxStatus);
        //$('table tbody tr:nth-child(13) td span').append(item.statusEmpleado);
        $('table tbody tr:nth-child(13) td').prepend('<span class="'+ auxStatus +'">'+ item.statusEmpleado +'</span>');
     });
   });

  $('#btnEditar').click(function(event) {
    /* Act on the event */
    event.preventDefault();         
    //Ocultar botón Editar
    $('#btnEditar').fadeOut(500); 
    //Inicia obtención de datos a actualizar
    $.post('http://sensorsafe.com.mx/phonegap/getUserDetails.php', parametros, function(data, textStatus, xhr) {
      /*optional stuff to do after success */
      $.each(data, function(index, item) {  
        //Muestra elementos expcíficos de jqueryMobile
        $('div.ui-input-text').fadeIn(500);
        $('input').fadeIn(500);
        $('.ui-select').fadeIn(500);
        //Muestra botón para cancelar actualización de registros
        $('#btnGuardar').fadeIn(500);
        $('#btnCancelar').fadeIn(500);

        //Oculta filas correspondientes a Status y Area de Empleado debido a que el usuario no podrá cambiar esos datos, solo visualizarlos
        $('.no-visible').fadeOut(500);

        //Se asigna nombre de empleado
        $('table tbody tr:nth-child(1) td p').hide();
        $('#nombreEmpleado').val(item.nombreEmpleado);
        //Se asigna apellidos de empleado
        $('table tbody tr:nth-child(2) td p').hide();
        $('#apellidosEmpleado').val(item.apellidosEmpleado);
        //Se asigna RFC de empleado
        $('table tbody tr:nth-child(3) td p').hide();
        $('#rfcEmpleado').val(item.RFC);
        //Se asigna teléfono de empleado
        $('table tbody tr:nth-child(4) td p').hide();
        $('#telEmpleado').val(item.telEmpleado);
        //Se asigna email de empleado
        $('table tbody tr:nth-child(5) td p').hide();
        $('#emailEmpleado').val(item.emailEmpleado);
        //Se asigna Banco de empleado
        $('table tbody tr:nth-child(6) td p').hide();
        //$('#nomBanco').val(item.nomBanco);
        //Se asigna # de cuenta de empleado
        $('table tbody tr:nth-child(7) td p').hide();
        $('#numCta').val(item.numCta);
        //Se asigna # de seguro social de empleado
        $('table tbody tr:nth-child(8) td p').hide();
        $('#numSeguro').val(item.numSeguro);
        //Se asigna dirección de empleado
        $('table tbody tr:nth-child(9) td p').hide();
        $('#direccionEmpleado').val(item.direccionEmpleado)
        //Se asigna Estado de empleado
        $('table tbody tr:nth-child(10) td p').hide();
        //$('#estado').val(item.nombreEdo);
        //Se asigna Municipio de empleado
        $('table tbody tr:nth-child(11) td p').hide();
        //$('#municipio').val(item.nombreMunicipio);
        //Se asigna Área de empleado
        $('table tbody tr:nth-child(12) td p').hide();
        //$('#area').val(item.nombreArea);
        //Se asigna status de empleado y se le asigna la clase correspondiente segun el status
        var auxStatus = status[item.statusEmpleado];
        //$('table tbody tr:nth-child(13) td span').removeClass(auxStatus);
        $('table tbody tr:nth-child(13) td span:first').hide();
        $('#status').val(item.statusEmpleado);
        $('#tdStatus span.ui-btn-text span').text($('#status option:selected').text());
      });
    });

      //==========================================================//
      //Carga de todos los SELECT; banco, estado, municipio y área//
      //==========================================================//

      var idEdoActual = localStorage.getItem('idEdoLocal'); 
      var idMunicipioActual = localStorage.getItem('idMunicipioLocal');
      var idAreaActual = localStorage.getItem('idAreaLocal');
      var idBancoActual = localStorage.getItem('idBancoLocal');

      //Carga de combo select de Bancos
      $.post('http://sensorsafe.com.mx/phonegap/fillBanks.php', function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        var text = '';
        $.each(data, function(index, item) {

          text += '<option value="'+ item.idBanco +'">'+ item.nomBanco +'</option>';
        });

        $('#banco').html(text);
        if(localStorage.getItem('idBancoLocal')){
          $('#banco').val(idBancoActual);
        }
        $('#tdBanco span.ui-btn-text span').text($('#banco option:selected').text());
      });

      //Carga de combo select de Estados//
      $.post('http://sensorsafe.com.mx/phonegap/fillStates.php', function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        var text = '';
        $.each(data, function(index, item) {

          text += '<option value="'+ item.idEdo +'">'+ item.nombreEdo +'</option>';      
        });    

        $('#estado').html(text);
        if(localStorage.getItem('idEdoLocal')){
          $('#estado').val(idEdoActual);          
        }
        $('#tdEstado span.ui-btn-text span').text($('#estado option:selected').text());
      });

      //Carga de combo select de Municipios dependiendo el estado almacenado
      if(localStorage.getItem('idEdoLocal')){
        var parametroMunicipio = {
          "nombreEdo" : idEdoActual
        };
      }else{
        var parametroMunicipio = {
          "nombreEdo" : 1
        };
      }
      
      $.post('http://sensorsafe.com.mx/phonegap/fillCities.php', parametroMunicipio, function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        var text = '';
        $.each(data, function(index, item) {
          text += '<option value="'+ item.idMunicipio +'">'+ item.nombreMunicipio +'</option>';
        });

        $('#municipio').html(text);
        if(localStorage.getItem('idMunicipioLocal'))
        {
          $('#municipio').val(idMunicipioActual);
        }        
        $('#tdMunicipio span.ui-btn-text span').text($('#municipio option:selected').text());
      });

      //Carga de combo select de Areas
      $.post('http://sensorsafe.com.mx/phonegap/fillAreas.php', function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        var text = '';
        $.each(data, function(index, item) {

          text += '<option value="'+ item.idArea +'">'+ item.nombreArea +'</option>';
        });

        $('#area').html(text);
        if(localStorage.getItem('idAreaLocal')){
          $('#area').val(idAreaActual);          
        }
        $('#tdArea span.ui-btn-text span').text($('#area option:selected').text());
      });

  });

  $('#btnCancelar').click(function(event) {
    /* Act on the event */

        //Muestra elementos expcíficos de jqueryMobile
        $('div.ui-input-text').fadeOut(500);
        $('input').fadeOut(500);
        $('.ui-select').fadeOut(500);
        //Muestra botón para cancelar actualización de registros
        $('#btnGuardar').fadeOut(500);
        $('#btnCancelar').fadeOut(500);

        //Oculta filas correspondientes a Status y Area de Empleado debido a que el usuario no podrá cambiar esos datos, solo visualizarlos
        $('.no-visible').fadeIn(500);

        //Se asigna nombre de empleado
        $('table tbody tr:nth-child(1) td p').fadeIn(500);
        //Se asigna apellidos de empleado
        $('table tbody tr:nth-child(2) td p').fadeIn(500);
        //Se asigna RFC de empleado
        $('table tbody tr:nth-child(3) td p').fadeIn(500);
        //Se asigna teléfono de empleado
        $('table tbody tr:nth-child(4) td p').fadeIn(500);
        //Se asigna email de empleado
        $('table tbody tr:nth-child(5) td p').fadeIn(500);
        //Se asigna Banco de empleado
        $('table tbody tr:nth-child(6) td p').fadeIn(500);
        //$('#nomBanco').val(item.nomBanco);
        //Se asigna # de cuenta de empleado
        $('table tbody tr:nth-child(7) td p').fadeIn(500);
        //Se asigna # de seguro social de empleado
        $('table tbody tr:nth-child(8) td p').fadeIn(500);
        //Se asigna dirección de empleado
        $('table tbody tr:nth-child(9) td p').fadeIn(500);
        //Se asigna Estado de empleado
        $('table tbody tr:nth-child(10) td p').fadeIn(500);
        //$('#estado').val(item.nombreEdo);
        //Se asigna Municipio de empleado
        $('table tbody tr:nth-child(11) td p').fadeIn(500);
        //$('#municipio').val(item.nombreMunicipio);
        //Se asigna Área de empleado
        $('table tbody tr:nth-child(12) td p').fadeIn(500);
        //$('#area').val(item.nombreArea);
        //Se asigna status de empleado y se le asigna la clase correspondiente segun el status
        //$('table tbody tr:nth-child(13) td span').removeClass(auxStatus);
        $('table tbody tr:nth-child(13) td span:first').fadeIn(500);

        //Mostrar botón Editar nuevamente
        $('#btnEditar').fadeIn(500);

  });

  //Función para cambiar vocales con acentos por sus equivalentes sin acentos para evitar problemas en consultas JSON
  /*function removeAccentedVowel(word){    
    var wordWithNoAccent = '';
    if(word.indexOf('á') > 0){
      wordWithNoAccent = word.replace('á','a');
    }else if(word.indexOf('é') > 0){
      wordWithNoAccent = word.replace('é','e');
    }else if(word.indexOf('í') > 0){
      wordWithNoAccent = word.replace('í','i');
    }else if(word.indexOf('ó') > 0){
      wordWithNoAccent = word.replace('ó','o');
    }else if(word.indexOf('ú') > 0){
      wordWithNoAccent = word.replace('ú','u');
    }else{
      wordWithNoAccent = word;
    }
    return wordWithNoAccent;
  }*/  

  //Carga combo de Municpios cuando se selecciona un estado diferente
  $("#estado").change(function () {
    $("#estado option:selected").each(function () {
        idEdo = $(this).val();
        $.post("http://sensorsafe.com.mx/phonegap/fillCities.php", { "nombreEdo": idEdo }, function(data){
            var text = '';
            $.each(data, function(index, item) {

                text += '<option value="'+ item.idMunicipio +'">'+ item.nombreMunicipio +'</option>';
            });

            $('#municipio').html(text);
            //$('#municipio').val(idMunicipioActual);
            $('#tdMunicipio span.ui-btn-text span').text($('#municipio option:selected').text());
        });            
    });
  }) 




   
});