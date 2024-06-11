import { renderizarContenido } from '../Utils/Utils';
import '../Estilos/Ejercicios.css';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';

export default function Ejercicio({ numero, ejercicio }) {
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

    useEffect(() => {
        setRetroalimentacion(false)
        setRespuestaSeleccionada('')
    }, [ejercicio]);

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
                <div className="numero-card-ejercicio">{numero}</div>
                <div className="pregunta-card-ejercicio">
                    {renderizarContenido(ejercicio.pregunta)}
                </div>
            </div>
            <form onSubmit={manejarSubmit} className="formulario-ejercicio">
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
                        <label htmlFor={ejercicio.id + key}> {`${key}) `} {`${ejercicio.respuestas[key].contenido}`}</label>
                    </div>
                ))}
                <div className="contenedor-boton-ejercicio">
                    <button type='submit' className='boton-ejercicio'>Seleccionar</button>
                </div>
                {retroalimentacion && (
                    <div className={`retroalimentacion-card-ejercicio ${retroalimentacionTrue ? '' : 'retroalimentacion-error'}`}>
                        <p className='titulo-retroalimentacion'><strong>Retroalimentación</strong></p>
                        {renderizarContenido(retroalimentacion)}
                    </div>
                )}

                {selectedImage && modalVisible && (
                    <Modal imagen={selectedImage} closeModal={() => setModalVisible(false)} />
                )}
            </form>
        </div>
    );
}
