import { renderizarContenido } from '../Utils/Utils';
import '../Estilos/Ejercicios.css';
import React, { useState } from 'react';
import Modal from './Modal';

export default function Ejercicio({ ejercicio }) {
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
    const [retroalimentacion, setRetroalimentacion] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [retroalimentacionTrue, setRetroalimentacionTrue] = useState(false);

    const manejarSeleccion = e => {
        setRespuestaSeleccionada(e.target.value);
    };

    const handleImageClick = (url, alt) => {
        setSelectedImage({ url, alt });
        setModalVisible(true);
    };

    const manejarSubmit = e => {
        e.preventDefault();

        if (respuestaSeleccionada !== "") {
            if (ejercicio.respuestas[respuestaSeleccionada].estado === "true") {
                setRetroalimentacion(ejercicio.respuestas[respuestaSeleccionada].retroalimentacion);
                setRetroalimentacionTrue(true);
            } else {
                setRetroalimentacion(ejercicio.respuestas[respuestaSeleccionada].retroalimentacion);
                setRetroalimentacionTrue(false);
            }
        }
    };

    return (
        <div className="contenedor-card-ejercicio">
            <div className="contenedor-card-ejercicio-pregunta">
                {ejercicio.imagen && (
                    <img
                        src={ejercicio.imagen}
                        className="imagen-card-ejercicio"
                        alt="Imagen del ejercicio"
                        onClick={() => handleImageClick(ejercicio.imagen, "")}
                    />
                )}
                <div className="pregunta-card-ejercicio">
                    {renderizarContenido(ejercicio.pregunta)}
                </div>
            </div>
            <form onSubmit={manejarSubmit}>
                {Object.keys(ejercicio.respuestas).map(key => (
                    <div key={key} className='respuesta-ejercicio'>
                        <input
                            type='radio'
                            name='respuesta'
                            id={ejercicio.id + key}
                            value={key}
                            onChange={manejarSeleccion}
                            checked={respuestaSeleccionada === key}
                        />
                        <label htmlFor={ejercicio.id + key}> <strong> {`${key}) `} </strong> {`${ejercicio.respuestas[key].contenido}`}</label>
                    </div>
                ))}
                <button type='submit' className='boton-ejercicio'>Seleccionar</button>
                {retroalimentacion && (
                    <div className={`retroalimentacion-card-ejercicio ${retroalimentacionTrue ? '' : 'retroalimentacion-error'}`}>
                        <p className='titulo-retroalimentacion'><strong>Retroalimentación</strong></p>
                        {retroalimentacion}
                    </div>
                )}

                {selectedImage && modalVisible && (
                    <Modal imagen={selectedImage} closeModal={() => setModalVisible(false)} />
                )}
            </form>
        </div>
    );
}
