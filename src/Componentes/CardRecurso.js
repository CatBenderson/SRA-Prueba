import '../Estilos/CardRecurso.css'

export default function CardRecurso({ id, lenguaje, url }) {

    const handleRedirect = (url) => {
        window.location.replace(url);
    };

    return (
        <div className="contenedor-card-recurso" onClick={() => { handleRedirect(url) }}>
            <div className="numero-recurso"> {id}
            </div>
            <div className="titulo-recurso-info">
                <strong>{lenguaje}</strong>
            </div>
            <div className="titulo-recurso-info">
                {url}
            </div>
        </div>
    );
}