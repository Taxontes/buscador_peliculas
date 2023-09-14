import React from "react";
import { useState } from "react";

export const BuscadorPeliculas = () => {
  //Variables que me permiten consumir la Api
  const url = "https://api.themoviedb.org/3/search/movie";
  const Api_Key = "2bd64368234c0623f65d665330fe2d34";

  //UseState para almacenar y modificar la informacion obtenida
  const [pelicula, setPelicula] = useState("");
  const [contenido, setContenido] = useState([]);

  const [busqueda, setBusqueda] = useState(null);

  //Evento del input para almacenar el valor de lo solicitado por el cliente
  const onChange = (e) => {
    setPelicula(e.target.value);
    setBusqueda(null);
  };

  //Evento que consume la api con la informacion anterior y lo modifica a json para ser mostrada
  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${url}?query=${pelicula}&api_key=${Api_Key}`
      );
      const data = await response.json();
      //Siempre que queramos pasar la informacion como array y evitar el error Uncaught TypeError: contenido.map is not a function
      //Debemos añadir el results al final
      setContenido(data.results);
      setBusqueda(true);
    } catch (error) {
      console.error(`Ha ocurrido un error ${error}`);
    }
  };

  //Evento del boton del buscador
  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetchPeliculas();
  };

  return (
    <div className="container">
      <h1 className="title">Buscador Peliculas</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Escribe tu película"
          value={pelicula}
          onChange={onChange}
        />

        <button type="submit" className="search-button">
          🔍
        </button>
      </form>

      <div className="movie-list">
        {busqueda === null ? null : busqueda && contenido.length > 0 ? ( // No muestra nada mientras no se haya realizado una búsqueda
          contenido.map((film) => (
            <div key={film.id} className="movie-card">
              {film.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  alt=""
                />
              ) : (
                // Si no hay imagen, muestra una imagen predeterminada
                <img
                  src="./static/images/notFound.jpg" // Ruta a la imagen predeterminada
                  alt="Imagen predeterminada"
                />
              )}
              <h2>{film.title}</h2>
              <p>{film.overview}</p>
            </div>
          ))
        ) : (
          <p>No hay películas con este título</p>
        )}
      </div>
    </div>
  );
};
