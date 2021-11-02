import { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup.jsx";
import paginate from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import { orderBy as _orderBy } from "lodash";

const PAGE_SIZE = 4;

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    genres: [],
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" },
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

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
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

  getPagedMovies = () => {
    let { movies } = this.state;
    const { selectedGenre, sortColumn, currentPage } = this.state;
    if (selectedGenre._id !== "all") {
      movies = movies.filter((movie) => movie.genre._id === selectedGenre._id);
    }

    movies = _orderBy(movies, [sortColumn.path], sortColumn.order);

    const count = movies.length;
    movies = paginate(movies, PAGE_SIZE, currentPage);
    return {
      count,
      movies,
    };
  };

  render() {
    const {
      currentPage,
      selectedGenre,
      genres,
      sortColumn,
    } = this.state;
    const {count, movies} = this.getPagedMovies();
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
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
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
