require('colors');
const { guardaDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    leerInputNumber,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        // Establecer el listado de tareas
        tareas.cargarTareasFromArr(tareasDB);

    }

    do{
        // imprimir menu
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                // crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            
            case '3': //Listar completadas
                tareas.listadoCompletadasPendientes(true);
                break;
            
            case '4': //Listar pendientes
                tareas.listadoCompletadasPendientes(false);
                break;
            case '5': //Completar tarea
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                const ok = await confirmar('Esta seguro de borrar la tarea?');
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('\nTarea borrada correctamente...'.green);
                } else {
                    console.log('Cancelado...'.red);
                }
                break;
        }

        guardaDB(tareas.listadoArr);
        
        await pausa();

    }while(opt !== '0');


}
main();