import { useEffect, useState } from "react";
import Joi from "joi-browser";
import Form from "./utils/forms-helper.js";
import { getGenres } from "../services/genreService";
import { addMovie } from "../services/movieService";
import { toast } from 'react-toastify';

const initialData = {
  title: "",
  dailyRentalRate: "",
  genreId: "",
  numberInStock: "",
};

function NewMovie() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]);
  
  useEffect(() => {
    getGenres().then(({ data }) => {
      setGenres(data);
    });
  }, []);

  const schema = {
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

  async function handleSubmit(e) {
    const isValid = form.handleSubmit(e);
    if (isValid === false) {
      return;
    }
    
    try {
      await addMovie(data);  
      setData(initialData);
      toast.success('The movie was added successfully');
    } catch (error) {
      let msg = error.message || 'Internal Server Error' 
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

export default NewMovie;
