var nav = {
    profile:function(){ 
        window.location = "home.html";
    },
    solved:function(){
        window.location = "finishedServices.html";
    },
    new:function(){
        window.location = "newServices.html";
    },
    logout:function(){
        app.showConfirmLogout();       
    },
    checkRelativeRoot: function(){
        var rutaAbsoluta = self.location.href;
        var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
        var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
        return rutaRelativa;       
    },
    compararRuta:function(){
        switch(nav.checkRelativeRoot()){
            case "home.html":
                $('#profile a').addClass('ui-btn-active');
                localStorage.removeItem('idEdoLocal');
                localStorage.removeItem('idMunicipioLocal');
                localStorage.removeItem('idAreaLocal');
                localStorage.removeItem('idBancoLocal');
                break;
            case "finishedServices.html":
                $('#solved a').addClass('ui-btn-active');
                localStorage.removeItem('idEdoLocal');
                localStorage.removeItem('idMunicipioLocal');
                localStorage.removeItem('idAreaLocal');
                localStorage.removeItem('idBancoLocal');
                break;
            case "newServices.html":
                $('#new a').addClass('ui-btn-active');
                localStorage.removeItem('idEdoLocal');
                localStorage.removeItem('idMunicipioLocal');
                localStorage.removeItem('idAreaLocal');
                localStorage.removeItem('idBancoLocal');
                break;
            case "logout.html":
                $('#logout a').addClass('ui-btn-active');
                localStorage.removeItem('idEdoLocal');
                localStorage.removeItem('idMunicipioLocal');
                localStorage.removeItem('idAreaLocal');
                localStorage.removeItem('idBancoLocal');
                break;
        }
    }, 
    confirmLogout:function(){
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
           },
           error: function()
           {
                alert("Error en respuesta ajax");              
           }
        }); //Termina envio por ajax
    }, 
    loadProfilePicture: function(){
        var idUsuarioLocal = localStorage.getItem("idUsuarioLocal");

        var paramametros = {
            "idEmpleado" : idUsuarioLocal
        };

        $.post('http://sensorsafe.com.mx/phonegap/pictures/getProfilePicture.php', paramametros, function(data, textStatus, xhr) {
            /*optional stuff to do after success */
            $.each(data, function(index, item) {

                var finalPicture = nav.depurarProfilePicture(item.picture);
                 /* iterate through array or object */
                document.getElementById("profilePicture").style.backgroundImage="url('"+finalPicture+"')";
                document.getElementById("profilePicture").style.backgroundSize="100% 100%";

                //document.getElementById("profilePictureHeader").src = item.picture;
                document.getElementById("profilePictureHeader").style.backgroundImage="url('"+finalPicture+"')";
                document.getElementById("profilePictureHeader").style.backgroundSize="100% 100%";
                });
            });
    },
    depurarProfilePicture: function(pictureRoot){

        var flag = 0;
        while(flag == 0) {
            if (pictureRoot.indexOf("?") >= 0) {
                pictureRoot = pictureRoot.replace("?","%3f");
            } else {
                flag = 1;
            }
        }
        return pictureRoot;
        
    }
};