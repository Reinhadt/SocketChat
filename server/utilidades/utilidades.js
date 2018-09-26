const crearMensaje = (nombre, mensaje) =>{
    return{
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}

module.export = {
    crearMensaje
}