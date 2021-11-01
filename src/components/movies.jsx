import { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like.jsx";
import Pagination from "./common/pagination";
import ListGroup from "./listGroup.jsx";
import paginate from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";

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

  handleDelete(id) {
    deleteMovie(id);
    this.setState({
      movies: getMovies(),
    });
  }

  updateLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  }

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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <th scope="row">{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        isActive={movie.liked}
                        onChange={() => this.updateLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDelete(movie._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
