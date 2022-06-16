
const { Pool } = require('pg');

const config = {
    user: 'felipe',
    host: 'localhost',
    password: '123456',
    database: 'alwaysMusic',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);


/* Función para Agregar un nuevo estudiante. */
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion){
        console.log("Ha ocurrido un error al conectarse a la Base de Datos.", error_conexion)
        release();
    } else {
        try {
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