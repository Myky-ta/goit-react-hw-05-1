import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../api/tmdb";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then(setCast);
  }, [movieId]);

  return (
    <div className="cast-list">
      {cast.map((actor) => (
        <div key={actor.cast_id} className="cast-item">
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              width="100"
            />
          ) : (
            <div>No photo</div>
          )}
          <p><strong>{actor.name}</strong></p>
          <p>as {actor.character}</p>
        </div>
      ))}
    </div>
  );
}

