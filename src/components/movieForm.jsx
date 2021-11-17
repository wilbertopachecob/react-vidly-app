import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import Form from "./utils/forms-helper.js";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

const initialData = {
  title: "",
  dailyRentalRate: "",
  genreId: "",
  numberInStock: "",
};

function MovieForm({ match, history }) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const genres = getGenres();
  const schema = {
    _id: Joi.string().optional(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  const form = Form(data, setData, errors, setErrors, schema);

  useEffect(() => {
    const movie = getMovie(match.params.id);
    if (!movie) {
      return history.replace("/not-found");
    }
    const data = {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
    };
    setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params]);

  function goTo(path) {
    history.push(path);
  }

  function handleSubmit(e) {
    const isValid = form.handleSubmit(e);
    if (isValid === false) {
      return;
    }
    saveMovie(data);
    setData(initialData);
    goTo("/movies");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Movie Form</h1>
      {form.renderInput("title", "Title")}
      {form.renderSelect(genres, "genreId", "Genre")}
      {form.renderInput("numberInStock", "Number In Stock", "number")}
      {form.renderInput("dailyRentalRate", "Rate", "number")}
      {form.renderSubmitButton()}
    </form>
  );
}

export default MovieForm;
