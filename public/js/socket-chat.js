var socket = io()

var param = new URLSearchParams(window.location.search)

if(!param.has('nombre')){
    window.location = 'index.html'
    throw new Error('El nombre es necesario')
}

var usuario = {
    nombre : param.get('nombre')
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