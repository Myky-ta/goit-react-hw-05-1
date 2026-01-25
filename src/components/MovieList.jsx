import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div style={{ height: "300px", backgroundColor: "#333" }} />
            )}
            <div className="title">{movie.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
