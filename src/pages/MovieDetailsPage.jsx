import { useEffect, useState } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from ?? "/movies";

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <Link to={backLink}>Go back</Link>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <nav>
        <Link to="cast">Cast</Link> | <Link to="reviews">Reviews</Link>
      </nav>

      <Outlet />
    </div>
  );
}
