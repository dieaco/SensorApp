$(function(){
    //Pulsación de tecla enter
    //
    $(document).keypress(function(e) {
        if (e.which == 13) {
            if (usernameFocus==1) {
                $('#txtPassword').focus();
                $('#txtPassword').trigger('click');
                cordova.plugins.Keyboard.show();
            }
            else if (passwordFocus==1) {
                $('#btnLogin').focus();
                $('#btnLogin').trigger('click');
            }
        }
    });

    //Comprueba si hay variables locales definidas
    //
    if (window.localStorage.getItem('cbGuardarStatus')) {
        //Si el status es verdadero se redirecciona a home.html
        window.setTimeout(function(){ window.location ="home.html";},1750);
    }else if(window.localStorage.removeItem("usernameLocal") && window.localStorage.removeItem("passwordLocal") &&
                window.localStorage.removeItem("regIdLocal") && window.localStorage.removeItem("idUsuarioLocal")){
        //Si el status es false se borran las variables locales que posiblemente pueden existir para evitar duplicidad
        localStorage.removeItem("usernameLocal");
        localStorage.removeItem("passwordLocal");
        localStorage.removeItem("regIdLocal");
        localStorage.removeItem("idUsuarioLocal");
    }

    //Proceso de logueo remoto
    //
    $("#btnLogin").click(function(){        
        if (document.getElementById('txtRegId').value != "") {
            if (document.getElementById('txtUsuario').value != "" && document.getElementById('txtPassword').value != "") {
                //Extrae Id del usuario
                //
                $.getJSON("http://sensorsafe.com.mx/phonegap/regId.php?user=" + document.getElementById('txtUsuario').value,function(datos) {
                    //variables extraidas del formulario
                    var username = document.getElementById('txtUsuario').value;
                    var password = md5(document.getElementById('txtPassword').value);
                    var regId = document.getElementById('txtRegId').value;

                    var cbGuardarStatus = false;

                    if(document.getElementById("cbGuardar").checked){
                        cbGuardarStatus = true;
                    }else{
                        cbGuardarStatus = false;
                    }

                    //variables extraidas del servidor
                    var idRemoto = 0;
                    var userNameRemoto;
                    var passwordRemoto;
                    //variables otras
                    var url = "http://sensorsafe.com.mx/phonegap/registro.php"; // El script a dónde se realizará la petición para registrar regID.
                    var acceso = false;
                    //Inicia recorrido del JSON
                    //
                    $.each(datos, function(i, item) {
                        if (item.emailEmpleado == username) {
                            //Si encontró algun usuario, los carga en las variables
                            //para ser enviadas al servidor posteriormente
                            //
                            document.getElementById('idUsuario').value = item.idEmpleado;
                            userNameRemoto = item.emailEmpleado;
                            passwordRemoto = item.passwordEmpleado;
                            acceso = true;
                            return false;
                        }
                    });
                    //En caso de que el usuario ingresado existe se procede a la validación de credenciales
                    //
                    if (acceso) {
                        //En caso de que las credenciales sean correctas
                        //se procede al registro del regId
                        //
                        
                        if (username == userNameRemoto && password == passwordRemoto) {
                            //Envía formulario Vía Ajax en forma serializada
                            $.ajax({
                               type: "POST",
                               url: url,
                               data: $("#form-login").serialize(),
                               success: function(data)
                               {
                                   //Si el servidor responde con Successful  1, inició mas de una vez
                                   //Si el servidor responde con Successful 11, inició por primera vez
                                   // 
                                   if (data == 1) {
                                            
                                        app.showNotificationSensor("Iniciaste sesión con éxito");
                                        
                                        //Guarda credenciales segun elección del usuario
                                        //
                                        localStorage.setItem("usernameLocal", username);
                                        localStorage.setItem("passwordLocal", password);
                                        localStorage.setItem("regIdLocal", regId);
                                        localStorage.setItem("idUsuarioLocal", document.getElementById('idUsuario').value);

                                        if (cbGuardarStatus == true) {                                                
                                            localStorage.setItem("cbGuardarStatus",cbGuardarStatus);
                                        }

                                        location.href="home.html";
                                   } else {
                                        app.showNotificationSensor('Error en el inicio de sesión, intenta de nuevo');
                                   }
                               }
                            }); //Termina envio por ajax
                        } else {
                            app.showNotificationSensor('La Contraseña no coincide con el Usuario');
                            //alert('Tus datos de acceso no coindicen con la base de datos');
                        }
                    } else {
                        app.showNotificationSensor('El Usuario no existe');
                        //alert('El usuario ingresado no existe en la base de datos');
                    }
                }); //Termina getJson
            } else {
                app.showNotificationSensor('Alguno de los campos está vacío');
                //alert('Debes llenar los campos Usuario y Contraseña');
            }
        } else {
            app.showNotificationSensor('Esperando Registration ID para que usted pueda recibir las Notificaciones desde la Administración del Sitio Web'+
                                        ' www.sensorsafe.com.mx')
            //alert('Esperando regId');
        }
    });
});