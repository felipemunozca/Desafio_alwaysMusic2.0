/**
 * iniciar el proyecto con npm
 * > npm init -y
 * 
 * instalar el paquete pg
 * > npm i pg
 * 
 * levantar el programa por consola
 * > node index.js
 */

/* Se crea una clase que requiera al paquete pg. */
const { Pool } = require('pg');

/* Metodo de conexion mediante un objeto con la informacion de la base de datos. */
const config = {
    user: 'felipe',
    host: 'localhost',
    password: '123456',
    database: 'alwaysMusic',
    port: 5432,
    /* cantidad maxima de clientes conectados. */
    max: 20,
    /* cantidad en milisegundos que un usuario puede permanecer inactivo, si pasa el tiempo, es desconectado. */
    idleTimeoutMillis: 5000,
    /* cantidad en milisegundos que deben transcurrir ante que se agote el tiempo de espera para conectar un nuevo cliente. */
    connectionTimeoutMillis: 2000,
};

/* Se crea una nueva constante llamada pool la que sera igual a la clase y al objeto de configuracion. */
const pool = new Pool(config);


/* Función para Agregar un nuevo estudiante. */
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion){
        /* Se utiliza release() para liberar al cliente en cada una de las consultas que haga, 
        para que despues entre a la siguiente seccion de codigo. Es lo que se conoce como "ejecucion secuencial". */
        console.log("Ha ocurrido un error al conectarse a la Base de Datos.", error_conexion)
        release();
    } else {
        try {
            /**
             * Al utilizar async/await se convierte la consulta sql en codigo sincronico. Se tiene que esperar a que se ejecute la consulta antes de continuar.
             * Prepared Statements se agrega utilizando el atributo name: junto a un nombre que lo pueda identeficiar entre comillas ''.
             * rowMode se utiliza para recibir los rows en formato array, ya que por defecto es en formato json.
             * Al escribir la consulta SQL, en vez de recibir los parametros directamente, se crea una parametrizacion utilizando un valor junto al signo peso $.
             * values sera un arreglo con los valores separados y ordenados segun como se declaro la consulta.
             */
            const consultaSQL = {
                name: 'agregar-alumno',
                rowMode: "array",
                text: "INSERT INTO alumnos(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *;",
                values: ["Felipe Munoz", "17.819.597-2", "Guitarra", "5"]
            }

            const res = await client.query(consultaSQL);
            console.log(res.rows);
            release();
        } catch (error) {
            release();
            /**
             * Si exister un error, se imprime el codigo del error y luego se busca en la documentacion oficial. Por ejemplo: ED000
             * https://www.postgresql.org/docs/current/errcodes-appendix.html
             */
            console.log(error.code);
            console.log(error.message);
        }
    }
    pool.end();
})


/* Función para Consultar los estudiantes registrados. */
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion){
        console.log("Ha ocurrido un error al conectarse a la DDBB.", error_conexion)
        release();
    } else {
        try {
            const consultaSQL = {
                name: "consultar-alumnos",
                rowMode: "array",
                text: "SELECT * FROM alumnos;"
            }

            const res = await client.query(consultaSQL);
            console.log(res.rows);
            release();
        } catch (error) {
            release();
            console.log(error.code);
            console.log(error.message);
        }
    }
    pool.end();
})


/* Función para Consultar estudiante por rut. */
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion){
        console.log("Ha ocurrido un error al conectarse a la DDBB.", error_conexion);
        release();
    } else {
        try {
            const consultaSQL = {
                name: "consultar-alumno-rut",
                rowMode: "array",
                text: "SELECT * FROM alumnos WHERE rut = $1;",
                values: ["17.819.597-2"],
            }

            const res = await client.query(consultaSQL);
            console.log(res.rows);
            release();
        } catch (error) {
            release();
            console.log(error.code);
            console.log(error.message);
        }
    }
    pool.end();
})


/* Función para Actualizar la información de un estudiante. */
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion){
        console.log("Ha ocurrido un error al conectarse a la DDBB.", error_conexion)
        release();
    } else {
        try {
            const consultaSQL = {
                name: "actualizar-alumno",
                rowMode: "array",
                text: "UPDATE alumnos SET nombre=$2, rut=$3, curso=$4, nivel=$5 WHERE id=$1 RETURNING *;",
                values: ["1", "Felipe Munoz", "17.819.597-2", "Acordeon", "6"]
            }

            const res = await client.query(consultaSQL);
            console.log(res.rows);
            release();
            
        } catch (error) {
            release();
            console.log(error.code);
            console.log(error.message);
            
        }
    }
    pool.end();
})


/* Función para Eliminar el registro de un estudiante. */
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion){
        console.log("Ha ocurrido un error al conectarse a la DDBB.", error_conexion);
        release();
    } else {
        try {
            const consultaSQL = {
                name: "eliminar-alumno",
                rowMode: "array",
                text: "DELETE FROM alumnos WHERE id = $1 RETURNING *;",
                values: ["1"]
            }

            const res = await client.query(consultaSQL);
            console.log(res.rows);
            release();
        } catch (error) {
            release();
            console.log(error.code);
            console.log(error.message);
        }
    }
    pool.end();
})