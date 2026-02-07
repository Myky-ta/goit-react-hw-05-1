import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits, getMovieReviews } from "../api/tmdb";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeSection, setActiveSection] = useState(null); // null, "cast", "reviews"
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
    getMovieCredits(movieId).then(setCast);
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div className="movie-details">
      {/* Верхній блок: постер + інфо збоку */}
      <div className="movie-header">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <div className="movie-info">
          <Link to={backLinkRef.current}>← GO BACK</Link>
          <h2>{movie.title}</h2>
          <p className="score">User score: {renderStars(movie.vote_average)}</p>
          <p className="overview">{movie.overview}</p>
          <p className="genre">
            Genre: {movie.genres.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      {/* Кнопки знизу */}
      <div className="toggle-buttons">
        <button onClick={() => setActiveSection("cast")}>Cast</button>
        <button onClick={() => setActiveSection("reviews")}>Reviews</button>
      </div>

      {/* Cast */}
      {activeSection === "cast" && (
        <>
          <h3>Cast</h3>
          <div className="cast-list">
            {cast.map((actor) => (
              <div key={actor.cast_id} className="cast-item">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                ) : (
                  <div style={{ width: "100px", height: "150px", background: "#333" }} />
                )}
                <p><strong>{actor.name}</strong></p>
                <p>as {actor.character}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Reviews */}
      {activeSection === "reviews" && (
        <>
          <h3>Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <h4>{review.author}</h4>
                  <p className="stars">
                    {renderStars(review.author_details?.rating || 0)}
                  </p>
                  <p>{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
