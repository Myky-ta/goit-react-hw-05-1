import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "./components/Navigation";

// 🔁 Динамічний імпорт сторінок
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<p style={{ padding: "1rem" }}>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
