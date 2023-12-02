$(()=>{
    VerificarJWT();
    AdministrarVerificarJWT();
    AdministrarLogout();
    AdministrarListar();
    AdministrarAgregar();
});


function VerificarJWT() : void {
    
    //RECUPERO DEL LOCALSTORAGE
    let jwt : string | null = localStorage.getItem("jwt");

    $.ajax({
        type: 'GET',
        url: URL_API + "verificar_token",
        dataType: "json",
        data: {},
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done( (obj_rta : any) => {

        console.log(obj_rta);

        if(obj_rta.exito){

            let app = obj_rta.jwt.api;
            let version = obj_rta.jwt.version;
            let usuario = obj_rta.jwt.usuario;

            let alerta : string = ArmarAlert("ApiRest: " + app + "<br>Versión: " + version + "<br>Usuario: " + JSON.stringify(usuario));

            $("#divResultado").html(alerta).toggle(2000);
            $("#rol").html(usuario.Rol);
        }
        else{

            let alerta : string = ArmarAlert(obj_rta.mensaje, "danger");

            $("#divResultado").html(alerta).toggle(2000);

            setTimeout(() => {
                $(location).attr('href', URL_BASE + "index.html");
            }, 1500);
        }
    })
    .fail( (jqXHR : any, textStatus : any, errorThrown : any) => {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta : string = ArmarAlert(retorno.mensaje, "danger");

        $("#divResultado").html(alerta).show(2000);
    });    
}

function AdministrarVerificarJWT() : void {
    
    $("#verificarJWT").on("click", ()=>{

        VerificarJWT();
    });
}

function AdministrarLogout() : void {

    $("#logout").on("click", ()=>{

        //ELIMINO DEL LOCALSTORAGE
        localStorage.removeItem("jwt");

        let alerta : string = ArmarAlert('Usuario deslogueado!!!');
    
        $("#divResultado").html(alerta).show(2000);

        setTimeout(() => {
            $(location).attr('href', URL_BASE + "index.html");
        }, 1500);

    });

}

function AdministrarListar() : void {

    $("#listar_producto").on("click", ()=>{

        ObtenerListadoProductos();
    });
}

function AdministrarAgregar() : void {

    $("#alta_producto").on("click", ()=>{

        ArmarFormularioAlta();
    });
}

function ObtenerListadoProductos() : void {
   
    $("#divResultado").html("");

    let jwt : string | null = localStorage.getItem("jwt");

    $.ajax({
        type: 'GET',
        url: URL_API + "productos_bd",
        dataType: "json",
        data: {},
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done( (resultado : any) => {

        console.log(resultado);

        let tabla : string = ArmarTablaProductos(resultado);

        $("#divResultado").html(tabla).show(1000);

        //ASOCIAR MANEJADORES DE EVENTOS PARA MODIFICAR Y ELIMINAR
        $("[data-action='modificar']").on("click", function(e){
            let objString : any = $(this).attr("data-obj_prod");
            let obj = JSON.parse(objString);
            let form = MostrarForm("modificacion", obj);
            $("#cuerpo_modal_prod").html(form);
        });

        $("[data-action='eliminar']").on("click", function(e){
            let objString : any = $(this).attr("data-obj_prod");
            let obj = JSON.parse(objString);
            let form = MostrarForm("baja", obj);
            $("#cuerpo_modal_prod").html(form);
        });

        
    })
    .fail( (jqXHR : any, textStatus : any, errorThrown : any) => {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta : string = ArmarAlert(retorno.mensaje, "danger");

        $("#divResultado").html(alerta).show(2000);
    });    
}

function ArmarTablaProductos(productos : []) : string 
{   
    let tabla : string = '<table class="table table-dark table-hover">';
    tabla += '<tr><th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th style="width:110px">ACCIONES</th></tr>';

    if(productos.length == 0)
    {
        tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
    }
    else
    {
        productos.forEach((item : any) => {

            tabla += "<tr><td>"+item.codigo+"</td><td>"+item.marca+"</td><td>"+item.precio+"</td>"+
            "<td><img src='"+URL_API+item.path+"' width='50px' height='50px'></td><th>"+
            "<a href='#' class='btn' data-action='modificar' data-obj_prod='"+JSON.stringify(item)+"' title='Modificar'"+
            " data-toggle='modal' data-target='#ventana_modal_prod'><span class='fas fa-edit'></span></a>"+
            "<a href='#' class='btn' data-action='eliminar' data-obj_prod='"+JSON.stringify(item)+"' title='Eliminar'"+
            " data-toggle='modal' data-target='#ventana_modal_prod'><span class='fas fa-times'></span></a>"+
            "</td></tr>";
        });
    }

    tabla += "</table>";

    return tabla;
}

function ArmarFormularioAlta() : void
{
    $("#divResultado").html("");

    let formulario : string = MostrarForm("alta");

    $("#cuerpo_modal_prod").html(formulario);

    ((Object)($("#ventana_modal_prod"))).modal({ backdrop: "static" });
}

function MostrarForm(accion : string, obj : any = null) : string 
{
    let funcion : string = "";
    let encabezado : string = "";
    let solo_lectura : string = "";
    let solo_lectura_pk : string = "readonly";

    switch (accion) {
        case "alta":
            funcion = 'Agregar(event)';
            encabezado = 'AGREGAR PRODUCTO';
            solo_lectura_pk = "";
            break;

         case "baja":
            funcion = 'Eliminar(event)';
            encabezado = 'ELIMINAR PRODUCTO';
            solo_lectura = "readonly";
            break;
    
        case "modificacion":
            funcion = 'Modificar(event)';
            encabezado = 'MODIFICAR PRODUCTO';
            break;
    }

    let codigo : string = "";
    let marca : string = "";
    let precio : string = "";
    let path : string = URL_BASE + "/img/producto_default.png";

    if (obj !== null) 
    {
        codigo = obj.codigo;
        marca = obj.marca;
        precio = obj.precio;
        path = URL_API + obj.path;       
    }

    let form:string = '<h3 style="padding-top:1em;">'+encabezado+'</h3>\
                        <div class="row justify-content-center">\
                            <div class="col-md-8">\
                                <form class="was-validated">\
                                    <div class="form-group">\
                                        <label for="codigo">Código:</label>\
                                        <input type="text" class="form-control" id="codigo" placeholder="Ingresar código"\
                                            value="'+codigo+'" '+solo_lectura_pk+' required>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="marca">Título:</label>\
                                        <input type="text" class="form-control" id="marca" placeholder="Ingresar marca"\
                                            name="marca" value="'+marca+'" '+solo_lectura+' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="precio">Precio:</label>\
                                        <input type="number" class="form-control" id="precio" placeholder="Ingresar precio" name="precio"\
                                            value="'+precio+'" '+solo_lectura+' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="foto">Foto:</label>\
                                        <input type="file" class="form-control" id="foto" name="foto" '+solo_lectura+' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="row justify-content-between"><img id="img_prod" src="'+path+'" width="400px" height="200px"></div><br>\
                                    <div class="row justify-content-between">\
                                        <input type="button" class="btn btn-danger" data-dismiss="modal" value="Cerrar">\
                                        <button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="'+funcion+'" >Aceptar</button>\
                                    </div>\
                                </form>\
                            </div>\
                        </div>';

    return form;
}

//#region CRUD

function Agregar(e : any) : void 
{  
    e.preventDefault(); 

    let jwt = localStorage.getItem("jwt");
    let codigo = $("#codigo").val();
    let marca = $("#marca").val();
    let precio = $("#precio").val();
    let foto : any = $("#foto")[0];

    let formData: FormData = new FormData();
    formData.append("obj", JSON.stringify({"codigo":codigo , "marca":marca , "precio": precio}));
    formData.append("foto", foto.files[0]);

    $.ajax({
        type: 'POST',
        url: URL_API + "productos_bd",
        dataType: "json",
        data: formData,
        cache : false, // para las fotos dejarlo en false
        processData:false, // para las fotos dejarlo en false
        contentType:false, // para las fotos dejarlo en false
        headers : {'Authorization': 'Bearer ' + jwt}, // el middleware q se pasa por cabecera
        async: true
    })
    .done(function (obj_ret:any) {
        console.log(obj_ret);
        let alerta:string = "";
        alerta = ArmarAlert(obj_ret);
        $("#divResultado").html(alerta);      
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
        let retorno = JSON.parse(jqXHR.responseText);
        let alerta:string = ArmarAlert(retorno.mensaje, "danger");
        $("#divResultado").html(alerta);
    });   
}

function Modificar(e : any) : void 
{  
    e.preventDefault(); 

    let jwt = localStorage.getItem("jwt");
    let codigo = $("#codigo").val();
    let marca = $("#marca").val();
    let precio = $("#precio").val();
    let foto : any = $("#foto")[0];

    let formData: FormData = new FormData();
    formData.append("obj", JSON.stringify({"codigo":codigo , "marca":marca , "precio": precio}));
    formData.append("foto", foto.files[0]);

    $.ajax({
        type: 'PUT',
        url: URL_API + "productos_bd",
        dataType: "JSON",
        data: formData,
        cache : false, // para las fotos dejarlo en false
        processData:false, // para las fotos dejarlo en false
        contentType:false, // para las fotos dejarlo en false
        headers : {'Authorization': 'Bearer ' + jwt}, // el middleware q se pasa por cabecera
        async: true
    })
    .done(function (obj_ret:any) {

        console.log(obj_ret);
        $("#cuerpo_modal_prod").html("");
        ObtenerListadoProductos();
        
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta:string = ArmarAlert(retorno.mensaje, "danger");

        $("#divResultado").html(alerta);

    });   
}

function Eliminar(e : any) : void 
{
    e.preventDefault();
    
    let codigo = $("#codigo").val();

    ((Object)($("#cuerpo_modal_prod"))).modal("hide");
    
    $("#cuerpo_modal_confirm").html('\<h5>¿Está seguro de eliminar el producto '+codigo+'?</h5> \
    <input type="button" class="btn btn-danger" data-dismiss="modal" value="NO" style="float:right;margin-left:5px">\
    <button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="ContinuarEliminar('+codigo+')" style="float:right">Sí </button>');

    ((Object)($("#ventana_modal_confirm"))).modal({ backdrop: "static" });

    return;
}

function ContinuarEliminar(codigo : any) : void
{
    //IMPLEMENTAR ELIMINACIÓN BD   
    let jwt = localStorage.getItem("jwt");
    $.ajax({
        type: 'DELETE',
        url: URL_API + "productos_bd",
        dataType: "JSON",
        data: {"codigo":codigo},
        headers : {'Authorization': 'Bearer ' + jwt}, // el middleware q se pasa por cabecera
        async: true
    })
    .done(function (obj_ret:any) {

        console.log(obj_ret);
        $("#cuerpo_modal_prod").html("");
        ObtenerListadoProductos();
        
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta:string = ArmarAlert(retorno.mensaje, "danger");

        $("#divResultado").html(alerta);

    });   
   
}

//#endregion