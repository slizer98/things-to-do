require('colors');
const { guardaDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa, 
    leerInput 
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
        }

        guardaDB(tareas.listadoArr);
        
        await pausa();

    }while(opt !== '0');


}
main();