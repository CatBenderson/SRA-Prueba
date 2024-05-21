import '../Estilos/CardExperiencia.css'
import { useNavigate } from "react-router-dom";

export default function CardExperiencia({id, experiencia}) {

    const history = useNavigate();

    const handleRedirect = (url) => {
        history(url);
    };

    function comprobarExperiencia(experiencia) {
        if (experiencia=="Programación"){
            handleRedirect("/programacion")
        }else{
            handleRedirect("/missing")
        }
    }


    return (
        <>
            <div className="contenedor-card-experiencia">
                <div className="imagen-card">
                </div>
                <div className="titulo-card">
                {experiencia}
                </div>
                <button className="boton-card" onClick={()=>{comprobarExperiencia(experiencia)}}>
                    Entrar
                </button>
            </div>
        </>
    );
};