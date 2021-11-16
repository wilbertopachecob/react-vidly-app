import React from "react";

function MovieForm({match, history}) {
  function saveMovie() {
    history.push("/movies");
  }

  return (
    <div>
      <h1>Movie - ID: {match.params.id} </h1>
      <button className="btn btn-primary" onClick={saveMovie}>
        Save
      </button>
    </div>
  );
}

export default MovieForm;
