import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../api/tmdb";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <p><b>{review.author}</b>: {review.content}</p>
        </li>
      ))}
    </ul>
  );
}
