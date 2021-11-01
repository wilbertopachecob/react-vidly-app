import Like from "./common/like.jsx";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort } = props;

  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => raiseSort("title")}>
            Title
          </th>
          <th scope="col" onClick={() => raiseSort("genre.name")}>
            Genre
          </th>
          <th scope="col" onClick={() => raiseSort("numberInStock")}>
            Stock
          </th>
          <th scope="col" onClick={() => raiseSort("dailyRentalRate")}>
            Rate
          </th>
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
              <Like isActive={movie.liked} onChange={() => onLike(movie)} />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(movie._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
