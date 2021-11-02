import Like from "./common/like.jsx";
import TableBody from "./common/tableBody.jsx";
import TableHeader from "./common/tableHeader.jsx";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort, sortColumn } = props;

  const columns = [
    { path: "title", label: "Title" },
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
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={movies} columns={columns} valueProperty="_id"/>
    </table>
  );
};

export default MoviesTable;
