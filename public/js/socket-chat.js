var socket = io()

var param = new URLSearchParams(window.location.search)

if(!param.has('nombre') || !param.has('sala') ){
    window.location = 'index.html'
    throw new Error('El nombre y/o la sala son necesarios')
}

var usuario = {
    nombre : param.get('nombre'),
    sala:  param.get('sala')
}

socket.on('connect', function(){
    console.log('conectado')

    socket.emit('entrarChat', usuario, function(resp){
        console.log('Usuarios Conectados: ', resp)
    })
    

})

socket.on('disconnect', function(){
    console.log('Se desconectó el servidor')
})

//Emit = enviar información
socket.emit('enviarMensaje', {
    usuario: 'Omar',
    mensaje: 'Holaaa!'
}, function(resp){
    console.log('Respuesta server: ', resp)
})

//Escuchar info desde el server
socket.on('crearMensaje', function(mensaje){
    console.log('Servidor mandó: ', mensaje)
})

//Escuchar cuando las personas entraan o salen
socket.on('listaPersonas', function(mensaje){
    console.log('Servidor mandó: ', mensaje)
})

//Mensajes privados
socket.on('mensajePrivado', function(mensaje){

})