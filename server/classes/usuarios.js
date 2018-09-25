class Usuarios{
    constructor(){
        this.personas = []
    }

    agregarPersona(id, nombre){
        let persona = {
            id,
            nombre
        }

        this.personas.push(persona)

        return this.personas

    }

    getPersona(id){
        let persona = this.personas.filter(pers => {
            return pers.id === id
        })[0] //-> para obtener el primero solamente
        
        return persona
    }

    getPersonas(){
        return this.personas
    }

    getPersonaPorSala(sala){
        return
    }

    borrarPersona(id){

        let personaBorrada = this.getPersona(id)
        
        this.personas = this.personas.filter(pers =>{
            return pers.id !== id
        })

        return personaBorrada
    }

}

module.exports = {
    Usuarios
}