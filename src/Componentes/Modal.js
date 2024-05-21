import React from 'react';
import '../Estilos/Modal.css'; // Asegúrate de importar los estilos del modal si los tienes
import { renderizarContenido } from '../Utils/Utils';

const Modal = ({ imagen, closeModal }) => {
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img className='modal-imagen' src={imagen.url} alt={imagen.alt} />
                <div className='modal-imagen-texto'>{renderizarContenido(imagen.alt)}</div>
            </div>
        </div>
    );
}

export default Modal;
