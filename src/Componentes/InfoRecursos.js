import recursosInfo from '../Info/recursos.txt';
import { leerArchivoJSON } from "../Utils/Utils";
import { useState, useEffect } from 'react';
import '../Estilos/InfoRecursos.css';
import CardRecurso from './CardRecurso';

export default function Recursos() {

    const [recursos, setRecursos] = useState({});

    useEffect(() => {
        leerArchivoJSON(recursosInfo)
            .then(contenido => {
                setRecursos(contenido);
            })
            .catch(error => {
                console.error('Error al cargar la información:', error);
            });
    }, []);

    return (
        <>
            <p className="titulo-info-recursos">
                {recursos.nombre}
            </p>
            <hr></hr>
            <div className='contenedor-descripcion-recursos'>
                <p className='descripcion-info-recursos'>{recursos.descripcion}</p>
            </div>
            <div>
                <hr className='divisor-recursos'></hr>
                {recursos && recursos.fuentes && recursos.fuentes.map(fuente => (
                    <CardRecurso id={fuente.id} lenguaje={fuente.lenguaje} url={fuente.url}/>
                ))}
                

            </div>
        </>
    );
}
