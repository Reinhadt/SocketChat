const {io} = require('../server')
const {Usuarios} = require('../classes/usuarios')

const {crearMensaje} = require('../utilidades/utilidades')

const usuarios = new Usuarios()

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        //unimos al usuario a la sala elegida
        client.join(usuario.sala)

        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala)
        
        //Mando la notificación del nuevo usuario conectado solo a la gente de la sala a la que estoy conectado
        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonaPorSala(usuario.sala))

        callback(personas)
        console.log(usuario)
    })

    client.on('crearMensaje', (data) =>{

        let persona = usuarios.getPersona(client.id)
        let mensaje = crearMensaje(persona, data.mensaje)

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

    })

    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id)

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada} abandonó el chat`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonaPorSala(personaBorrada.sala))
    })

    //Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id)

        //emitir broadcast a un solo usuario por su client.id
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

})