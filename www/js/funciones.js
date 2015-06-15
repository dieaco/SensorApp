$(document).ready(function() {
    $('#btnLogout').click(function() {
        /* Act on the event */
        var idUsuarioLocal = localStorage.getItem("idUsuarioLocal");
        var regIdLocal = localStorage.getItem("regIdLocal");                   
        

        var paramametros = {
            "idUsuario" : idUsuarioLocal,
            "regId" : regIdLocal
        };

        $.ajax({
           type: "POST",
           url: "http://sensorsafe.com.mx/phonegap/eliminarRegId.php",
           data: paramametros,
           
           success: function(data){
                localStorage.removeItem("usernameLocal");
                localStorage.removeItem("passwordLocal");
                localStorage.removeItem("regIdLocal");
                localStorage.removeItem("idUsuarioLocal");
                localStorage.removeItem("cbGuardarStatus");

                  location.href = "login.html"; 

                alert("Sesión finalizada: "+ data); 
           },
           error: function()
           {
                alert("Error en respuesta ajax");              
           }
        }); //Termina envio por ajax    
    }); 
});