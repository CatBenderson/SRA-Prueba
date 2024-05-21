import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Estilos/Missing.css'

export default function Missing() {
    return (
        <div className="contenedor-missing">
        <FontAwesomeIcon icon={faFileCircleXmark} className="icon-missing"/>
        <div className="texto-missing">Información no disponible</div>
        </div>
    );
}