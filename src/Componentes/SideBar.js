import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faHouse, faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../Estilos/SideBar.css'; 

export default function SideBar() {

    const history = useNavigate();



    const handleRedirect = (url) => {
        history(url);
    };

    return (
        <div className="contenedor-sidebar">
            <FontAwesomeIcon className="icono" icon={faGraduationCap} />
            <div className="titulo-sidebar">
                Sistema de refuerzo al aprendizaje
            </div>
            <hr />
            <div className="opciones" onClick={() => handleRedirect('/SRA-Prueba/')}>
                <FontAwesomeIcon className="iconoGeneral" icon={faHouse} />
                <label> Vista general</label>
            </div>
            <div className="opciones" onClick={() => handleRedirect('/SRA-Prueba/recursos')}>
                <FontAwesomeIcon className="iconoRecursos" icon={faBook} />
                <label> Recursos de apoyo</label>
            </div>
        </div>
    );
};
