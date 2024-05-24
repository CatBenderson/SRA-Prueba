import { archivosPorUnidad, codigoPorUnidad } from "../Utils/Archivos.js";
import { leerArchivoJSON, renderizarContenido, ubicarUnidad } from '../Utils/Utils';
import { useState, useEffect } from 'react';
import '../Estilos/Unidad.css';
import { useNavigate } from "react-router-dom";
import Ejercicio from './Ejercicio';
import Missing from "./Missing.js";
import CodigoSeleccion from "./CodigoSeleccion.js";
import Modal from "./Modal.js";

export default function Unidad() {
    const [unidad, setUnidad] = useState({});
    const [codigo, setCodigo] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [numEjercicio, setNumEjercicio] = useState(1)
    const [numPregunta, setNumPregunta] = useState(1)



    const history = useNavigate();

    const handleRedirect = (url) => {
        history(url);
        window.location.reload()
    };

    const handleImageClick = (url, alt) => {
        setSelectedImage({ url, alt });
        setModalVisible(true);
    };

    function cambiarSiguienteEjercicio() {
        var aux = numEjercicio + 1;
        if (aux < 4 && ejercicios[numEjercicio + 1]?.pregunta) {
            setNumEjercicio(aux)
        }
    }

    function cambiarAnteriorEjercicio() {
        var aux = numEjercicio - 1;
        if (aux > 0 && ejercicios[numEjercicio - 1]?.pregunta) {
            setNumEjercicio(aux)
        }
    }

    function cambiarSiguientePregunta() {
        var aux = numPregunta + 1;
        if (aux < 6 && preguntas[numPregunta + 1]?.pregunta) {
            setNumPregunta(aux)
        }
    }

    function cambiarAnteriorPregunta() {
        var aux = numPregunta - 1;
        if (aux > 0 && preguntas[numPregunta - 1]?.pregunta) {
            setNumPregunta(aux)
        }
    }


    function siguienteUnidad() {
        const nuevaUnidad = parseInt(ubicarUnidad()) + 1;
        handleRedirect("/programacion/" + nuevaUnidad);
        window.scrollTo(0, 0);
    }

    function previaUnidad() {
        var nuevaUnidad = parseInt(ubicarUnidad()) - 1;
        if (nuevaUnidad === 0) {
            nuevaUnidad = 1
        }
        handleRedirect("/programacion/" + nuevaUnidad);
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        leerArchivoJSON(archivosPorUnidad[ubicarUnidad()])
            .then(contenido => {
                setUnidad(contenido);

            })
            .catch(error => {
                console.error('Error al cargar la información de la experiencia:', error);
            });

        leerArchivoJSON(codigoPorUnidad[ubicarUnidad()])
            .then(contenido => {
                setCodigo(contenido);
            })
            .catch(error => {
                console.error('Error al cargar la información de la experiencia:', error);
            });
    }, []);

    const { nombre, contenido, imagenes = {}, ejercicios = {}, preguntas = {} } = unidad;

    return (
        <>
            {nombre ? (
                <>
                    <p className="titulo-unidad">{nombre}</p>
                    <hr />

                    <div className="contenedor-contenido-unidad">
                        <div className="contenido-unidad">
                            {renderizarContenido(contenido)}
                        </div>
                        <div>
                            {[1, 2, 3].map(num => (
                                imagenes[num]?.url && (
                                    <img
                                        key={num}
                                        src={imagenes[num].url}
                                        className="imagen-unidad"
                                        alt={`Imagen ${num}`}
                                        loading="lazy"
                                        onClick={() => handleImageClick(imagenes[num].url, imagenes[num]?.alt)}
                                    />
                                )
                            ))}
                        </div>
                    </div>

                    {selectedImage && modalVisible && (
                        <Modal imagen={selectedImage} closeModal={() => setModalVisible(false)} >

                        </Modal>
                    )}


                    {codigo.clases &&
                        [1, 2, 3, 4, 5].map(num => (
                            codigo?.clases[num]?.java?.codigo && (
                                <CodigoSeleccion archivo={codigo.clases[num]} />
                            )
                        ))
                    }


                    {ejercicios[1]?.pregunta && (
                        <>
                            <p className="titulo-unidad">Ejercicios</p>
                            <hr />
                            <div className="contenedor-cambio">
                                <button className='boton-cambio' onClick={() => (cambiarAnteriorEjercicio())}> Ejercicio anterior</button>
                                <button className='boton-cambio' onClick={() => (cambiarSiguienteEjercicio())}> Ejercicio siguiente</button>
                            </div>
                            {ejercicios[numEjercicio]?.pregunta && (
                                <div className="conjunto-ejercicios">
                                    <Ejercicio numero={numEjercicio} ejercicio={ejercicios[numEjercicio]} />
                                </div>
                            )}

                        </>
                    )}

                    {preguntas[1]?.pregunta && (
                        <>
                            <p className="titulo-unidad">Preguntas del tema</p>
                            <hr />
                            <div className="contenedor-cambio">
                                <button className='boton-cambio' onClick={() => (cambiarAnteriorPregunta())}> Pregunta anterior</button>
                                <button className='boton-cambio' onClick={() => (cambiarSiguientePregunta())}> Pregunta siguiente</button>
                            </div>
                            {preguntas[numPregunta]?.pregunta && (
                                <div className="conjunto-ejercicios">
                                    <Ejercicio numero={numPregunta} ejercicio={preguntas[numPregunta]} />
                                </div>
                            )}

                        </>
                    )}


                    <div className="contenedor-cambio-unidad">
                        <button className='boton-unidad' onClick={() => (previaUnidad())}> &lt; Unidad anterior </button>
                        <button className='boton-unidad' onClick={() => (handleRedirect("/programacion"))}>Lista de unidades</button>
                        <button className='boton-unidad' onClick={() => (siguienteUnidad())}>Unidad siguiente &gt;</button>
                    </div>
                </>
            ) : (
                <Missing />
            )}
        </>
    );
}
