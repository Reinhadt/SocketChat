const {io} = require('../server')
const {Usuarios} = require('../classes/usuarios')

const usuarios = new Usuarios()

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if(!usuario.nombre){
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }

        let personas = usuarios.agregarPersona(client.id, usuario.nombre)

        client.broadcast.emit('listaPersonas', usuarios.getPersonas())

        callback(personas)
        console.log(usuario)
    })


    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id)

        client.broadcast.emit('crearMensaje', {usuario: 'Administrador', mensaje: `${personaBorrada} abandonó el chat`})
        client.broadcast.emit('listaPersonas', usuarios.getPersonas())
    })

})