import { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup.jsx";
import paginate from "./utils/paginate";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { orderBy as _orderBy } from "lodash";
import MovieSearch from "./movieSearch";
import { toast } from 'react-toastify';

const PAGE_SIZE = 4;
const allGenre = { _id: "all", name: "All items" };

class Movies extends Component {
  state = {
    movies: [],
    searchTerm: "",
    currentPage: 1,
    genres: [],
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    genres.unshift(allGenre);
    const { data: movies } = await getMovies();

    this.setState({
      movies,
      genres,
      selectedGenre: allGenre,
    });
  }

  handleDelete = async (id) => {
    const currentmovies = this.state.movies;
    const movies = currentmovies.filter((movie) => movie._id !== id);
    this.setState({
      movies,
    });

    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('The movie has been deleted already')
      }
      this.setState({
        movies: currentmovies,
      });
    }
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
      searchTerm: "",
    });
  };

  getPagedMovies = () => {
    let { movies } = this.state;
    const { selectedGenre, sortColumn, currentPage, searchTerm } = this.state;
    if (searchTerm) {
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    } else if (selectedGenre._id !== "all") {
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

  goToNewMovie = () => {
    const { history } = this.props;
    history.push("/movies/add");
  };

  movieSearch = (searchTerm) => {
    this.setState({
      selectedGenre: allGenre,
      currentPage: 1,
      searchTerm,
    });
  };

  render() {
    const { currentPage, selectedGenre, genres, sortColumn, searchTerm } =
      this.state;
    const { count, movies } = this.getPagedMovies();
    return count ? (
      <div className="container">
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
            <button
              className="btn btn-primary mb-2"
              onClick={this.goToNewMovie}
            >
              New movie
            </button>
            <h3>Showing {count} movies in the database</h3>
            <MovieSearch onChange={this.movieSearch} value={searchTerm} />
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
