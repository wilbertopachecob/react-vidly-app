import Like from "./common/like.jsx";
import Table from "./common/table.jsx";
import { Link } from "react-router-dom";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort, sortColumn } = props;

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like isActive={movie.liked} onChange={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={movies}
      onSort={onSort}
      sortColumn={sortColumn}
      valueProperty="_id"
    />
  );
};

export default MoviesTable;
