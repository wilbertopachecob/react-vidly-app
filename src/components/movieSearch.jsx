function MovieSearch({ onChange, value }) {
  return (
    <input
      type="text"
      value={value}
      className="form-control my-2"
      onChange={e => onChange(e.currentTarget.value)}
      placeholder="Search..."
    />
  );
}

export default MovieSearch;
