import experienciaInfo from '../Info/programacion.txt';
import { leerArchivoJSON } from "../Utils/Utils";
import { useState, useEffect } from 'react';
import '../Estilos/InfoExperiencia.css';
import CardUnidad from './CardUnidad';

export default function InfoExperiencia() {

    const [experiencia, setExperiencia] = useState({});

    useEffect(() => {
        leerArchivoJSON(experienciaInfo)
            .then(contenido => {
                setExperiencia(contenido);
            })
            .catch(error => {
                console.error('Error al cargar la información de la experiencia:', error);
            });
    }, [experienciaInfo]);

    return (
        <>
            <p className="titulo-info-experiencia">
                {experiencia.nombre}
            </p>
            <hr></hr>
            <div className='contenedor-descripcion-experiencia'>
                <p className='descripcion-info-experiencia'>{experiencia.descripcion}</p>
                <img src={experiencia.imagen} className='imagen-info-experiencia' />
            </div>
            <div>
                <p className="unidades-info-experiencia">Unidades</p>
                <hr className='divisor-experiencia'></hr>
                {experiencia && experiencia.unidades && experiencia.unidades.map(unidad => (
                    <CardUnidad id={unidad.id} unidad={unidad.nombre}/>
                ))}
            </div>
        </>
    );
}
