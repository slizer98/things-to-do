
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

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        } 
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

    listadoCompletadasPendientes(completadas = true){
         // recuperar todas las tareas
         const tareas = this.listadoArr;
         // imprimir el listado
         let cont1 = 1, cont2 = 1;
         tareas.forEach(tarea => {
             const {desc, completadoEn} = tarea;
             if(completadas){
                if(completadoEn){
                    console.log(`${colors.green(cont1)}. ${desc} :: ${'completado:'.green} ${colors.green(completadoEn)}`);
                    cont1 += 1;
                }
             }
            else if(!completadoEn ){
                console.log(`${colors.green(cont2)}. ${desc} :: ${'pendiente'.red}`);
                cont2 += 1;
            }
         })
    }
}
module.exports = Tareas;