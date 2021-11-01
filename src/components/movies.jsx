import { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup.jsx";
import paginate from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

const PAGE_SIZE = 4;

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    genres: [],
    selectedGenre: {},
  };

  componentDidMount() {
    const allGenre = { _id: "all", name: "All items" };
    const genres = getGenres();
    genres.unshift(allGenre);

    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: allGenre,
    });
  }

  handleDelete = (id) => {
    deleteMovie(id);
    this.setState({
      movies: getMovies(),
    });
  };

  updateLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };

  updateSlice = (index) => {
    this.setState({
      currentPage: index,
    });
  };

  updateSeletedGenre = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
    });
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      selectedGenre,
      genres,
    } = this.state;
    let count = 0;
    let movies = allMovies;
    if (selectedGenre._id !== "all") {
      movies = movies.filter((movie) => movie.genre._id === selectedGenre._id);
    }

    count = movies.length;
    movies = paginate(movies, PAGE_SIZE, currentPage);
    return count ? (
      <div className="container">
        <h3>Showing {count} movies in the database</h3>
        <div className="row">
          <div className="col-3">
            <ListGroup
              seletedItem={selectedGenre}
              onItemSelect={this.updateSeletedGenre}
              items={genres}
              valueProperty="_id"
              textProperty="name"
            />
          </div>
          <div className="col">
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.updateLike}
            />
            <Pagination
              pageSize={PAGE_SIZE}
              total={count}
              onPaginate={this.updateSlice}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="container">
        <h3>There are no movies in the database</h3>
      </div>
    );
  }
}

export default Movies;
