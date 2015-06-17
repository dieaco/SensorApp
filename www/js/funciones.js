$(document).ready(function() {

  $('#btnEditar').click(function() {
    /* Act on the event */
    $(this).data('clicked', true);
  });

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
        //Se verifica si el botón editar fue clickeado
        if($('#btnEditar').data('clicked') == true){alert('pressed');
          //Se asigna nombre de empleado
          $('table tbody tr:nth-child(1) td').html('<input type="text" id="nombreEmpleado" name="nombreEmpleado" value="hola"/>');
          //Se asigna apellidos de empleado
          $('table tbody tr:nth-child(2) td').append(item.apellidosEmpleado);
          //Se asigna RFC de empleado
          $('table tbody tr:nth-child(3) td').append(item.RFC);
          //Se asigna teléfono de empleado
          $('table tbody tr:nth-child(4) td').append(item.telEmpleado);
          //Se asigna email de empleado
          $('table tbody tr:nth-child(5) td').append(item.emailEmpleado);
          //Se asigna Banco de empleado
          $('table tbody tr:nth-child(6) td').append(item.nomBanco);
          //Se asigna # de cuenta de empleado
          $('table tbody tr:nth-child(7) td').append(item.numCta);
          //Se asigna # de seguro social de empleado
          $('table tbody tr:nth-child(8) td').append(item.numSeguro);
          //Se asigna dirección de empleado
          $('table tbody tr:nth-child(9) td').append(item.direccionEmpleado);
          //Se asigna Estado de empleado
          $('table tbody tr:nth-child(10) td').append(item.nombreEdo);
          //Se asigna Municipio de empleado
          $('table tbody tr:nth-child(11) td').append(item.nombreMunicipio);
          //Se asigna Área de empleado
          $('table tbody tr:nth-child(12) td').append(item.nombreArea);

          //Se asigna status de empleado y se le asigna la clase correspondiente segun el status
          var auxStatus = status[item.statusEmpleado];
          $('table tbody tr:nth-child(13) td span').append(item.statusEmpleado).addClass(auxStatus);
        }else{alert('no pressed');
          //Se asigna nombre de empleado
          $('table tbody tr:nth-child(1) td').append(item.nombreEmpleado);
          //Se asigna apellidos de empleado
          $('table tbody tr:nth-child(2) td').append(item.apellidosEmpleado);
          //Se asigna RFC de empleado
          $('table tbody tr:nth-child(3) td').append(item.RFC);
          //Se asigna teléfono de empleado
          $('table tbody tr:nth-child(4) td').append(item.telEmpleado);
          //Se asigna email de empleado
          $('table tbody tr:nth-child(5) td').append(item.emailEmpleado);
          //Se asigna Banco de empleado
          $('table tbody tr:nth-child(6) td').append(item.nomBanco);
          //Se asigna # de cuenta de empleado
          $('table tbody tr:nth-child(7) td').append(item.numCta);
          //Se asigna # de seguro social de empleado
          $('table tbody tr:nth-child(8) td').append(item.numSeguro);
          //Se asigna dirección de empleado
          $('table tbody tr:nth-child(9) td').append(item.direccionEmpleado);
          //Se asigna Estado de empleado
          $('table tbody tr:nth-child(10) td').append(item.nombreEdo);
          //Se asigna Municipio de empleado
          $('table tbody tr:nth-child(11) td').append(item.nombreMunicipio);
          //Se asigna Área de empleado
          $('table tbody tr:nth-child(12) td').append(item.nombreArea);

          //Se asigna status de empleado y se le asigna la clase correspondiente segun el status
          var auxStatus = status[item.statusEmpleado];
          $('table tbody tr:nth-child(13) td span').append(item.statusEmpleado).addClass(auxStatus);
        }

     });
   });

   
});