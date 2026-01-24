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
    <ul>
      {cast.map((actor) => (
        <li key={actor.cast_id}>
          {actor.name} as {actor.character}
        </li>
      ))}
    </ul>
  );
}
