import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import Form from "./utils/forms-helper.js";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

const initialData = {
  title: "",
  dailyRentalRate: "",
  genreId: "",
  numberInStock: "",
};

function MovieForm({ match, history }) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres().then(({ data }) => {
      setGenres(data);
    });
  }, []);

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

  function mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
    };
  }

  useEffect(() => {
    const populateMovie = async () => {
      try {
        const { data: movie } = await getMovie(match.params.id);
        setData(mapToViewModel(movie));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          history.replace("/not-found");
        }
      }
    };
    populateMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params]);

  function goTo(path) {
    history.push(path);
  }

  async function handleSubmit(e) {
    const isValid = form.handleSubmit(e);
    if (isValid === false) {
      return;
    }
    try {
      await saveMovie(data);
      setData(initialData);
      goTo("/movies");
    } catch (error) {
      let msg = error.message || "Internal Server Error";
      if (error.response && error.response.status === 404) {
        msg = "The movie with the provided id was not found";
      }
      toast.error(msg);
    }
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
