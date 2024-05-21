import experiencias from "../Info/experiencias-educativas.txt"
import { leerArchivoJSON } from "../Utils/Utils"
import { useState, useEffect } from 'react';
import CardExperiencia from "./CardExperiencia"
import '../Estilos/Principal.css'

export default function Principal() {
    const [listaExperiencias, setListaExperiencias] = useState([]);

    useEffect(() => {
        leerArchivoJSON(experiencias)
            .then(contenido => {
                setListaExperiencias(contenido);
            })
    }, [experiencias]);

    return (
        <>
            <p className="titulo-principal">
                Experiencias educativas
            </p>
            <hr></hr>

            {listaExperiencias.map(experiencia => (
                <CardExperiencia id={experiencia.id} experiencia={experiencia.nombre} />
            ))}

        </>
    );
};