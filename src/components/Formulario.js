import React, {useState} from 'react';
import Error from './Error';
import ProPTypes from 'prop-types';

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const handleBuscarImagenes = e => {
        e.preventDefault();

        if(termino.trim() === '') {
            setError(true);
            return;
        }

        setBusqueda(termino);

        setError(false);
    }

    return ( 
        <form
            onSubmit={handleBuscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: fútbol p café"
                        onChange={e => setTermino(e.target.value)}
                    />
                
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                
                </div>
            </div>
            {error ? <Error mensaje="Agrega un término de busqueda"/> : null}
        </form>
     );
}

Formulario.propTypes = {
    setBusqueda: ProPTypes.func.isRequired
}
 
export default Formulario;