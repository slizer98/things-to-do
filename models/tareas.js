
const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });  

        return listado;
    }
    
    constructor(){
        this._listado = {};
    }

    cargarTareasFromArr(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;  
        });
    }
    

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        // recuperar todas las tareas
        const tareas = this.listadoArr;
        // imprimir el listado
        let cont = 1;
        tareas.forEach((tarea, i) => {
            i = i + 1;
            const {desc, completadoEn} = tarea;
            console.log(`${colors.green(i)}. ${desc} :: ${completadoEn ? colors.green('Completado') : colors.red('Pendiente')}`);
        })
    }
}

module.exports = Tareas;