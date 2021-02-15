import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPagina, setTotalPagina] = useState(1);

  useEffect(() => {
    
    const consultaAPI = async () => {

      if(busqueda === '') return;
  
      const imagenesPorPagina = 20;
      const apiKey = '20208001-55042264c880b3813da7cf141';
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // Calcular el total de páginas
      const calcularTotalPagina = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPagina(calcularTotalPagina);

      // Mover pantalla hacía arriba
      const jumbotron = document.querySelector('.container');
      jumbotron.scrollIntoView({ behavior: 'smooth'})
      
    }
    consultaAPI();

  }, [busqueda, paginaActual])

  // Definir página anterior
  const handlePaginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual);
  }
  const handlePaginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if(nuevaPaginaActual > totalPagina) return;

    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario
          setBusqueda={setBusqueda}
        />

        <div className="row justify-content-center">
          <ListadoImagenes 
            imagenes={imagenes}
          />

          {(paginaActual === 1) ? null : (
            <button 
              type="button"
              className="bbtn btn-info mr-1"
              onClick={handlePaginaAnterior}  
            >&laquo; Anterior</button>
          )}
          
          {(paginaActual === totalPagina) ? null : (
            <button 
              type="button"
              className="bbtn btn-info"
              onClick={handlePaginaSiguiente}
            >Siguiente &raquo;</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
